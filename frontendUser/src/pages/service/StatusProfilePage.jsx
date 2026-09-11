import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import GovukLayout from '../../components/layout/GovukLayout';
import { useAuth } from '../../context/AuthContext';
import { getClientByQuery } from '../../api/client.api';

export default function StatusProfilePage() {
  const { currentUser, setCurrentUser } = useAuth();
  const { docNumber } = useParams();
  const [searchParams] = useSearchParams();
  const queryDoc = docNumber || searchParams.get('doc');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(currentUser);
  const [error, setError] = useState('');

  useEffect(() => {
    // If opened via direct QR scan or URL parameter with docNumber
    if (queryDoc && (!currentUser || currentUser.documentNumber !== queryDoc)) {
      setLoading(true);
      getClientByQuery({
        PassportNumber: queryDoc.trim().toUpperCase(),
        identNum: queryDoc.trim().toUpperCase(),
      })
        .then((client) => {
          let parsedDob = { day: '15', month: '06', year: '1992' };
          if (client.DOB) {
            const parts = client.DOB.split('T')[0].split('-');
            if (parts.length === 3) {
              parsedDob = { year: parts[0], month: parts[1], day: parts[2] };
            }
          }

          const isGranted = (client.Status || '').toLowerCase() === 'issued';
          const isPending = (client.Status || '').toLowerCase() === 'pending';

          const record = {
            id: client._id,
            fullName: client.FullName || 'Applicant',
            statusType: client.Category || 'UK Visa / eVisa',
            statusCategory: isGranted ? 'Valid Status' : isPending ? 'Under Review' : 'Status Refused / Revoked',
            statusRaw: client.Status || 'Pending',
            documentType: 'passport',
            documentNumber: client.PassportNumber || queryDoc,
            nationality: client.CountryofCitizenship || 'International Citizen',
            dob: parsedDob,
            email: client.Email,
            telephone: client.telephone,
            address: client.Address,
            workRights: isGranted
              ? `${client.Category} holder: Authorized to engage in employment in the UK under UKVI conditions.`
              : isPending
              ? 'Application is currently under caseworker review.'
              : 'No current right to work in the UK.',
            decisionParagraph: client.Paragraph || (isGranted
              ? 'Your UK online immigration status (eVisa) is active and valid.'
              : 'Currently the status is pending, the application is under review.'),
            validFrom: client.createdAt
              ? new Date(client.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
              : '1 January 2024',
            validUntil: isGranted ? '31 December 2029' : isPending ? 'Pending Decision' : 'Expired / Decision Final',
            photoUrl: client.photoUrl || '',
          };

          setProfileData(record);
          if (setCurrentUser) setCurrentUser(record);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || 'Could not load immigration status record.');
          setLoading(false);
        });
    } else if (currentUser) {
      setProfileData(currentUser);
    } else if (!queryDoc) {
      navigate('/service/sign-in-document');
    }
  }, [queryDoc, currentUser, navigate, setCurrentUser]);

  if (loading) {
    return (
      <GovukLayout serviceName="View and prove your immigration status" serviceUrl="/status">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <p className="govuk-body-l" style={{ margin: '40px 0' }}>
              Loading immigration status record...
            </p>
          </div>
        </div>
      </GovukLayout>
    );
  }

  if (error || !profileData) {
    return (
      <GovukLayout serviceName="View and prove your immigration status" serviceUrl="/status">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-l">Immigration Status Record Not Found</h1>
            <p className="govuk-body">
              {error || 'No active immigration record found. Please verify the passport details.'}
            </p>
            <Link to="/service/sign-in-document" className="govuk-button">
              Sign In Again
            </Link>
          </div>
        </div>
      </GovukLayout>
    );
  }

  // Format DOB nicely (e.g. "10 Apr 2002" or "03 Jun 2006")
  const formatDobDisplay = () => {
    if (!profileData.dob) return 'Not recorded';
    const day = String(profileData.dob.day || '').padStart(2, '0');
    const monthIndex = Number(profileData.dob.month || 1) - 1;
    const year = profileData.dob.year || '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${months[monthIndex] || profileData.dob.month} ${year}`;
  };

  // Construct mobile verification URL for QR Code
  const qrTargetUrl = `${window.location.origin}/status/view/${encodeURIComponent(profileData.documentNumber)}`;
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrTargetUrl)}&margin=4`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <GovukLayout
      serviceName="View and prove your immigration status"
      serviceUrl="/status"
      backLink="/status"
    >
      {/* Print Controls / Action Bar */}
      <div className="no-print" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="button"
            onClick={handlePrint}
            className="govuk-button"
            style={{ margin: 0 }}
          >
            Print
          </button>
        </div>
        <Link to="/status" className="govuk-link" style={{ fontSize: '16px' }}>
          Sign out
        </Link>
      </div>

      {/* Official eVisa Printable Layout matching GOV.UK Format */}
      <div className="evisa-document-container" id="evisa-document">
        <h1 className="govuk-heading-xl" style={{ fontSize: '32px', marginBottom: '30px', fontWeight: 700, letterSpacing: '-0.5px' }}>
          Your immigration status (eVisa)
        </h1>

        {/* Main 2-Column Info Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', borderBottom: '1px solid #b1b4b6', paddingBottom: '30px', marginBottom: '30px' }}>
          {/* Left Table Data */}
          <div style={{ flex: '1 1 auto', maxWidth: '65%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '17px' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #d8dde0' }}>
                  <td style={{ padding: '10px 10px 10px 0', fontWeight: 'bold', width: '38%', verticalAlign: 'top', color: '#0b0c0c' }}>
                    Name
                  </td>
                  <td style={{ padding: '10px 0', textTransform: 'uppercase', fontWeight: 600, color: '#0b0c0c', lineHeight: 1.3 }}>
                    {profileData.fullName}
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #d8dde0' }}>
                  <td style={{ padding: '10px 10px 10px 0', fontWeight: 'bold', verticalAlign: 'top', color: '#0b0c0c' }}>
                    Date of birth
                  </td>
                  <td style={{ padding: '10px 0', color: '#0b0c0c' }}>
                    {formatDobDisplay()}
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #d8dde0' }}>
                  <td style={{ padding: '10px 10px 10px 0', fontWeight: 'bold', verticalAlign: 'top', color: '#0b0c0c' }}>
                    Nationality
                  </td>
                  <td style={{ padding: '10px 0', textTransform: 'uppercase', color: '#0b0c0c' }}>
                    {profileData.nationality}
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #d8dde0' }}>
                  <td style={{ padding: '10px 10px 10px 0', fontWeight: 'bold', verticalAlign: 'top', color: '#0b0c0c' }}>
                    Status
                  </td>
                  <td style={{ padding: '10px 0', fontWeight: 600, color: '#0b0c0c' }}>
                    {profileData.statusType}
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #d8dde0' }}>
                  <td style={{ padding: '10px 10px 10px 0', fontWeight: 'bold', verticalAlign: 'top', color: '#0b0c0c' }}>
                    Passport number
                  </td>
                  <td style={{ padding: '10px 0', fontFamily: 'monospace', fontWeight: 700, fontSize: '16px', color: '#0b0c0c' }}>
                    {profileData.documentNumber}
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #d8dde0' }}>
                  <td style={{ padding: '10px 10px 10px 0', fontWeight: 'bold', verticalAlign: 'top', color: '#0b0c0c' }}>
                    Valid from
                  </td>
                  <td style={{ padding: '10px 0', color: '#0b0c0c' }}>
                    {profileData.validFrom}
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #d8dde0' }}>
                  <td style={{ padding: '10px 10px 10px 0', fontWeight: 'bold', verticalAlign: 'top', color: '#0b0c0c' }}>
                    Valid until
                  </td>
                  <td style={{ padding: '10px 0', fontWeight: 600, color: '#0b0c0c' }}>
                    {profileData.validUntil}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Portrait Photo */}
          <div style={{ flex: '0 0 140px', width: '140px', minWidth: '140px', textAlign: 'center' }}>
            <div
              className="evisa-photo-box"
              style={{
                width: '140px',
                height: '175px',
                maxWidth: '140px',
                maxHeight: '175px',
                minWidth: '140px',
                minHeight: '175px',
                border: '1.5px solid #0b0c0c',
                overflow: 'hidden',
                backgroundColor: '#f3f2f1',
                position: 'relative',
                boxSizing: 'border-box',
                margin: '0 auto',
                padding: 0
              }}
            >
              {profileData.photoUrl ? (
                <img
                  src={profileData.photoUrl}
                  alt={profileData.fullName}
                  className="evisa-passport-img"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                    margin: 0,
                    padding: 0
                  }}
                />
              ) : (
                <svg
                  className="evisa-fallback-svg"
                  viewBox="0 0 24 24"
                  fill="#b1b4b6"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80px',
                    height: '80px',
                    display: 'block'
                  }}
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Prove Your Status & QR Code Section */}
        <div style={{ borderBottom: '1px solid #b1b4b6', paddingBottom: '30px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px' }}>
              <h2 className="govuk-heading-l" style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 700 }}>
                Prove your status
              </h2>
              <p className="govuk-body" style={{ fontSize: '17px', lineHeight: 1.5, marginBottom: '12px', maxWidth: '480px' }}>
                If you need to prove your immigration status to someone, you can do this by presenting this official document or scanning the QR code with a phone camera.
              </p>
            </div>

            {/* Scannable QR Code */}
            <div style={{ flex: '0 0 auto', textAlign: 'center', padding: '10px', background: '#fff', border: '1px solid #d8dde0', borderRadius: '4px' }}>
              <img
                src={qrCodeImageUrl}
                alt="Scan to verify UKVI eVisa status on mobile phone"
                style={{ width: '140px', height: '140px', display: 'block' }}
              />
              <span style={{ display: 'block', fontSize: '11px', color: '#505a5f', marginTop: '6px', fontWeight: 'bold' }}>
                Scan with phone camera
              </span>
            </div>
          </div>
        </div>

        {/* What you can do in the UK Section */}
        <div style={{ marginBottom: '40px' }}>
          <h2 className="govuk-heading-l" style={{ fontSize: '24px', marginBottom: '16px', fontWeight: 700 }}>
            What you can do in the UK
          </h2>
          <p className="govuk-body" style={{ fontSize: '17px', marginBottom: '12px' }}>
            You can:
          </p>
          <ul className="govuk-list govuk-list--bullet" style={{ fontSize: '17px', paddingLeft: '20px', lineHeight: 1.6 }}>
            <li>live in the United Kingdom</li>
            <li>
              {profileData.statusRaw === 'Issued'
                ? (profileData.workRights || 'work in the United Kingdom under the conditions of your visa route')
                : 'remain in the UK while your caseworker application decision is being finalised'}
            </li>
            <li>study in the United Kingdom</li>
            <li>travel into and out of the UK during the validity of your eVisa</li>
            <li>access the National Health Service (NHS)</li>
          </ul>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          /* Hide non-printable items */
          .no-print,
          .govuk-header,
          .govuk-footer,
          .govuk-phase-banner,
          .govuk-breadcrumbs,
          .govuk-back-link,
          .gem-c-contextual-sidebar,
          nav,
          button,
          .govuk-button {
            display: none !important;
          }

          /* Ensure full width and clean document appearance */
          body, .govuk-template__body, .govuk-width-container, .govuk-main-wrapper {
            background: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }

          #evisa-document {
            display: block !important;
            width: 100% !important;
            padding: 20px 0 !important;
          }

          /* Absolute locking for passport photo box and image/svg in print */
          .evisa-photo-box {
            width: 140px !important;
            height: 175px !important;
            max-width: 140px !important;
            max-height: 175px !important;
            min-width: 140px !important;
            min-height: 175px !important;
            border: 1.5px solid #000000 !important;
            background-color: #f3f2f1 !important;
            overflow: hidden !important;
            position: relative !important;
            box-sizing: border-box !important;
            display: block !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }

          .evisa-passport-img {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            max-height: 100% !important;
            object-fit: cover !important;
            object-position: center top !important;
            display: block !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .evisa-fallback-svg {
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 80px !important;
            height: 80px !important;
            display: block !important;
            margin: 0 !important;
          }

          /* Force browser to print background images/colors */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </GovukLayout>
  );
}
