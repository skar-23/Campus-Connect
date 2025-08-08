import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";

import AuthPage from "./pages/AuthPage";
import JuniorSignupPage from "./pages/JuniorSignupPage";
import JuniorLoginPage from "./pages/JuniorLoginPage";
import JuniorHomePage from "./pages/JuniorHomePage";
import JuniorProfilePage from "./pages/JuniorProfilePage";
import JuniorEditPage from "./pages/JuniorEditPage";
import JuniorFAQPage from "./pages/JuniorFAQPage";
import JuniorTermsPage from "./pages/JuniorTermsPage";
import SeniorSignupPage from "./pages/SeniorSignupPage";
import SeniorLoginPage from "./pages/SeniorLoginPage";
import SeniorHomePage from "./pages/SeniorHomePage";
import SeniorProfilePage from "./pages/SeniorProfilePage";
import SeniorEditProfilePage from "./pages/SeniorEditProfilePage"; // Import the correct edit page
import SeniorEditPage from "./pages/SeniorEditPage";
import SeniorFAQPage from "./pages/SeniorFAQPage";
import SeniorTermsPage from "./pages/SeniorTermsPage";
import SeniorForgotPasswordPage from "./pages/SeniorForgotPasswordPage";
import SeniorVerificationCodePage from "./pages/SeniorVerificationCodePage";
import SeniorResetPasswordPage from "./pages/SeniorResetPasswordPage";
import ConnectWithSeniors from "./pages/ConnectWithSeniors";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerificationCodePage from "./pages/VerificationCodePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFound from "./pages/NotFound";
import SeniorMenteesPage from "./pages/SeniorMenteesPage";
import AuthTestPage from "./pages/AuthTestPage";
import SeniorSettingsPage from "./pages/SeniorSettingsPage";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router>
            <AuthProvider>
              <div className="App w-full min-h-screen">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/junior-signup" element={<JuniorSignupPage />} />
                  <Route path="/junior-login" element={<JuniorLoginPage />} />
                  <Route path="/junior-home" element={<JuniorHomePage />} />
                  <Route
                    path="/junior-profile"
                    element={<JuniorProfilePage />}
                  />
                  <Route path="/junior/edit" element={<JuniorEditPage />} />
                  <Route path="/junior-faq" element={<JuniorFAQPage />} />
                  <Route path="/junior-terms" element={<JuniorTermsPage />} />
                  <Route path="/senior-signup" element={<SeniorSignupPage />} />
                  <Route path="/senior-login" element={<SeniorLoginPage />} />
                  <Route path="/senior-home" element={<SeniorHomePage />} />
                  <Route
                    path="/senior-profile"
                    element={<SeniorProfilePage />}
                  />
                  <Route path="/senior-edit" element={<SeniorEditPage />} />
                  <Route path="/senior-faq" element={<SeniorFAQPage />} />
                  <Route path="/senior-terms" element={<SeniorTermsPage />} />
                  <Route
                    path="/senior-forgot-password"
                    element={<SeniorForgotPasswordPage />}
                  />
                  <Route
                    path="/senior-verification-code"
                    element={<SeniorVerificationCodePage />}
                  />
                  <Route
                    path="/senior-reset-password"
                    element={<SeniorResetPasswordPage />}
                  />
                  <Route path="/connect" element={<ConnectWithSeniors />} />
                  <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                  />
                  <Route
                    path="/verification-code"
                    element={<VerificationCodePage />}
                  />
                  <Route
                    path="/reset-password"
                    element={<ResetPasswordPage />}
                  />
                  <Route
                    path="/senior-mentees"
                    element={<SeniorMenteesPage />}
                  />
                  <Route path="/auth-test" element={<AuthTestPage />} />
                  <Route
                    path="/profile"
                    element={<Navigate to="/junior-profile" replace />}
                  />
                  <Route path="/senior-settings" element={<SeniorSettingsPage />} />
                  {/* Fixed: Use the correct edit profile page */}
                  <Route
                    path="/senior-edit-profile"
                    element={<SeniorEditProfilePage />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </AuthProvider>
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
