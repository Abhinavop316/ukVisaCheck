import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Guide Pages
import ViewEvisaShareCodePage from './pages/guide/ViewEvisaShareCodePage';
import EvisaOverviewPage from './pages/guide/EvisaOverviewPage';
import WhatYouNeedPage from './pages/guide/WhatYouNeedPage';
import SetUpUkviAccountPage from './pages/guide/SetUpUkviAccountPage';
import UpdateUkviAccountPage from './pages/guide/UpdateUkviAccountPage';
import ReportErrorPage from './pages/guide/ReportErrorPage';
import IfCannotAccessPage from './pages/guide/IfCannotAccessPage';
import TravelWithEvisaPage from './pages/guide/TravelWithEvisaPage';

// Service Pages
import ServiceStartPage from './pages/service/ServiceStartPage';
import SignInDocumentPage from './pages/service/SignInDocumentPage';
import DocumentDetailsPage from './pages/service/DocumentDetailsPage';
import SecurityCodePage from './pages/service/SecurityCodePage';
import StatusProfilePage from './pages/service/StatusProfilePage';
import ShareCodePurposePage from './pages/service/ShareCodePurposePage';
import ShareCodeResultPage from './pages/service/ShareCodeResultPage';
import CheckStatusPage from './pages/service/CheckStatusPage';

// Other Pages
import SearchResultsPage from './pages/SearchResultsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      {/* Root redirect to eVisa View & Share code page or guide */}
      <Route
        path="/"
        element={<Navigate to="/evisa/view-evisa-get-share-code-prove-immigration-status" replace />}
      />

      {/* Multi-part Guide Routes */}
      <Route path="/evisa" element={<EvisaOverviewPage />} />
      <Route path="/evisa/overview" element={<EvisaOverviewPage />} />
      <Route path="/evisa/what-you-need-to-access-evisa" element={<WhatYouNeedPage />} />
      <Route path="/evisa/set-up-ukvi-account" element={<SetUpUkviAccountPage />} />
      <Route path="/evisa/update-ukvi-account" element={<UpdateUkviAccountPage />} />
      <Route
        path="/evisa/view-evisa-get-share-code-prove-immigration-status"
        element={<ViewEvisaShareCodePage />}
      />
      <Route path="/evisa/report-error-evisa" element={<ReportErrorPage />} />
      <Route path="/evisa/if-you-cannot-access-evisa" element={<IfCannotAccessPage />} />
      <Route path="/evisa/travel-with-evisa" element={<TravelWithEvisaPage />} />

      {/* Interactive Service Routes (view-immigration-status.service.gov.uk) */}
      <Route path="/status" element={<SignInDocumentPage />} />
      <Route path="/status/view/:docNumber" element={<StatusProfilePage />} />
      <Route path="/service/start" element={<ServiceStartPage />} />
      <Route path="/service/sign-in-document" element={<SignInDocumentPage />} />
      <Route path="/service/document-details" element={<DocumentDetailsPage />} />
      <Route path="/service/security-code" element={<SecurityCodePage />} />
      <Route path="/service/status-profile" element={<StatusProfilePage />} />
      <Route path="/service/share-code-purpose" element={<ShareCodePurposePage />} />
      <Route path="/service/share-code-result" element={<ShareCodeResultPage />} />

      {/* Checker Service Routes for Employers / Landlords */}
      <Route path="/check-immigration-status" element={<CheckStatusPage />} />
      <Route path="/prove-right-to-work" element={<CheckStatusPage />} />
      <Route path="/prove-right-to-rent" element={<CheckStatusPage />} />

      {/* Search & Fallback */}
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
