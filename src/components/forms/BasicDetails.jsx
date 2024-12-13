import { useForm } from "react-hook-form";
import DetailTitle from "../DetailTitle";
import Input from "../formComponents/Input";
import SelectInput from "../formComponents/SelectInput";
import ButtonGroup from "../formComponents/ButtonGroup";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setFormData } from "../redux/slices/forms";
import { saveFormData } from "../../redux/slices/forms";
import { resetSpecificForm } from "../../redux/slices/forms";
import { currentForm } from "../../redux/slices/forms";

export default function BasicDetails() {
  const { markStepCompleted } = useOutletContext();
  const form1 = useSelector((state) => state?.forms || {});

  const BasicDetails = form1?.kycForms?.form1;

  const [submitAction, setSubmitAction] = useState("");
  // const form1 = useSelector((state) => state.form.kycForms.form1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentForm(1));
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      businessType: "",
      company: "",
      gstNo: "",
      primaryContact: "",
      primaryEmail: "",
      secondaryEmail: "",
      dob: "",
      country: "",
      countryCode: "",
      mobileNo: "",
      salesPerson: "",
      assistantSalesPerson: "",
      department: "",
      acviveBox: false,
    },
  });

  useEffect(() => {
    // Reset form values when BasicDetails updates
    if (BasicDetails) {
      reset(BasicDetails);
    }
  }, [BasicDetails, reset]);

  // Reset form values when BasicDetails updates

  const watchCategory = watch("category");
  const watchSalesPerson = watch("salesPerson");

  const businessTypeOptions = {
    Proprietor: [
      "Service Sector",
      "Trading",
      "Manufacturing",
      "E-commerce",
      "Agriculture",
    ],
    Partnership: [
      "Service Sector",
      "Trading",
      "Manufacturing",
      "E-commerce",
      "Agriculture",
    ],
    LLP: ["Service Sector", "Trading", "Manufacturing", "E-commerce"],
    "Private Limited": [
      "Service Sector",
      "Trading",
      "Manufacturing",
      "E-commerce",
      "Agriculture",
    ],
    "Public Limited": [
      "Service Sector",
      "Trading",
      "Manufacturing",
      "E-commerce",
      "Agriculture",
    ],
    Others: ["Others"],
  };

  const mobileCodes = {
    India: "+91",
    Australia: "+61",
    Brazil: "+55",
    "United States": "+1",
    China: "+86",
    Italy: "+39",
    Japan: "+81",
    Pakistan: "+92",
    Russia: "+7",
    "South Africa": "+27",
    "United Kingdom": "+44",
  };

  const assistantSalesOptions = {
    "Sales Executive": [
      "Sales Support Associate",
      "Junior Sales Representative",
    ],
    "Sales Representative": ["Sales Coordinator", "Sales Assistant"],
    "Account Executive": ["Sales Trainee", "Sales Support Associate"],
    "Sales Consultant": ["Junior Sales Representative", "Sales Coordinator"],
    "Field Sales Representative": ["Sales Assistant", "Sales Trainee"],
  };

  // Department options based on selected Sales Person
  const departmentOptions = {
    "Sales Executive": ["Sales Department", "Sales Support Department"],
    "Sales Representative": ["Sales Marketing Department", "Sales Department"],
    "Account Executive": [
      "Sales Marketing Department",
      "Sales Support Department",
    ],
    "Sales Consultant": ["Sales Department", "Sales Marketing Department"],
    "Field Sales Representative": [
      "Sales Support Department",
      "Sales Department",
    ],
  };

  const onSubmit = (data) => {
    if (submitAction === "save") {
      // dispatch(formData1(data));
      dispatch(saveFormData({ formId: 1, data }));
      markStepCompleted(1);

      console.log("Save data:", data);
      // Add your save logic here
    } else if (submitAction === "saveAndNext") {
      dispatch(saveFormData({ formId: 1, data }));
      markStepCompleted(1);
      console.log("Save and Next data:", data);
      // Add your save logic here
      navigate("/layout/terms-datails");
    }
  };
  const handleResetForm = (formId) => {
    dispatch(resetSpecificForm(formId));
  };

  const handleSave = () => {
    setSubmitAction("save");
  };

  const handleSaveAndNext = () => {
    setSubmitAction("saveAndNext");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex w-full gap-2 flex-wrap">
        <div className="flex flex-col gap-4 w-[15%]">
          <DetailTitle
            title="Categoty Details"
            codeName="Party Code"
            code="P123456"
          />
        </div>
        <div className="flex w-[80%] justify-between gap-[40px]">
          <div className="flex flex-col w-full">
            <SelectInput
              label="Category"
              placeholder="Select Category"
              important
              {...register("category", { required: "Category is required" })}
              options={[
                { value: "Proprietor", label: "Proprietor" },
                { value: "Partnership", label: "Partnership" },
                { value: "LLP", label: "LLP" },
                { value: "Private Limited", label: "Private Limited" },
                { value: "Public Limited", label: "Public Limited" },
                { value: "Others", label: "Others" },
              ]}
              onChange={(e) => {
                const selectedCategory = e.target.value;
                setValue("category", selectedCategory);
                setValue("businessType", "");
                clearErrors("category");
              }}
            />
            {errors.category && (
              <p className="text-red-500 text-sm ml-[10px] mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input
              label="Company/Individual"
              {...register("company", { required: "Company Name is required" })}
              name="company"
              important
              placeholder="Enter Name"
            />
            {errors.company && (
              <p className="text-red-500 text-sm ml-[10px] mt-1">
                {errors.company.message}
              </p>
            )}
          </div>

          <SelectInput
            label="Business Type"
            placeholder="Select Business Type"
            {...register("businessType")}
            options={
              watchCategory
                ? businessTypeOptions[watchCategory]?.map((type) => ({
                    value: type,
                    label: type,
                  }))
                : []
            }
            onChange={(e) => {
              setValue("businessType", e.target.value);
            }}
          />
          <Input
            {...register("gstNo")}
            label="GST No"
            name="gstNo"
            placeholder="Enter GST No"
          />
        </div>
      </div>
      <div className="w-[99%] h-[2px]  bg-[#D9D9D9]"></div>
      {/* -------------------------------------------------------------------------------  */}
      <div className="flex w-full gap-2 ">
        <div className="flex flex-col gap-4 w-[15%]">
          <DetailTitle title="Contact Details" />
        </div>
        <div className="flex flex-col w-[80%] gap-4">
          <div className="flex w-full justify-between gap-[40px]">
            <div className="w-full flex flex-col">
              <Input
                label="Primary Contact"
                {...register("primaryContact", {
                  minLength: {
                    value: 10,
                    message: "Contact must be at least 10 digits",
                  },
                  maxLength: {
                    value: 12,
                    message: "Contact must be at most 12 digits",
                  },
                })}
                name="primaryContact"
                type="number"
                placeholder="Type Primary Contact"
              />
              {errors.primaryContact && (
                <p className="text-red-500 text-sm ml-[10px]">
                  {errors.primaryContact.message}
                </p>
              )}
            </div>
            <div className="w-full flex flex-col">
              <Input
                label="Primary Email"
                {...register("primaryEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email should look like this, john.xyz@example",
                  },
                })}
                type="email"
                name="primaryEmail"
                important
                placeholder="Enter Primary Email"
              />
              {errors.primaryEmail && (
                <p className="text-red-500 text-sm ml-[10px]">
                  {errors.primaryEmail.message}
                </p>
              )}
            </div>
            <div className="w-full flex flex-col">
              <Input
                label="Secondary Email"
                {...register("secondaryEmail", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email should look like this, john.xyz@example",
                  },
                })}
                type="email"
                name="secondaryEmail"
                placeholder="Enter Secondary Email"
              />
              {errors.secondaryEmail && (
                <p className="text-red-500 text-sm ml-[10px]">
                  {errors.secondaryEmail.message}
                </p>
              )}
            </div>
            <Input
              label="Birth Date"
              {...register("dob")}
              type="date"
              name="dob"
              placeholder="Select Date"
            />
          </div>
          <div className="flex w-full justify-between gap-[40px]">
            <div className="flex flex-col w-full">
              <SelectInput
                placeholder="Select Country"
                label="Country"
                {...register("country", { required: "Country is required" })}
                important
                options={[
                  // { value: "", label: "Select Country" },
                  { value: "Australia", label: "Australia" },
                  { value: "Brazil", label: "Brazil" },
                  { value: "India", label: "India" },
                  { value: "Canada", label: "Canada" },
                  { value: "United States", label: "United States" },
                  { value: "China", label: "China" },
                  { value: "Italy", label: "Italy" },
                  { value: "Japan", label: "Japan" },
                  { value: "Pakistan", label: "Pakistan" },
                  { value: "Russia", label: "Russia" },
                  { value: "South Africa", label: "South Africa" },
                  { value: "United Kingdom", label: "United Kingdom" },
                ]}
                onChange={(e) => {
                  const selectedCountry = e.target.value;
                  setValue("country", selectedCountry);

                  clearErrors("country");
                }}
              />
              {errors.country && (
                <p className="text-red-500 text-sm ml-[10px] mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
            <div className="relative w-full">
              <Input
                label="Mobile No."
                {...register("mobileNo", {
                  minLength: {
                    value: 10,
                    message: "Contact must be at least 10 digits",
                  },
                  maxLength: {
                    value: 12,
                    message: "Contact must be at most 12 digits",
                  },
                })}
                name="mobileNo"
                type="number"
                className="pl-[95px]"
                placeholder="Enter Mobile No."
              />
              {errors.mobileNo && (
                <p className="text-red-500 text-sm ml-[10px]">
                  {errors.mobileNo.message}
                </p>
              )}
              <div className="absolute w-20 top-[30px] left-1">
                <SelectInput
                  placeholder="Code"
                  {...register("countryCode")}
                  className="border-none focus:outline-none text-center px-[4px] py-[4px]"
                  options={Object.entries(mobileCodes).map(
                    ([country, code]) => ({
                      value: code,
                      label: `${code}`,
                    })
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    setValue("countryCode", value);
                    clearErrors("countryCode");
                  }}
                />
              </div>
            </div>
            <div className="w-full flex gap-4 items-end">
              <div className="w-1/4">
                <Input label="Phone No." name="cc" placeholder="CC" />
              </div>
              <div className="w-1/4">
                <Input name="ndc" placeholder="NDC" className="1/4" />
              </div>
              <div className="w-1/2">
                <Input
                  name="sn"
                  placeholder="1234 567 7890"
                  className="w-1/2"
                />
              </div>
            </div>
            <div className="w-full flex gap-4 items-end">
              <div className="w-1/4">
                <Input label="Fax No." name="cc" placeholder="CC" />
              </div>
              <div className="w-1/4">
                <Input
                  label="  "
                  name="ndc"
                  placeholder="NDC"
                  className="1/4"
                />
              </div>
              <div className="w-1/2">
                <Input
                  label="   "
                  name="sn"
                  placeholder="1234 567 7890"
                  className="w-1/2"
                />
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className="w-[99%] h-[2px]  bg-[#D9D9D9]"></div>
      {/* ------------------------------------------------------------------------- */}

      <div className="flex w-full gap-2 ">
        <div className="flex flex-col gap-4 w-[15%]">
          <DetailTitle title="Other Details" />
        </div>
        <div className="flex flex-col gap-4 w-[80%]">
          <div className="flex w-full justify-between gap-[20px]">
            <SelectInput
              label="Sales Person/Employee"
              {...register("salesPerson")}
              placeholder="Select Employee"
              options={[
                // { value: "", label: "Select Employee" },
                { value: "Sales Executive", label: "Sales Executive" },
                {
                  value: "Sales Representative",
                  label: "Sales Representative",
                },
                { value: "Account Executive", label: "Account Executive" },
                { value: "Sales Consultant", label: "Sales Consultant" },
                {
                  value: "Field Sales Representative",
                  label: "Field Sales Representative",
                },
              ]}
              onChange={(e) => {
                setValue("salesPerson", e.target.value);
                setValue("assistantSalesPerson", "");
                setValue("department", "");
              }}
            />
            <SelectInput
              label="Assistant Sales Person"
              {...register("assistantSalesPerson")}
              placeholder="Select Assistant Sales Person"
              options={
                watchSalesPerson
                  ? assistantSalesOptions[watchSalesPerson].map((option) => ({
                      value: option,
                      label: option,
                    }))
                  : []
              }
              onChange={(e) => {
                setValue("assistantSalesPerson", e.target.value);
              }}
            />
            <div className="w-full">
              <label
                htmlFor="Remark"
                className="text-gray-700 text-sm font-bold mb-2 ml-[5px]"
              >
                Remark
              </label>
              <textarea
                name="remark"
                {...register("remark")}
                className="w-full px-[12px] py-[8px] border border-[#69677480] placeholder-[#696774] rounded-[6px] h-[42px] mt-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Remarks"
              ></textarea>
            </div>
            <Input
              label="Registration Date"
              {...register("regDate")}
              type="date"
              name="regDate"
              placeholder="Select Date"
            />
          </div>
          <div className="flex flex-col justify-between gap-[20px] w-1/2">
            <div className="w-full">
              <SelectInput
                label="Department"
                {...register("department")}
                placeholder="Select Department"
                options={
                  watchSalesPerson
                    ? departmentOptions[watchSalesPerson].map((option) => ({
                        value: option,
                        label: option,
                      }))
                    : []
                }
                onChange={(e) => {
                  setValue("department", e.target.value);
                }}
              />
            </div>

            <div className="flex gap-[10px] w-full ml-2">
              <div className="w-7">
                <Input
                  {...register("acviveBox")}
                  type="checkbox"
                  onChange={(e) => setValue("acviveBox", e.target.checked)}
                  name=""
                  className="accent-primary focus:outline-none focus:ring-0"
                  required
                />
              </div>
              <div className="w-full flex ">
                <p className="font-semibold mr-2">Active </p>
                <span className="text-[#696774]">
                  (Please check the box if the user should be marked as Active.)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-[20px]">
        <ButtonGroup
          noPreviousButton
          ResetButton={() => handleResetForm(1)}
          onSave={handleSave}
          onSaveAndNext={handleSaveAndNext}
        />
      </div>
    </form>
  );
}
