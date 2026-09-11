import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { adminLogin } from "../api/client.api";
import GovukLayout from "../components/layout/GovukLayout";
import { ErrorSummary, NotificationBanner, InsetText } from "../components/common/GdsElements";

export default function AdminLogin({ isAdminLoggedIn, onLoginSuccess, onLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Login - UK Visas and Immigration - GOV.UK";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMsg("Enter both username and password to sign in.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await adminLogin({ username: username.trim(), password });
      setIsSubmitting(false);
      onLoginSuccess(response.token || "admin-authenticated");
      navigate("/new-application");
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || "Invalid admin credentials. Access denied.");
    }
  };

  const breadcrumbs = [
    { title: "Home", url: "/" },
    { title: "Admin Portal", url: "/Admin-Login" }
  ];

  return (
    <GovukLayout
      breadcrumbs={breadcrumbs}
      isAdminLoggedIn={isAdminLoggedIn}
      onLogout={onLogout}
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <span className="govuk-caption-xl">Internal Service</span>
          <h1 className="govuk-heading-xl">UKVI Admin Portal Sign In</h1>

          <p className="govuk-body-l">
            Sign in to access the UK Visas and Immigration caseworker management portal.
          </p>

          {isAdminLoggedIn ? (
            <div>
              <NotificationBanner title="Admin Session Active" success>
                <h2 className="govuk-heading-m" style={{ margin: 0 }}>
                  You are signed in as an administrator
                </h2>
                <p className="govuk-body" style={{ marginTop: '10px', marginBottom: 0 }}>
                  You have full caseworker privileges to issue new eVisa client applications and update status records in the database.
                </p>
              </NotificationBanner>

              <div className="status-card">
                <h3 className="govuk-heading-m" style={{ marginTop: 0 }}>Quick Actions</h3>
                <div className="govuk-button-group" style={{ marginBottom: 0 }}>
                  <Link to="/new-application" className="govuk-button">
                    Create New Application
                  </Link>
                  <Link to="/edit-application" className="govuk-button govuk-button--secondary">
                    Manage / Edit Applications
                  </Link>
                  <button
                    type="button"
                    className="govuk-button govuk-button--warning"
                    onClick={onLogout}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {errorMsg && (
                <ErrorSummary
                  errors={[{ field: "admin-username", message: errorMsg }]}
                />
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className={`govuk-form-group ${errorMsg ? "govuk-form-group--error" : ""}`}>
                  <label className="govuk-label govuk-label--m" htmlFor="admin-username">
                    Admin Username
                  </label>
                  <div id="username-hint" className="govuk-hint">
                    Enter your assigned UKVI administration username
                  </div>
                  {errorMsg && (
                    <span className="govuk-error-message">
                      <span className="govuk-visually-hidden">Error:</span> {errorMsg}
                    </span>
                  )}
                  <input
                    className={`govuk-input govuk-input--width-20 ${errorMsg ? "govuk-input--error" : ""}`}
                    id="admin-username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (errorMsg) setErrorMsg("");
                    }}
                    autoComplete="username"
                    autoFocus
                    required
                  />
                </div>

                <div className="govuk-form-group">
                  <label className="govuk-label govuk-label--m" htmlFor="admin-password">
                    Password
                  </label>
                  <div id="password-hint" className="govuk-hint">
                    Enter your administrator security credentials
                  </div>
                  <input
                    className="govuk-input govuk-input--width-20"
                    id="admin-password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMsg) setErrorMsg("");
                    }}
                    autoComplete="current-password"
                    required
                  />
                </div>

                <div className="govuk-button-group" style={{ marginTop: "30px" }}>
                  <button
                    type="submit"
                    className="govuk-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Authenticating..." : "Sign in to Admin Portal"}
                  </button>
                </div>
              </form>

              <InsetText>
                <strong>Restricted system:</strong> Unauthorized access or misuse of immigration records is prohibited under the UK Data Protection Act 2018 and Computer Misuse Act 1990.
              </InsetText>
            </>
          )}
        </div>

        <div className="govuk-grid-column-one-third">
          <div className="gem-c-contextual-sidebar">
            <h2 className="gem-c-related-navigation__main-heading">Caseworker Support</h2>
            <ul className="govuk-list">
              <li>
                <a href="mailto:support@ukvi.gov.uk" className="govuk-link">
                  Request Admin Access
                </a>
              </li>
              <li>
                <a href="#reset" onClick={(e) => { e.preventDefault(); alert("Please contact the UKVI IT system administrator to reset credentials."); }} className="govuk-link">
                  Forgot Admin Password?
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </GovukLayout>
  );
}
