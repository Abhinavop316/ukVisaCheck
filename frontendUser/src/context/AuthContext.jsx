import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultUser } from '../data/sampleProfiles';
import { getClientByQuery, verifySecurityCode as apiVerifySecurityCode } from '../api/client.api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ukvi_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [signInFormData, setSignInFormData] = useState(() => {
    const savedForm = sessionStorage.getItem('ukvi_sign_in_form');
    if (savedForm) {
      try {
        return JSON.parse(savedForm);
      } catch (e) {
        // ignore parse error
      }
    }
    const savedUser = localStorage.getItem('ukvi_current_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        return {
          documentType: u.documentType || 'passport',
          documentNumber: u.documentNumber || '',
          dobDay: u.dob?.day || '',
          dobMonth: u.dob?.month || '',
          dobYear: u.dob?.year || '',
          maskedEmail: u.email || '',
        };
      } catch (e) {
        // ignore parse error
      }
    }
    return {
      documentType: 'passport',
      documentNumber: '',
      dobDay: '',
      dobMonth: '',
      dobYear: '',
      maskedEmail: '',
    };
  });

  const [shareCodes, setShareCodes] = useState(() => {
    const saved = localStorage.getItem('ukvi_share_codes');
    return saved ? JSON.parse(saved) : [];
  });

  const [cookieConsent, setCookieConsent] = useState(() => {
    return localStorage.getItem('ukvi_cookie_consent') || null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ukvi_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ukvi_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    sessionStorage.setItem('ukvi_sign_in_form', JSON.stringify(signInFormData));
  }, [signInFormData]);

  useEffect(() => {
    localStorage.setItem('ukvi_share_codes', JSON.stringify(shareCodes));
  }, [shareCodes]);

  const signOut = () => {
    setCurrentUser(null);
    setSignInFormData({
      documentType: 'passport',
      documentNumber: '',
      dobDay: '',
      dobMonth: '',
      dobYear: '',
      maskedEmail: '',
    });
    localStorage.removeItem('ukvi_current_user');
    sessionStorage.removeItem('ukvi_sign_in_form');
  };

  const updateConsent = (consent) => {
    setCookieConsent(consent);
    localStorage.setItem('ukvi_cookie_consent', consent);
  };

  const generateNewShareCode = (purpose, purposeTitle) => {
    const randomChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const generateSegment = (len) => {
      let result = '';
      for (let i = 0; i < len; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
      return result;
    };

    const newCode = `${generateSegment(3)} ${generateSegment(3)} ${generateSegment(3)}`;
    const newEntry = {
      code: newCode,
      purpose,
      purposeTitle: purposeTitle || (purpose === 'work' ? 'Prove right to work' : purpose === 'rent' ? 'Prove right to rent' : 'Prove immigration status'),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      user: currentUser || defaultUser
    };

    setShareCodes(prev => [newEntry, ...prev]);
    return newEntry;
  };

  const verifyShareCode = (code, dob) => {
    const cleanCode = code.replace(/\s+/g, '').toUpperCase();
    const found = shareCodes.find(item => item.code.replace(/\s+/g, '').toUpperCase() === cleanCode);
    
    if (found) {
      // Check DOB if provided
      if (dob) {
        const uDob = found.user.dob;
        const matchesDob = 
          (!dob.day || dob.day.padStart(2, '0') === String(uDob.day).padStart(2, '0')) &&
          (!dob.month || dob.month.padStart(2, '0') === String(uDob.month).padStart(2, '0')) &&
          (!dob.year || String(dob.year) === String(uDob.year));
        if (!matchesDob) {
          return { success: false, error: 'The date of birth does not match the details for this share code.' };
        }
      }
      return { success: true, record: found };
    }

    return { success: false, error: 'Share code not found or has expired. Please ask the applicant for a new share code.' };
  };

  /**
   * Performs authentication querying the backend MongoDB database with Resend OTP.
   */
  const signIn = async (docType, docNumber, dob, code) => {
    const docClean = docNumber ? docNumber.trim().toUpperCase() : '';

    try {
      let client;

      if (code) {
        // Verify 6-digit security code via backend Resend endpoint
        const verifyRes = await apiVerifySecurityCode(docClean, code);
        client = verifyRes.client;
      } else {
        // Direct query fallback if no code specified
        client = await getClientByQuery({
          PassportNumber: docClean,
          identNum: docClean
        });
      }

      if (!client || (!client.FullName && !client.PassportNumber)) {
        return {
          success: false,
          error: 'No application record found for the details provided. Please check your passport number and try again.'
        };
      }

      // Check DOB matching if available in client record
      if (client.DOB && dob && dob.year && dob.month && dob.day) {
        const parts = client.DOB.split('T')[0].split('-');
        if (parts.length === 3) {
          const [dbYear, dbMonth, dbDay] = parts;
          if (
            String(Number(dob.year)) !== String(Number(dbYear)) ||
            String(Number(dob.month)) !== String(Number(dbMonth)) ||
            String(Number(dob.day)) !== String(Number(dbDay))
          ) {
            return {
              success: false,
              error: 'The date of birth entered does not match our records for this passport number.'
            };
          }
        }
      }

      let parsedDob = dob || { day: '15', month: '06', year: '1992' };
      if (client.DOB) {
        const parts = client.DOB.split('T')[0].split('-');
        if (parts.length === 3) {
          parsedDob = { year: parts[0], month: parts[1], day: parts[2] };
        }
      }

      const isGranted = (client.Status || '').toLowerCase() === 'issued';
      const isPending = (client.Status || '').toLowerCase() === 'pending';

      const userRecord = {
        id: client._id,
        fullName: client.FullName,
        statusType: client.Category || 'UK Visa / eVisa',
        statusCategory: isGranted ? 'Valid Status' : (isPending ? 'Under Review' : 'Status Refused / Revoked'),
        statusRaw: client.Status || 'Pending',
        documentType: docType || 'passport',
        documentNumber: client.PassportNumber || docClean,
        nationality: client.CountryofCitizenship || 'British / International Citizen',
        dob: parsedDob,
        email: client.Email,
        telephone: client.telephone,
        address: client.Address,
        workRights: isGranted
          ? `${client.Category} holder: Authorized to engage in employment in the United Kingdom under UKVI conditions.`
          : (isPending ? 'Application is currently under caseworker review.' : 'No current right to work in the UK.'),
        rentRights: isGranted
          ? 'Authorized to rent residential accommodation anywhere in England and the UK.'
          : (isPending ? 'Application is currently under caseworker review.' : 'No current right to rent in the UK.'),
        publicFunds: isGranted ? 'No recourse to public funds (standard visa condition).' : 'No access to UK public funds.',
        decisionParagraph: client.Paragraph || (isGranted
          ? 'Your UK online immigration status (eVisa) is active and valid.'
          : 'Currently the status is pending, the application is under review.'),
        validFrom: client.createdAt
          ? new Date(client.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
          : '1 January 2024',
        validUntil: isGranted ? '31 December 2029' : (isPending ? 'Pending Decision' : 'Expired / Decision Final'),
        photoUrl: client.photoUrl || '',
        isLiveRecord: true
      };

      setCurrentUser(userRecord);
      return { success: true, user: userRecord };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'The details entered do not match any records in the UKVI database. Please check your passport number and try again.'
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        signInFormData,
        setSignInFormData,
        shareCodes,
        generateNewShareCode,
        verifyShareCode,
        cookieConsent,
        updateConsent,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
