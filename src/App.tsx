import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import type { RootState } from "./redux/store";
import Login from "./screens/auth/login";
import Register from "./screens/auth/register";
import Home from "./screens/home/home";

function App() {
  return (
    <div className="h-full w-full p-6 space-y-4 flex justify-center items-center">
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
export const ProtectRoute = () => {
  const { uid } = useSelector((state: RootState) => state.auth);

  if (!uid) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const { uid } = useSelector((state: RootState) => state.auth);

  if (uid) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
