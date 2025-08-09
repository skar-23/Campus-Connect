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
import JuniorHomePage from "./pages/JuniorHomePage";
import JuniorProfilePage from "./pages/JuniorProfilePage";
import JuniorEditPage from "./pages/JuniorEditPage";

import SeniorSignupPage from "./pages/SeniorSignupPage";
import SeniorHomePage from "./pages/SeniorHomePage";
import SeniorProfilePage from "./pages/SeniorProfilePage";

import SeniorForgotPasswordPage from "./pages/SeniorForgotPasswordPage";
import SeniorVerificationCodePage from "./pages/SeniorVerificationCodePage";
import SeniorResetPasswordPage from "./pages/SeniorResetPasswordPage";
import ConnectWithSeniors from "./pages/ConnectWithSeniors";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerificationCodePage from "./pages/VerificationCodePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFound from "./pages/NotFound";

import AuthTestPage from "./pages/AuthTestPage";
import "./App.css";
import SeniorEditProfilePage from "./pages/SeniorEditProfilePage";
import GlobalLoader from "./components/ui/GlobalLoader";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "@/components/ui/LoginForm";
import ContactForm from "@/components/ui/ContactForm";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AboutIdeaPage from "./pages/AboutIdeaPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const { loading, setLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timeout);
  }, [location, setLoading]);

  return (
    <>
      {loading && <GlobalLoader />}
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <AuthProvider>
              <div className="App w-full min-h-screen">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/junior-signup" element={<JuniorSignupPage />} />
                  <Route path="/junior-home" element={<JuniorHomePage />} />
                  <Route
                    path="/junior-profile"
                    element={<JuniorProfilePage />}
                  />
                  <Route path="/junior/edit" element={<JuniorEditPage />} />
                  <Route path="/senior-signup" element={<SeniorSignupPage />} />
                  <Route path="/senior-home" element={<SeniorHomePage />} />
                  <Route
                    path="/senior-profile"
                    element={<SeniorProfilePage />}
                  />

                  <Route
                    path="/senior-edit-profile"
                    element={<SeniorEditProfilePage />}
                  />
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
                  <Route path="/auth-test" element={<AuthTestPage />} />
                  <Route
                    path="/profile"
                    element={<Navigate to="/junior-profile" replace />}
                  />
                  <Route path="/junior-login" element={<LoginForm />} />
                  <Route path="/contact-form" element={<ContactForm />} />
                  <Route
                    path="/privacy-policy"
                    element={<PrivacyPolicyPage />}
                  />
                  <Route path="/about-idea" element={<AboutIdeaPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

function App() {
  return (
    <LoadingProvider>
      <Router>
        <AppContent />
      </Router>
    </LoadingProvider>
  );
}

export default App;
