import React, { useState } from "react";
import "../styles/Footer.css";

const visaOptions = [
  "Visitor Visa",
  "Accredited Employer Work Visa",
  "2021 Resident Visa",
  "Fee Paying Student Visa",
  "Working Holiday Visa",
  "Skilled Migrant Category Resident Visa",
  "Straight to Residence Visa",
  "Post Study Work Visa",
  "Partner of a Worker Work Visa",
];

function Footer() {
  const [selectedVisa, setSelectedVisa] = useState("");

  const backToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="nz-footer">
      <div className="nz-footer__inner">
        {/* Visa Lookup Row */}
        <div className="nz-footer__lookup-row">
          <div className="nz-footer__lookup-label">Visa Lookup</div>
          <div className="nz-footer__lookup-control">
            <select
              value={selectedVisa}
              onChange={(e) => setSelectedVisa(e.target.value)}
              className="nz-footer__select"
            >
              <option value="">-- Select a Visa type --</option>
              {visaOptions.map((visa, idx) => (
                <option key={idx} value={visa}>
                  {visa}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="nz-footer__grid">
          <div className="nz-footer__col">
            <h4 className="nz-footer__col-title">Immigration NZ</h4>
            <ul className="nz-footer__links">
              <li><a href="#about" onClick={(e) => e.preventDefault()}>About us</a></li>
              <li><a href="#news" onClick={(e) => e.preventDefault()}>News centre</a></li>
              <li><a href="#statistics" onClick={(e) => e.preventDefault()}>Research & statistics</a></li>
              <li><a href="#policy" onClick={(e) => e.preventDefault()}>Immigration policy & law</a></li>
              <li><a href="#glossary" onClick={(e) => e.preventDefault()}>Glossary</a></li>
            </ul>
          </div>

          <div className="nz-footer__col">
            <h4 className="nz-footer__col-title">Services & Help</h4>
            <ul className="nz-footer__links">
              <li><a href="#process" onClick={(e) => e.preventDefault()}>Process to apply</a></li>
              <li><a href="#employers" onClick={(e) => e.preventDefault()}>For employers</a></li>
              <li><a href="#visaview" onClick={(e) => e.preventDefault()}>VisaView for employers</a></li>
              <li><a href="#verification" onClick={(e) => e.preventDefault()}>Visa Verification Service</a></li>
              <li><a href="#contact" onClick={(e) => e.preventDefault()}>Contact us</a></li>
            </ul>
          </div>

          <div className="nz-footer__col">
            <h4 className="nz-footer__col-title">Legal & Privacy</h4>
            <ul className="nz-footer__links">
              <li><a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Act 2020</a></li>
              <li><a href="#terms" onClick={(e) => e.preventDefault()}>Terms of use</a></li>
              <li><a href="#complaints" onClick={(e) => e.preventDefault()}>Complaints & feedback</a></li>
              <li><a href="#scams" onClick={(e) => e.preventDefault()}>Immigration scams guidance</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & NZ Government Branding */}
        <div className="nz-footer__bottom">
          <div className="nz-footer__gov-brand">
            <svg viewBox="0 0 240 50" className="nz-footer__gov-svg" aria-label="New Zealand Government logo">
              <path fill="#ffffff" d="M12,38 Q25,25 45,8 Q38,25 28,38 Z" />
              <text x="50" y="32" fill="#ffffff" fontFamily="'Outfit', sans-serif" fontSize="20" fontWeight="700" letterSpacing="0.5">
                New Zealand Government
              </text>
            </svg>
            <span className="nz-footer__copyright">
              &copy; {new Date().getFullYear()} Immigration New Zealand. Te Tāhuhu o Te Waihanga.
            </span>
          </div>

          <button type="button" onClick={backToTop} className="nz-footer__top-btn">
            <span>Back to top</span>
            <svg viewBox="0 0 16 16" className="nz-footer__top-icon" fill="currentColor">
              <path d="M0 8L1.41 9.41L7 3.83V16H9V3.83L14.58 9.42L16 8L8 0L0 8Z" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
