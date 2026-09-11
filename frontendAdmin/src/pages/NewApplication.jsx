import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "../api/client.api";
import GovukLayout from "../components/layout/GovukLayout";
import { ErrorSummary, InsetText, NotificationBanner } from "../components/common/GdsElements";
import PassportPhotoUploader from "../components/common/PassportPhotoUploader";

export default function NewApplication({ isAdminLoggedIn, onLogout }) {
  const [formData, setFormData] = useState({
    applicationCategory: "Tourist Visa",
    givenName: "",
    surname: "",
    gender: "Male",
    address: "",
    email: "",
    phone: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    countryOfCitizenship: "",
    placeOfBirth: "",
    passportNumber: "",
    status: "Pending",
    paragraph: "Currently the status is pending, the application is under review.",
    photoUrl: "",
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [submittedClient, setSubmittedClient] = useState(null);
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
    document.title = "New Application - UK Visas and Immigration - GOV.UK";
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field] || errors.global) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        delete copy.global;
        return copy;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.applicationCategory) newErrors.applicationCategory = "Select an application visa category.";
    if (!formData.givenName.trim()) newErrors.givenName = "Enter applicant's given name(s).";
    if (!formData.surname.trim()) newErrors.surname = "Enter applicant's surname / family name.";
    if (!formData.email.trim() || !formData.email.includes("@")) newErrors.email = "Enter a valid email address.";
    if (!formData.phone.trim()) newErrors.phone = "Enter applicant's contact telephone number.";
    if (!formData.address.trim()) newErrors.address = "Enter applicant's current residential address.";
    if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) {
      newErrors.dob = "Enter a complete date of birth (Day, Month, Year).";
    }
    if (!formData.placeOfBirth.trim()) newErrors.placeOfBirth = "Enter applicant's place / city of birth.";
    if (!formData.countryOfCitizenship.trim()) newErrors.countryOfCitizenship = "Enter applicant's country of citizenship.";
    if (!formData.passportNumber.trim()) newErrors.passportNumber = "Enter applicant's passport or travel document number.";
    if (!formData.agreedToTerms) newErrors.agreedToTerms = "You must confirm the caseworker declaration.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const formattedDob = `${formData.dobYear}-${String(formData.dobMonth).padStart(2, "0")}-${String(formData.dobDay).padStart(2, "0")}`;

    const payload = {
      Category: formData.applicationCategory,
      FullName: `${formData.givenName.trim()} ${formData.surname.trim()}`,
      Email: formData.email.trim(),
      Gender: formData.gender,
      Address: formData.address.trim(),
      telephone: formData.phone.trim(),
      DOB: formattedDob,
      POB: formData.placeOfBirth.trim(),
      CountryofCitizenship: formData.countryOfCitizenship.trim(),
      PassportNumber: formData.passportNumber.trim().toUpperCase(),
      Status: formData.status,
      photoUrl: formData.photoUrl || "",
      Paragraph: formData.paragraph || (formData.status === "Issued"
        ? "Your eVisa application has been successfully granted and issued."
        : "Currently the status is pending, the application is under review."),
    };

    try {
      const response = await createClient(payload);
      setIsSubmitting(false);
      setSubmittedClient(response.client || response);
      window.scrollTo({ top: 100, behavior: "smooth" });
    } catch (err) {
      setIsSubmitting(false);
      setErrors({ global: err.message || "Failed to create application on server." });
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleResetForm = () => {
    setSubmittedClient(null);
    setFormData({
      applicationCategory: "Tourist Visa",
      givenName: "",
      surname: "",
      gender: "Male",
      address: "",
      email: "",
      phone: "",
      dobDay: "",
      dobMonth: "",
      dobYear: "",
      countryOfCitizenship: "",
      placeOfBirth: "",
      passportNumber: "",
      status: "Pending",
      paragraph: "Currently the status is pending, the application is under review.",
      photoUrl: "",
      agreedToTerms: false,
    });
    setErrors({});
  };

  const breadcrumbs = [
    { title: "Home", url: "/" },
    { title: "Admin Portal", url: "/Admin-Login" },
    { title: "New Application", url: "/new-application" }
  ];

  const errorList = Object.keys(errors).map((k) => ({
    field: k,
    message: errors[k]
  }));

  return (
    <GovukLayout
      breadcrumbs={breadcrumbs}
      isAdminLoggedIn={isAdminLoggedIn}
      onLogout={onLogout}
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <span className="govuk-caption-xl">UKVI Casework Portal</span>
          <h1 className="govuk-heading-xl">Create New Visa / eVisa Application</h1>

          {submittedClient ? (
            /* Success confirmation screen */
            <div>
              <div className="govuk-panel govuk-panel--confirmation">
                <h2 className="govuk-panel__title">Application Created Successfully</h2>
                <div className="govuk-panel__body">
                  Passport Number / Identifier
                  <strong>{submittedClient.PassportNumber || formData.passportNumber}</strong>
                </div>
              </div>

              <h2 className="govuk-heading-m">Application Summary Details</h2>
              <dl className="govuk-summary-list">
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Full Name</dt>
                  <dd className="govuk-summary-list__value">{submittedClient.FullName || `${formData.givenName} ${formData.surname}`}</dd>
                </div>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Visa Category</dt>
                  <dd className="govuk-summary-list__value">{submittedClient.Category || formData.applicationCategory}</dd>
                </div>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Passport Number</dt>
                  <dd className="govuk-summary-list__value">{submittedClient.PassportNumber || formData.passportNumber}</dd>
                </div>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Email Address</dt>
                  <dd className="govuk-summary-list__value">{submittedClient.Email || formData.email}</dd>
                </div>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Contact Phone</dt>
                  <dd className="govuk-summary-list__value">{submittedClient.telephone || formData.phone}</dd>
                </div>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Citizenship</dt>
                  <dd className="govuk-summary-list__value">{submittedClient.CountryofCitizenship || formData.countryOfCitizenship}</dd>
                </div>
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Status</dt>
                  <dd className="govuk-summary-list__value">
                    <span className={`govuk-tag ${
                      (submittedClient.Status || formData.status) === 'Issued' ? 'govuk-tag--green' :
                      (submittedClient.Status || formData.status) === 'Pending' ? 'govuk-tag--yellow' : 'govuk-tag--red'
                    }`}>
                      {submittedClient.Status || formData.status}
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="govuk-button-group" style={{ marginTop: "30px" }}>
                <button
                  type="button"
                  className="govuk-button"
                  onClick={handleResetForm}
                >
                  + Create Another Application
                </button>
                <Link
                  to={`/edit-application?q=${encodeURIComponent(submittedClient.PassportNumber || formData.passportNumber)}`}
                  className="govuk-button govuk-button--secondary"
                >
                  Manage in Application Editor
                </Link>
              </div>
            </div>
          ) : (
            /* Creation Form */
            <form onSubmit={handleSubmit} noValidate>
              {errorList.length > 0 && <ErrorSummary errors={errorList} />}

              {/* Section 1: Visa Category & Status */}
              <h2 className="govuk-heading-l" style={{ marginTop: "20px" }}>
                1. Visa Classification & Initial Status
              </h2>

              <div className={`govuk-form-group ${errors.applicationCategory ? "govuk-form-group--error" : ""}`}>
                <label className="govuk-label govuk-label--s" htmlFor="applicationCategory">
                  Visa Category <span style={{ color: "#d4351c" }}>*</span>
                </label>
                <div className="govuk-hint">Select the applicable UK visa route for this applicant</div>
                {errors.applicationCategory && (
                  <span className="govuk-error-message">{errors.applicationCategory}</span>
                )}
                <select
                  className="govuk-select govuk-input--width-20"
                  id="applicationCategory"
                  value={formData.applicationCategory}
                  onChange={(e) => handleChange("applicationCategory", e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="govuk-form-group">
                <label className="govuk-label govuk-label--s" htmlFor="status">
                  Initial Status
                </label>
                <div className="govuk-hint">Default status upon registration</div>
                <select
                  className="govuk-select govuk-input--width-20"
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  {statuses.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section 2: Personal Information */}
              <h2 className="govuk-heading-l" style={{ marginTop: "30px" }}>
                2. Applicant Personal Details
              </h2>

              <PassportPhotoUploader
                value={formData.photoUrl}
                onChange={(val) => handleChange("photoUrl", val)}
              />

              <div className={`govuk-form-group ${errors.givenName ? "govuk-form-group--error" : ""}`}>
                <label className="govuk-label govuk-label--s" htmlFor="givenName">
                  Given Names / First Name <span style={{ color: "#d4351c" }}>*</span>
                </label>
                <div className="govuk-hint">As shown on applicant's passport or official ID</div>
                {errors.givenName && <span className="govuk-error-message">{errors.givenName}</span>}
                <input
                  className="govuk-input govuk-input--width-20"
                  id="givenName"
                  type="text"
                  value={formData.givenName}
                  onChange={(e) => handleChange("givenName", e.target.value)}
                />
              </div>

              <div className={`govuk-form-group ${errors.surname ? "govuk-form-group--error" : ""}`}>
                <label className="govuk-label govuk-label--s" htmlFor="surname">
                  Surname / Family Name <span style={{ color: "#d4351c" }}>*</span>
                </label>
                {errors.surname && <span className="govuk-error-message">{errors.surname}</span>}
                <input
                  className="govuk-input govuk-input--width-20"
                  id="surname"
                  type="text"
                  value={formData.surname}
                  onChange={(e) => handleChange("surname", e.target.value)}
                />
              </div>

              <div className="govuk-form-group">
                <fieldset className="govuk-fieldset">
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
                    Gender
                  </legend>
                  <div className="govuk-radios govuk-radios--inline">
                    {["Male", "Female", "Other"].map((g) => (
                      <div className="govuk-radios__item" key={g}>
                        <input
                          className="govuk-radios__input"
                          id={`gender-${g}`}
                          name="gender"
                          type="radio"
                          value={g}
                          checked={formData.gender === g}
                          onChange={() => handleChange("gender", g)}
                        />
                        <label className="govuk-label govuk-radios__label" htmlFor={`gender-${g}`}>
                          {g}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Date of Birth */}
              <div className={`govuk-form-group ${errors.dob ? "govuk-form-group--error" : ""}`}>
                <fieldset className="govuk-fieldset" role="group">
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
                    Date of Birth <span style={{ color: "#d4351c" }}>*</span>
                  </legend>
                  <div className="govuk-hint">For example, 27 3 1995</div>
                  {errors.dob && <span className="govuk-error-message">{errors.dob}</span>}
                  <div className="govuk-date-input">
                    <div className="govuk-date-input__item">
                      <label className="govuk-label govuk-date-input__label" htmlFor="dobDay">
                        Day
                      </label>
                      <input
                        className="govuk-input govuk-date-input__input govuk-input--width-2"
                        id="dobDay"
                        type="text"
                        inputMode="numeric"
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
                        inputMode="numeric"
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
                        inputMode="numeric"
                        maxLength="4"
                        value={formData.dobYear}
                        onChange={(e) => handleChange("dobYear", e.target.value)}
                      />
                    </div>
                  </div>
                </fieldset>
              </div>

              {/* Place & Country of Birth */}
              <div className={`govuk-form-group ${errors.placeOfBirth ? "govuk-form-group--error" : ""}`}>
                <label className="govuk-label govuk-label--s" htmlFor="placeOfBirth">
                  Place / City of Birth <span style={{ color: "#d4351c" }}>*</span>
                </label>
                {errors.placeOfBirth && <span className="govuk-error-message">{errors.placeOfBirth}</span>}
                <input
                  className="govuk-input govuk-input--width-20"
                  id="placeOfBirth"
                  type="text"
                  value={formData.placeOfBirth}
                  onChange={(e) => handleChange("placeOfBirth", e.target.value)}
                />
              </div>

              <div className={`govuk-form-group ${errors.countryOfCitizenship ? "govuk-form-group--error" : ""}`}>
                <label className="govuk-label govuk-label--s" htmlFor="countryOfCitizenship">
                  Country of Citizenship <span style={{ color: "#d4351c" }}>*</span>
                </label>
                {errors.countryOfCitizenship && <span className="govuk-error-message">{errors.countryOfCitizenship}</span>}
                <input
                  className="govuk-input govuk-input--width-20"
                  id="countryOfCitizenship"
                  type="text"
                  value={formData.countryOfCitizenship}
                  onChange={(e) => handleChange("countryOfCitizenship", e.target.value)}
                />
              </div>

              {/* Passport Number */}
              <div className={`govuk-form-group ${errors.passportNumber ? "govuk-form-group--error" : ""}`}>
                <label className="govuk-label govuk-label--s" htmlFor="passportNumber">
                  Passport / Travel Document Number <span style={{ color: "#d4351c" }}>*</span>
                </label>
                <div className="govuk-hint">Unique identification reference for status lookup and eVisa linking</div>
                {errors.passportNumber && <span className="govuk-error-message">{errors.passportNumber}</span>}
                <input
                  className="govuk-input govuk-input--width-20"
                  id="passportNumber"
                  type="text"
                  value={formData.passportNumber}
                  onChange={(e) => handleChange("passportNumber", e.target.value)}
                />
              </div>

              {/* Section 3: Contact Details */}
              <h2 className="govuk-heading-l" style={{ marginTop: "30px" }}>
                3. Contact Information & Address
              </h2>

              <div className={`govuk-form-group ${errors.email ? "govuk-form-group--error" : ""}`}>
                <label className="govuk-label govuk-label--s" htmlFor="email">
                  Email Address <span style={{ color: "#d4351c" }}>*</span>
                </label>
                <div className="govuk-hint">Official applicant notifications and login verification codes will be sent here</div>
                {errors.email && <span className="govuk-error-message">{errors.email}</span>}
                <input
                  className="govuk-input govuk-input--width-20"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              <div className={`govuk-form-group ${errors.phone ? "govuk-form-group--error" : ""}`}>
                <label className="govuk-label govuk-label--s" htmlFor="phone">
                  Telephone Number <span style={{ color: "#d4351c" }}>*</span>
                </label>
                {errors.phone && <span className="govuk-error-message">{errors.phone}</span>}
                <input
                  className="govuk-input govuk-input--width-20"
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>

              <div className={`govuk-form-group ${errors.address ? "govuk-form-group--error" : ""}`}>
                <label className="govuk-label govuk-label--s" htmlFor="address">
                  Current Residential Address <span style={{ color: "#d4351c" }}>*</span>
                </label>
                {errors.address && <span className="govuk-error-message">{errors.address}</span>}
                <textarea
                  className="govuk-textarea"
                  id="address"
                  rows="3"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>

              {/* Caseworker Declaration */}
              <div className={`govuk-form-group ${errors.agreedToTerms ? "govuk-form-group--error" : ""}`} style={{ marginTop: "30px" }}>
                <div className="govuk-checkboxes__item">
                  <input
                    className="govuk-checkboxes__input"
                    id="agreedToTerms"
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => handleChange("agreedToTerms", e.target.checked)}
                  />
                  <label className="govuk-label govuk-checkboxes__label" htmlFor="agreedToTerms">
                    I confirm that the applicant details provided above are accurate and verified against official identity documentation according to UKVI immigration rules.
                  </label>
                </div>
                {errors.agreedToTerms && <span className="govuk-error-message">{errors.agreedToTerms}</span>}
              </div>

              <div className="govuk-button-group" style={{ marginTop: "30px" }}>
                <button
                  type="submit"
                  className="govuk-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Application"}
                </button>
                <Link to="/Admin-Login" className="govuk-button govuk-button--secondary">
                  Cancel
                </Link>
              </div>
            </form>
          )}
        </div>

        <div className="govuk-grid-column-one-third">
          <div className="gem-c-contextual-sidebar">
            <h2 className="gem-c-related-navigation__main-heading">Admin Management</h2>
            <ul className="govuk-list">
              <li>
                <Link to="/edit-application" className="govuk-link">
                  Search & Edit Applications
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
