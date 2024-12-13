import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import reportLogo from "../../assets/icons/report.png";
import {
  generatePDF,
  generateXML,
  generateExcel,
} from "../../utils/fileGenerator";

import axios from "axios";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { clearAllFormData } from "../../redux/slices/forms";
import { editKycForm } from "../../redux/slices/forms";
import { fetchFormDetails } from "../../redux/slices/forms";
import { NavLink } from "react-router-dom";
import { resetFormState } from "../../redux/slices/forms";
import ButtonGroup from "../formComponents/ButtonGroup";
function ViewDetails() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const [formDetails, setFormDetails] = useState([]);
  const [formDetails1, setFormDetails1] = useState([]);

  const [dataChanged, setDataChanged] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState(null);

  const [showDownload, setShowDownload] = useState(false);
  const handleMouseIn = () => setShowDownload(true);
  const handleMouseOut = () => setShowDownload(false); // State to store the key of the form to be deleted

  const userId = useSelector((state) => state.auth.user.userId);

  // Function to fetch user details from the server
  const fetchKYCForm = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users?id=${userId}`
      );

      const userKYCForms = response.data[0];

      const appKeys = Object.keys(userKYCForms).filter((key) =>
        key.startsWith("APP")
      );

      const appDataArray = appKeys.map((key) => ({
        key,
        value: userKYCForms[key],
      }));
      console.log("sasas", appDataArray);

      setFormDetails(appDataArray);
      console.log("all the data", formDetails);
    } catch (error) {
      console.error("Failed to fetch KYC forms:", error);
    }
  };

  const deleteKycForms = () => {
    if (keyToDelete) {
      console.log("deletekey", keyToDelete);

      dispatch(clearAllFormData(userId, keyToDelete));
      setDataChanged((prev) => !prev);

      console.log(dataChanged);

      setShowModal(false);
      // window.location.reload();
    }

    console.log("Failed to fetch KYC forms:");
  };

  const editKycForms = (key) => {
    // dispatch(clearAllFormData(userId));
    // dispatch(editKycForm());
    console.log(key);
    console.log(userId);

    dispatch(fetchFormDetails({ userId, key }));
    navigate("/layout/basic-details");
  };

  useEffect(() => {
    if (userId) {
      fetchKYCForm(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (formDetails) {
      console.log("Form details updated:", formDetails);
    }
  }, [formDetails]);

  function getNewForm() {
    dispatch(resetFormState());
    navigate("/layout/basic-details");
  }

  const fetchFormData = async (userId, key) => {
    try {
      console.log("1111", key);
      console.log("3333", typeof userId);

      const response = await axios.get(`http://localhost:3000/users/${userId}`);

      const data = response.data;
      console.log("121212121", data[key]);
      const formData = data[key];

      setFormDetails1(formData);
      console.log("asdasdadasdaasasdas", formDetails1);
    } catch (error) {
      console.error("Failed to fetch KYC forms:", error);
    }
  };

  const handleDownloadFile = (type) => {
    if (!formDetails1) {
      console.error("No form data available to download.");
      return;
    }

    if (type === "PDF") {
      generatePDF(formDetails1);
    } else if (type === "XML") {
      generateXML(formDetails1);
    } else if (type === "EXCEL") {
      generateExcel(formDetails1);
    }
  };
  return (
    <div>
      <table className="w-full border-collapse text-[#696774]">
        <thead className="bg-[#F3F2F8]">
          <tr className="font-thin">
            <th className="py-2 px-2 font-normal text-center w-1/12">
              Application No.
            </th>
            <th className="font-normal text-center w-1/12">Company Name</th>
            <th className="font-normal text-center w-1/12">Contact No.</th>
            <th className="font-normal text-center w-1/12">Address</th>
            <th className="font-normal text-center w-1/12">Street</th>
            <th className="font-normal text-center w-1/12">Zip Code</th>
            <th className="font-normal text-center w-1/12">City</th>
            <th className="font-normal text-center w-1/12">State</th>
            <th className="font-normal text-center w-1/12">Country</th>
            <th className="font-normal text-center w-1/12">Default</th>
            <th className="font-normal text-center w-1/12">Action</th>
          </tr>
        </thead>
        <tbody>
          {formDetails && formDetails.length > 0 ? (
            formDetails.map((form, index) => (
              <tr className="border-b" key={form.key}>
                <td className="py-2 px-2 text-center">{form.key}</td>
                <td className="text-center">
                  {form.value.form1?.company || "-"}
                </td>
                <td className="text-center">
                  {form.value.form4?.contactNo || "-"}
                </td>
                <td className="text-center">
                  {form.value.form4?.addressType || "-"}
                </td>
                <td className="text-center">
                  {form.value.form4?.street || "-"}
                </td>
                <td className="text-center">
                  {form.value.form4?.zipcode || "-"}
                </td>
                <td className="text-center">{form.value.form4?.city || "-"}</td>
                <td className="text-center">
                  {form.value.form4?.state || "-"}
                </td>
                <td className="text-center">
                  {form.value.form4?.country || "-"}
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="accent-primary focus:outline-none focus:ring-0"
                  />
                </td>
                <td className="text-center">
                  <div className="flex justify-center gap-1 items-center">
                    <button
                      onClick={() => editKycForms(form.key)}
                      className="text-primary px-1 py-1 rounded"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setKeyToDelete(form.key);
                      }}
                      className="text-[#FF0F0F] px-1 py-1 rounded"
                    >
                      <FaTrashAlt />
                    </button>

                    <div
                      className="flex gap-1 relative"
                      onMouseEnter={handleMouseIn}
                      onMouseLeave={handleMouseOut}
                    >
                      <img
                        src={reportLogo}
                        alt="Report icon"
                        className="size-[20px]"
                      />
                      <span className="text-primary text-[14px]">Download</span>
                      {showDownload && (
                        <div className="flex flex-col gap-2 w-[150px] rounded-[10px] shadow-2xl p-2 text-center bg-secondery absolute top-[20px] right-[-40px]">
                          <span
                            className="text-primary text-[14px] cursor-pointer hover:underline"
                            onClick={() => {
                              fetchFormData(userId, form.key);
                              handleDownloadFile("PDF");
                            }}
                          >
                            Download PDF
                          </span>
                          <span
                            className="text-primary text-[14px] cursor-pointer hover:underline"
                            onClick={() => {
                              fetchFormData(userId, form.key);
                              handleDownloadFile("XML");
                            }}
                          >
                            Download XML
                          </span>
                          <span
                            className="text-primary text-[14px] cursor-pointer hover:underline"
                            onClick={() => {
                              fetchFormData(userId, form.key);
                              handleDownloadFile("EXCEL");
                            }}
                          >
                            Download Excel
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center py-4">
                <p>No Data Found!</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-center text-lg font-semibold mb-4">
              Confirm Deletion
            </h2>
            <div className=" px-4">
              <p className="mb-4">
                Are you sure you want to delete
                <span className="text-primary">{` "${keyToDelete}"`}</span> KYC
                form?
              </p>
              {/* <p className=" mb-4 ">
                Are you sure you want to delete {`"${keyToDelete}"`} KYC form?
              </p> */}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteKycForms()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center mt-12">
        <button
          onClick={getNewForm}
          className="bg-black px-2 py-2 text-white flex items-center h-full rounded-[5px]"
        >
          Fill New Form
        </button>
      </div>
    </div>
  );
}

export default ViewDetails;
