import { Routes, Route } from 'react-router-dom';
import MainLayout from './modules/marketing/infrastructure/layouts/MainLayout';
import LandingPage from './modules/marketing/infrastructure/pages/LandingPage';
import LoginPage from './modules/auth/infrastructure/pages/LoginPage';
import RegisterPage from './modules/auth/infrastructure/pages/RegisterPage';
import AuthLayout from './modules/auth/infrastructure/layouts/AuthLayout';
import CheckoutLayout from './modules/subscription/infrastructure/layouts/CheckoutLayout';
import PlanSelectionPage from './modules/subscription/infrastructure/pages/PlanSelectionPage';
import PaymentMethodPage from './modules/subscription/infrastructure/pages/PaymentMethodPage';
import MobilePaymentPage from './modules/subscription/infrastructure/pages/MobilePaymentPage';
import BankTransferPage from './modules/subscription/infrastructure/pages/BankTransferPage';
import BinancePayPage from './modules/subscription/infrastructure/pages/BinancePayPage';
import SuccessPage from './modules/subscription/infrastructure/pages/SuccessPage';
import PendingPage from './modules/subscription/infrastructure/pages/PendingPage';
import FailedPage from './modules/subscription/infrastructure/pages/FailedPage';
import DashboardPage from './modules/dashboard/infrastructure/pages/DashboardPage';

function App() {
  return (
    <Routes>
      {/* Public Marketing Routes */}
      <Route path="/" element={
        <MainLayout>
          <LandingPage />
        </MainLayout>
      } />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Subscription/Checkout Routes */}
      <Route path="/checkout" element={<CheckoutLayout />}>
        <Route path="plan" element={<PlanSelectionPage />} />
        <Route path="payment" element={<PaymentMethodPage />} />
        <Route path="payment/mobile" element={<MobilePaymentPage />} />
        <Route path="payment/transfer" element={<BankTransferPage />} />
        <Route path="payment/crypto" element={<BinancePayPage />} />
        <Route path="success" element={<SuccessPage />} />
        <Route path="pending" element={<PendingPage />} />
        <Route path="failed" element={<FailedPage />} />
      </Route>

      {/* Main Single-Screen Dashboard Route */}
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
