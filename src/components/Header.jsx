import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  generatePDF,
  generateXML,
  generateExcel,
} from "../utils/fileGenerator";
import logo from "../assets/icons/logo.svg";
import bankAccountLogo from "../assets/icons/bankAccountLogo.svg";
import reportLogo from "../assets/icons/report.png";
import profilePhoto from "../assets/Images/profilePhoto.jpg";
import { Link } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const forms = useSelector((state) => state.forms);
  const formSubmit = forms.kycForms.submitForm;
  const { username, role, userId } = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState(null);

  const [showDropDown, setShowDropDown] = useState(false);

  const handleMouseEnter = () => setShowDropDown(true);
  const handleMouseLeave = () => setShowDropDown(false);

  const [showDownload, setShowDownload] = useState(false);
  const handleMouseIn = () => setShowDownload(true);
  const handleMouseOut = () => setShowDownload(false);

  // Fetch form data using userId
  const fetchFormData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users`, {
        params: { id: userId }, // Pass userId as a query parameter
      });

      if (response.data && response.data.length > 0) {
        setFormDetails(response.data[0].kycForms); // Set the first matched record
        console.log("User KYC Forms:", response.data[0].kycForms);
      } else {
        console.log("No data found for the given user ID.");
      }
    } catch (error) {
      console.error("Failed to fetch KYC forms:", error);
    }
  };

  const handleDownloadFile = (type) => {
    if (!formDetails) {
      console.error("No form data available to download.");
      return;
    }

    if (type === "PDF") {
      generatePDF(formDetails);
    } else if (type === "XML") {
      generateXML(formDetails);
    } else if (type === "EXCEL") {
      generateExcel(formDetails);
    }
  };

  useEffect(() => {
    const checkAndLogout = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        localStorage.removeItem("authToken");
        navigate("/login");
        window.location.reload();
        return;
      }
    };

    checkAndLogout();
  }, [navigate]);

  return (
    <header className="p-[16px] items-center">
      <div className="flex justify-between mb-4">
        <div className="logo-section flex gap-[16px]">
          <div className="main-logo">
            <img src={logo} alt="logo image" className="size-[36px]" />
          </div>
          <div className="border-[1px]"></div>
        </div>

        <div className="flex gap-8 items-center">
          {location.pathname === "/layout/view-details" ? (
            <div
              className="flex gap-1 relative"
              onMouseEnter={handleMouseIn}
              onMouseLeave={handleMouseOut}
            >
              <img src={reportLogo} alt="Report icon" className="size-[20px]" />
              <span className="text-primary text-[14px]">Report</span>
              {showDownload && (
                <div className="flex flex-col gap-2 w-[150px] rounded-[10px] shadow-2xl p-2 text-center bg-secondery absolute top-[20px] right-[-40px]">
                  <span
                    className="text-primary text-[14px] cursor-pointer hover:underline"
                    onClick={() => {
                      fetchFormData();
                      handleDownloadFile("PDF");
                    }}
                  >
                    Download PDF
                  </span>
                  <span
                    className="text-primary text-[14px] cursor-pointer hover:underline"
                    onClick={() => {
                      fetchFormData();
                      handleDownloadFile("XML");
                    }}
                  >
                    Download XML
                  </span>
                  <span
                    className="text-primary text-[14px] cursor-pointer hover:underline"
                    onClick={() => {
                      fetchFormData();
                      handleDownloadFile("EXCEL");
                    }}
                  >
                    Download Excel
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-1">
              <img
                src={bankAccountLogo}
                alt="Bank icon"
                className="size-[20px]"
              />
              <span className="text-primary text-[14px]">Account</span>
            </div>
          )}

          <div
            className="account-details flex gap-1 cursor-pointer relative h-full items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="profile flex gap-2 min-w-[150px] justify-center items-center">
              <img
                src={profilePhoto}
                alt="User profile picture"
                className="rounded-full border-2 border-primary size-[40px]"
              />
              <div className="flex flex-col">
                <h1 className="text-[14px] font-medium">{username}</h1>
                <h1 className="text-[12px]">{role}</h1>
              </div>
            </div>
            {showDropDown && (
              <div className="dropdown-container absolute top-[30px] right-0 mt-2 p-2 border bg-white shadow-lg rounded min-w-[80px]">
                <Link
                  to="/logout"
                  className="text-primary text-[14px] flex justify-center  hover:underline"
                  handleMouseEnter
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-[1px] border-gray-300"></div>
      <div className="header-Information flex justify-between mt-4">
        <div className="flex flex-col">
          <h1 className="font-medium text-[20px]">KYC</h1>
          <p className="text-[10px] text-gray-400">Add New KYC</p>
        </div>
        <div>
          <h1 className="font-medium text-[20px]">
            SARVADHI SOLUTION PVT.LTD.
          </h1>
        </div>
      </div>
    </header>
  );
}
