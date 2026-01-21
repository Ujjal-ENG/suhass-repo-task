import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage";
import RegisterPage from "./pages/RegisterPage";
import UsersPage from "./pages/UsersPage";
import { useAuthStore } from "./store/authStore";
// Placeholders for now
const Dashboard = () => (
  <div className="p-8">
    <h1>Dashboard (Coming Soon)</h1>
  </div>
);

const AuthGuard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const RoleGuard = ({ roles }: { roles: string[] }) => {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};

const PublicGuard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicGuard />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<AuthGuard />}>
          <Route
            path="/dashboard"
            element={<Navigate to="/projects" replace />}
          />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route element={<RoleGuard roles={["ADMIN"]} />}>
            <Route path="/admin/users" element={<UsersPage />} />
          </Route>
          <Route path="/" element={<Navigate to="/projects" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
