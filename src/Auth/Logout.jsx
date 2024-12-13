import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { persistor } from "../redux/store";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/auth";
export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the auth token from localStorage
    localStorage.removeItem("authToken");
    persistor.purge();
    dispatch(logout());
    // Redirect to the login page
    navigate("/login");
  }, [navigate]);

  return (
    <div className="logout-page">
      <h1>Logging out...</h1>
    </div>
  );
}
