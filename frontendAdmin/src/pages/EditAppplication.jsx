import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getAClients, updateClient } from "../api/client.api";
import GovukLayout from "../components/layout/GovukLayout";
import { ErrorSummary, NotificationBanner, InsetText } from "../components/common/GdsElements";
import PassportPhotoUploader from "../components/common/PassportPhotoUploader";

export default function EditAppplication({ isAdminLoggedIn, onLogout }) {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [selectedClient, setSelectedClient] = useState(null);

  const [formData, setFormData] = useState({
    Category: "Tourist Visa",
    FullName: "",
    Email: "",
    Gender: "Male",
    Address: "",
    telephone: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    POB: "",
    CountryofCitizenship: "",
    PassportNumber: "",
    Status: "Pending",
    Paragraph: "",
    photoUrl: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: "Tourist Visa", name: "Tourist Visa / Standard Visitor" },
    { id: "Work Visa", name: "Skilled Worker / Work Visa" },
    { id: "Student Visa", name: "Student Visa / Higher Education" },
  ];

  const statuses = [
    { id: "Pending", name: "Pending (Under Review)" },
    { id: "Issued", name: "Issued (Granted / Valid eVisa)" },
    { id: "Refused", name: "Refused" },
    { id: "Revoked", name: "Revoked" },
  ];

  useEffect(() => {
    document.title = "Manage Applications - UK Visas and Immigration - GOV.UK";
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = async (query) => {
    if (!query || !query.trim()) return;

    setIsSearching(true);
    setSearchError("");
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const payload = query.includes("@")
        ? { Email: query.trim() }
        : { PassportNumber: query.trim().toUpperCase() };

      const client = await getAClients(payload);
      setSelectedClient(client);

      let dDay = "", dMonth = "", dYear = "";
      if (client.DOB) {
        const parts = client.DOB.split("T")[0].split("-");
        if (parts.length === 3) {
          dYear = parts[0];
          dMonth = parts[1];
          dDay = parts[2];
        }
      }

      setFormData({
        Category: client.Category || "Tourist Visa",
        FullName: client.FullName || "",
        Email: client.Email || "",
        Gender: client.Gender || "Male",
        Address: client.Address || "",
        telephone: client.telephone || "",
        dobDay: dDay,
        dobMonth: dMonth,
        dobYear: dYear,
        POB: client.POB || "",
        CountryofCitizenship: client.CountryofCitizenship || "",
        PassportNumber: client.PassportNumber || "",
        Status: client.Status || "Pending",
        Paragraph: client.Paragraph || "",
        photoUrl: client.photoUrl || "",
      });

      setIsSearching(false);
    } catch (err) {
      setIsSearching(false);
      setSelectedClient(null);
      setSearchError(err.message || "No client record found matching your query.");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchError("Enter an applicant Email or Passport Number to search.");
      return;
    }
    performSearch(searchQuery);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedClient || !selectedClient._id) {
      setErrorMsg("No application record selected to update.");
      return;
    }

    if (!formData.FullName.trim() || !formData.Email.trim() || !formData.PassportNumber.trim()) {
      setErrorMsg("Full Name, Email, and Passport Number are mandatory.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formattedDob = formData.dobYear && formData.dobMonth && formData.dobDay
      ? `${formData.dobYear}-${String(formData.dobMonth).padStart(2, "0")}-${String(formData.dobDay).padStart(2, "0")}`
      : selectedClient.DOB;

    const payload = {
      Category: formData.Category,
      FullName: formData.FullName.trim(),
      Email: formData.Email.trim(),
      Gender: formData.Gender,
      Address: formData.Address.trim(),
      telephone: formData.telephone.trim(),
      DOB: formattedDob,
      POB: formData.POB.trim(),
      CountryofCitizenship: formData.CountryofCitizenship.trim(),
      PassportNumber: formData.PassportNumber.trim().toUpperCase(),
      Status: formData.Status,
      photoUrl: formData.photoUrl || "",
      Paragraph: formData.Paragraph || (formData.Status === "Issued"
        ? "Your eVisa application has been successfully granted and issued."
        : "Currently the status is pending, the application is under review."),
    };

    try {
      const updated = await updateClient(selectedClient._id, payload);
      setIsSubmitting(false);
      setSelectedClient(updated.client || updated);
      setSuccessMsg(`Application record for ${formData.FullName} successfully updated to status: "${formData.Status}".`);
      window.scrollTo({ top: 180, behavior: "smooth" });
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || "Failed to update client record on server.");
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  const breadcrumbs = [
    { title: "Home", url: "/" },
    { title: "Admin Portal", url: "/Admin-Login" },
    { title: "Manage Applications", url: "/edit-application" }
  ];

  return (
    <GovukLayout
      breadcrumbs={breadcrumbs}
      isAdminLoggedIn={isAdminLoggedIn}
      onLogout={onLogout}
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <span className="govuk-caption-xl">UKVI Casework Portal</span>
          <h1 className="govuk-heading-xl">Search & Manage Applications</h1>

          <p className="govuk-body-l">
            Search for an existing visa applicant record by Passport Number or Email Address to review and update their eVisa status.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} style={{ marginBottom: "35px" }}>
            <div className={`govuk-form-group ${searchError ? "govuk-form-group--error" : ""}`}>
              <label className="govuk-label govuk-label--m" htmlFor="search-input">
                Search Applicant Record
              </label>
              <div className="govuk-hint">
                Enter Passport Number (e.g. 13865617) or Email Address
              </div>
              {searchError && (
                <span className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span> {searchError}
                </span>
              )}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input
                  className={`govuk-input govuk-input--width-20 ${searchError ? "govuk-input--error" : ""}`}
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (searchError) setSearchError("");
                  }}
                  placeholder="e.g. 13865617 or applicant@example.com"
                />
                <button
                  type="submit"
                  className="govuk-button"
                  disabled={isSearching}
                  style={{ marginBottom: 0 }}
                >
                  {isSearching ? "Searching..." : "Search Record"}
                </button>
              </div>
            </div>
          </form>

          {successMsg && (
            <NotificationBanner title="Update Successful" success>
              <p className="govuk-body" style={{ margin: 0 }}>
                {successMsg}
              </p>
            </NotificationBanner>
          )}

          {errorMsg && (
            <ErrorSummary errors={[{ field: "status-select", message: errorMsg }]} />
          )}

          {/* Editor Form if Client Found */}
          {selectedClient && (
            <div className="status-card" style={{ marginTop: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", borderBottom: "1px solid #eef1f3", paddingBottom: "12px", marginBottom: "20px" }}>
                <h2 className="govuk-heading-m" style={{ margin: 0 }}>
                  Editing Record: {selectedClient.FullName}
                </h2>
                <span className={`govuk-tag ${
                  formData.Status === 'Issued' ? 'govuk-tag--green' :
                  formData.Status === 'Pending' ? 'govuk-tag--yellow' : 'govuk-tag--red'
                }`}>
                  {formData.Status}
                </span>
              </div>

              <form onSubmit={handleUpdate}>
                {/* Status and Category */}
                <div className="govuk-grid-row">
                  <div className="govuk-grid-column-one-half">
                    <div className="govuk-form-group">
                      <label className="govuk-label govuk-label--s" htmlFor="status-select">
                        Visa Status
                      </label>
                      <select
                        className="govuk-select"
                        id="status-select"
                        value={formData.Status}
                        onChange={(e) => handleChange("Status", e.target.value)}
                      >
                        {statuses.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="govuk-grid-column-one-half">
                    <div className="govuk-form-group">
                      <label className="govuk-label govuk-label--s" htmlFor="category-select">
                        Visa Category
                      </label>
                      <select
                        className="govuk-select"
                        id="category-select"
                        value={formData.Category}
                        onChange={(e) => handleChange("Category", e.target.value)}
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Status Notice Paragraph */}
                <div className="govuk-form-group">
                  <label className="govuk-label govuk-label--s" htmlFor="paragraph">
                    Status Notice / Caseworker Decision Note
                  </label>
                  <div className="govuk-hint">
                    This message will be visible to the applicant on their status portal
                  </div>
                  <textarea
                    className="govuk-textarea"
                    id="paragraph"
                    rows="3"
                    value={formData.Paragraph}
                    onChange={(e) => handleChange("Paragraph", e.target.value)}
                  />
                </div>

                {/* Passport Photo */}
                <PassportPhotoUploader
                  value={formData.photoUrl}
                  onChange={(val) => handleChange("photoUrl", val)}
                  label="Update Applicant Passport Photo"
                />

                {/* Personal Details */}
                <div className="govuk-form-group">
                  <label className="govuk-label govuk-label--s" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    className="govuk-input"
                    id="fullName"
                    type="text"
                    value={formData.FullName}
                    onChange={(e) => handleChange("FullName", e.target.value)}
                  />
                </div>

                <div className="govuk-grid-row">
                  <div className="govuk-grid-column-one-half">
                    <div className="govuk-form-group">
                      <label className="govuk-label govuk-label--s" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        className="govuk-input"
                        id="email"
                        type="email"
                        value={formData.Email}
                        onChange={(e) => handleChange("Email", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="govuk-grid-column-one-half">
                    <div className="govuk-form-group">
                      <label className="govuk-label govuk-label--s" htmlFor="telephone">
                        Telephone
                      </label>
                      <input
                        className="govuk-input"
                        id="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => handleChange("telephone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="govuk-grid-row">
                  <div className="govuk-grid-column-one-half">
                    <div className="govuk-form-group">
                      <label className="govuk-label govuk-label--s" htmlFor="passportNumber">
                        Passport Number
                      </label>
                      <input
                        className="govuk-input"
                        id="passportNumber"
                        type="text"
                        value={formData.PassportNumber}
                        onChange={(e) => handleChange("PassportNumber", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="govuk-grid-column-one-half">
                    <div className="govuk-form-group">
                      <label className="govuk-label govuk-label--s" htmlFor="gender">
                        Gender
                      </label>
                      <select
                        className="govuk-select"
                        id="gender"
                        value={formData.Gender}
                        onChange={(e) => handleChange("Gender", e.target.value)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* DOB & Citizenship */}
                <div className="govuk-grid-row">
                  <div className="govuk-grid-column-one-half">
                    <div className="govuk-form-group">
                      <label className="govuk-label govuk-label--s" htmlFor="country">
                        Country of Citizenship
                      </label>
                      <input
                        className="govuk-input"
                        id="country"
                        type="text"
                        value={formData.CountryofCitizenship}
                        onChange={(e) => handleChange("CountryofCitizenship", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="govuk-grid-column-one-half">
                    <div className="govuk-form-group">
                      <label className="govuk-label govuk-label--s" htmlFor="pob">
                        Place of Birth
                      </label>
                      <input
                        className="govuk-input"
                        id="pob"
                        type="text"
                        value={formData.POB}
                        onChange={(e) => handleChange("POB", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Date of Birth Inputs */}
                <div className="govuk-form-group">
                  <fieldset className="govuk-fieldset" role="group">
                    <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
                      Date of Birth
                    </legend>
                    <div className="govuk-date-input">
                      <div className="govuk-date-input__item">
                        <label className="govuk-label govuk-date-input__label" htmlFor="dobDay">
                          Day
                        </label>
                        <input
                          className="govuk-input govuk-date-input__input govuk-input--width-2"
                          id="dobDay"
                          type="text"
                          maxLength="2"
                          value={formData.dobDay}
                          onChange={(e) => handleChange("dobDay", e.target.value)}
                        />
                      </div>
                      <div className="govuk-date-input__item">
                        <label className="govuk-label govuk-date-input__label" htmlFor="dobMonth">
                          Month
                        </label>
                        <input
                          className="govuk-input govuk-date-input__input govuk-input--width-2"
                          id="dobMonth"
                          type="text"
                          maxLength="2"
                          value={formData.dobMonth}
                          onChange={(e) => handleChange("dobMonth", e.target.value)}
                        />
                      </div>
                      <div className="govuk-date-input__item">
                        <label className="govuk-label govuk-date-input__label" htmlFor="dobYear">
                          Year
                        </label>
                        <input
                          className="govuk-input govuk-date-input__input govuk-input--width-4"
                          id="dobYear"
                          type="text"
                          maxLength="4"
                          value={formData.dobYear}
                          onChange={(e) => handleChange("dobYear", e.target.value)}
                        />
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="govuk-form-group">
                  <label className="govuk-label govuk-label--s" htmlFor="address">
                    Residential Address
                  </label>
                  <textarea
                    className="govuk-textarea"
                    id="address"
                    rows="2"
                    value={formData.Address}
                    onChange={(e) => handleChange("Address", e.target.value)}
                  />
                </div>

                <div className="govuk-button-group" style={{ marginTop: "30px" }}>
                  <button
                    type="submit"
                    className="govuk-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving Changes..." : "Save Application Changes"}
                  </button>
                  <button
                    type="button"
                    className="govuk-button govuk-button--secondary"
                    onClick={() => setSelectedClient(null)}
                  >
                    Close Editor
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="govuk-grid-column-one-third">
          <div className="gem-c-contextual-sidebar">
            <h2 className="gem-c-related-navigation__main-heading">Admin Management</h2>
            <ul className="govuk-list">
              <li>
                <Link to="/new-application" className="govuk-link">
                  + Create New Application
                </Link>
              </li>
              <li>
                <Link to="/Admin-Login" className="govuk-link">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </GovukLayout>
  );
}
