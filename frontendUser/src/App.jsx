import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Service Pages
import ServiceStartPage from './pages/service/ServiceStartPage';
import SignInDocumentPage from './pages/service/SignInDocumentPage';
import DocumentDetailsPage from './pages/service/DocumentDetailsPage';
import SecurityCodePage from './pages/service/SecurityCodePage';
import StatusProfilePage from './pages/service/StatusProfilePage';
import CheckStatusPage from './pages/service/CheckStatusPage';

// Other Pages
import SearchResultsPage from './pages/SearchResultsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      {/* Root redirect directly to Status check sign in */}
      <Route path="/" element={<Navigate to="/status" replace />} />

      {/* Interactive Service Routes (view-immigration-status.service.gov.uk) */}
      <Route path="/status" element={<SignInDocumentPage />} />
      <Route path="/status/view/:docNumber" element={<StatusProfilePage />} />
      <Route path="/service/start" element={<ServiceStartPage />} />
      <Route path="/service/sign-in-document" element={<SignInDocumentPage />} />
      <Route path="/service/document-details" element={<DocumentDetailsPage />} />
      <Route path="/service/security-code" element={<SecurityCodePage />} />
      <Route path="/service/status-profile" element={<StatusProfilePage />} />

      {/* Legacy and Guide redirects to /status */}
      <Route path="/evisa/*" element={<Navigate to="/status" replace />} />
      <Route path="/service/*" element={<Navigate to="/status" replace />} />

      {/* Application Status Checker */}
      <Route path="/check-application-status" element={<CheckStatusPage />} />

      {/* Search & Fallback */}
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

