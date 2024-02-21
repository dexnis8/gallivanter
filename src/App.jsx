import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login, { SignInAsCreator, SignInAsUser } from "./pages/auth/Login";
import Register, { SignUpAsCreator, SignUpAsUser } from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ConfirmMail from "./pages/auth/ConfirmMail";
import VerifyEmail from "./pages/auth/VerifyEmail";
import VerifyEmailConfirm from "./pages/auth/VerifyEmailConfirm";
import NewPassword from "./pages/auth/NewPassword";
import GoogleCallback from "./pages/auth/GoogleCallback";
import { DashboardLayout } from "./pages/dashboard/creator/DashboardLayout";
import RequireAuth from "./components/RequireAuth";
import Tours from "./pages/explore/Tours";
import CreatedTours from "./pages/dashboard/creator/CreatedTours";
import CreatorProfile from "./pages/dashboard/creator/CreatorProfile";
import { CreateTour } from "./pages/dashboard/creator/CreateTour";
import Overview from "./pages/dashboard/creator/Overview";
import SingleTourDetails from "./pages/explore/SingleTourDetails";
import { UserDashboardLayout } from "./pages/dashboard/user/UserDashboardLayout";
import { ToursJoined } from "./pages/dashboard/user/ToursJoined";
import { UserProfile } from "./pages/dashboard/user/UserProfile";
import { EditTour } from "./pages/dashboard/creator/EditTour";
import CreatorSingleTour from "./pages/dashboard/creator/CreatorSingleTour";

// The creator dashboard
// 1. The create tour button
// 2. The creator profile too
// 3. The list of tours they've created
// 4. The list of users who have joined their tours.
const App = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth">
          <Route index element={<Login />} />
          <Route path="sign-in" element={<Login />}>
            <Route path="user" element={<SignInAsUser />} />
            <Route path="creator" element={<SignInAsCreator />} />
          </Route>
          <Route path="sign-up" element={<Register />}>
            <Route path="user" element={<SignUpAsUser />} />
            <Route path="creator" element={<SignUpAsCreator />} />
          </Route>
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route
            path="reset-password-email-verification"
            element={<ConfirmMail />}
          />
          <Route path="email/verify" element={<VerifyEmail />} />
          <Route
            path="email/confirm/:verify_token"
            element={<VerifyEmailConfirm />}
          />
          <Route path="reset-password/:resetLink" element={<NewPassword />} />
          <Route path="google/callback" element={<GoogleCallback />} />
        </Route>
        <Route path="/explore" element={<Tours />} />
        <Route path="/explore/tour/:id" element={<SingleTourDetails />} />
        <Route
          path="view-creator-tour/:id"
          element={
            <RequireAuth>
              <CreatorSingleTour />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="created-tours" element={<CreatedTours />} />
          <Route path="creator/profile" element={<CreatorProfile />} />
          <Route path="create-tour" element={<CreateTour />} />
          <Route path="edit-tour/:tour_id" element={<EditTour />} />
        </Route>
        <Route
          path="/user"
          element={
            <RequireAuth>
              <UserDashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<ToursJoined />} />
          <Route path="joined-tours" element={<ToursJoined />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
        {/* Page not found route */}
        <Route
          path="*"
          element={
            <>
              <div className="flex flex-col gap-6 items-center justify-center w-full h-[100vh]">
                <h1 className="text-2xl font-bold">
                  Error 404: Page Not Found.
                </h1>{" "}
                <button
                  className="border bg-purple-600 py-4 px-6 rounded-lg text-white text-lg"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </button>{" "}
              </div>
            </>
          }
        />
      </Routes>
    </>
  );
};

export default App;
