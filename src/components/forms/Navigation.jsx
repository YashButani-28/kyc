import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navigation({ stepCompleted }) {
  const location = useLocation();

  const [homePage, setHomePage] = useState(false);
  const [hasAppKeys, setHasAppKeys] = useState(null);
  const forms = useSelector((state) => state.forms);
  const kycForms = forms.kycForms;
  const { userId } = useSelector((state) => state.auth.user);

  useEffect(() => {
    const existingForms = async (userId) => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        const users = response.data;

        // Find the user object with the matching userId
        const user = users.find((user) => user.id === userId);

        if (user) {
          // Check if any keys start with "APP"
          const hasKeys = Object.keys(user).some((key) =>
            key.startsWith("APP")
          );

          if (hasKeys) {
            setHasAppKeys(true);
          }
        } else {
          setHasAppKeys(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    existingForms(userId);
  }, [userId, hasAppKeys]);

  return (
    <>
      <div className="Nav-bar bg-secondery w-full h-[40px]">
        <ul className="flex text-[14px] h-full items-center justify-between">
          {homePage || location.pathname !== "/layout/view-details" ? (
            <>
              <div className="flex gap-4 text-[14px] px-6 h-full items-center">
                <NavLink
                  to="basic-details"
                  className={({ isActive }) =>
                    stepCompleted[0]
                      ? isActive
                        ? "border-b-2 border-primary flex items-center h-full"
                        : "flex items-center h-full"
                      : "pointer-events-none text-gray-500"
                  }
                >
                  <li className="">Basic Details</li>
                </NavLink>

                <NavLink
                  to="terms-datails"
                  className={({ isActive }) => {
                    if (kycForms.form2 !== null || stepCompleted[1]) {
                      return isActive
                        ? "border-b-2 border-primary flex items-center h-full"
                        : "flex items-center h-full";
                    }
                    return "pointer-events-none text-gray-500";
                  }}
                >
                  <li className="">Terms Details</li>
                </NavLink>

                <NavLink
                  to="user-details"
                  className={({ isActive }) => {
                    if (kycForms.form3 !== null || stepCompleted[2]) {
                      return isActive
                        ? "border-b-2 border-primary flex items-center h-full"
                        : "flex items-center h-full";
                    }
                    return "pointer-events-none text-gray-500";
                  }}
                >
                  <li className="">User Details</li>
                </NavLink>

                <NavLink
                  to="address-details"
                  className={({ isActive }) => {
                    if (kycForms.form4 !== null || stepCompleted[3]) {
                      return isActive
                        ? "border-b-2 border-primary flex items-center h-full"
                        : "flex items-center h-full";
                    }
                    return "pointer-events-none text-gray-500";
                  }}
                >
                  <li className="">Address Details</li>
                </NavLink>
              </div>
              {hasAppKeys && (
                <div className="px-6 h-full">
                  <NavLink
                    to="view-details"
                    onClick={() => setHomePage(false)}
                    className="px-2 bg-black flex items-center h-full rounded-[5px]"
                  >
                    <li className="text-secondery">View Details </li>
                  </NavLink>
                </div>
              )}
            </>
          ) : (
            <div className="h-full w-full flex justify-between px-6">
              <div className="h-full">
                <NavLink
                  to="view-details"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-primary flex items-center h-full"
                      : undefined
                  }
                >
                  <li className="">View Details</li>
                </NavLink>
              </div>
              <div className="flex gap-4">
                <div>
                  <NavLink
                    onClick={() => setHomePage(true)}
                    to="basic-details"
                    className="bg-black px-2 flex items-center h-full rounded-[5px]"
                  >
                    <li className="text-secondery">Home Form</li>
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
