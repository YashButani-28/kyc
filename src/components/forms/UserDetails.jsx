import DetailTitle from "../DetailTitle";
import Input from "../formComponents/Input";
import SelectInput from "../formComponents/SelectInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import ButtonGroup from "../formComponents/ButtonGroup";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveFormData } from "../../redux/slices/forms";
import { resetSpecificForm } from "../../redux/slices/forms";
import { currentForm } from "../../redux/slices/forms";

export default function UserDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { markStepCompleted } = useOutletContext();

  const form3 = useSelector((state) => state.forms);
  const UserDetails = form3.kycForms.form3;

  const [submitAction, setSubmitAction] = useState("");

  useEffect(() => {
    dispatch(currentForm(3));
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      terms: "",
      role: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobileNo: "",
      location: "",
      isUserBox: false,
      mumbaiPer: "",
      hongkongPer: "",
      newyorkPer: "",
      belgiumPer: "",
    },
  });
  useEffect(() => {
    // Reset form values when BasicDetails updates
    if (UserDetails) {
      reset(UserDetails);
    }
  }, [UserDetails, reset]);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const onSubmit = (data) => {
    if (submitAction === "save") {
      dispatch(saveFormData({ formId: 3, data }));
      markStepCompleted(3);

      console.log("Save data:", data);
      // Add your save logic here
    } else if (submitAction === "saveAndNext") {
      dispatch(saveFormData({ formId: 3, data }));
      markStepCompleted(3);

      console.log("Save and Next data:", data);
      // Add your save logic here
      navigate("/layout/address-details");
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

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex w-full gap-2 ">
        <div className="flex flex-col gap-4 w-[15%]">
          <DetailTitle title="Login Details" />
        </div>
        <div className="flex flex-col w-[80%] gap-4">
          <div className="flex w-full justify-between gap-[40px]">
            <div className="flex flex-col w-full">
              <SelectInput
                label="Terms"
                placeholder="Select Terms"
                {...register("terms", { required: "Terms is required" })}
                important
                options={[
                  { value: "Terms of Service", label: "Terms of Service" },
                  { value: "Privacy Policy", label: "Privacy Policy" },
                  {
                    value: "Acceptable Use Policy",
                    label: "Acceptable Use Policy",
                  },
                  {
                    value: "Non-Disclosure Agreement",
                    label: "Non-Disclosure Agreement",
                  },
                ]}
                onChange={(e) => {
                  setValue("terms", e.target.value);
                  clearErrors("terms");
                }}
              />
              {errors.terms && (
                <p className="text-red-500 text-sm ml-[10px] mt-1">
                  {errors.terms.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <SelectInput
                label="Role"
                placeholder="Select Role"
                {...register("role", { required: "Role is required" })}
                important
                options={[
                  { value: "Admin", label: "Admin" },
                  { value: "User", label: "User" },
                  { value: "Manager", label: "Manager" },
                  { value: "Guest", label: "Guest" },
                  { value: "Moderator", label: "Moderator" },
                ]}
                onChange={(e) => {
                  setValue("role", e.target.value);
                  clearErrors("role");
                }}
              />
              {errors.role && (
                <p className="text-red-500 text-sm ml-[10px] mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                label="Username"
                name="username"
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]{3,20}$/,
                    message: "Username must be 3-20 characters long",
                  },
                })}
                important
                placeholder="Enter User Name"
              />
              {errors.username && (
                <p className="text-red-500 text-sm ml-[10px] mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email should look like this, john.xyz@example",
                  },
                })}
                name="email"
                important
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm ml-[10px] mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex w-full justify-between gap-[40px]">
            <div className="relative w-full">
              <Input
                label="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type={showPassword.password ? "text" : "password"}
                name="password"
                important
                placeholder="Enter Password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute top-[40px] right-[15px] text-gray-500"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    password: !prev.password,
                  }))
                }
              >
                {showPassword.password ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm ml-[10px] mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="relative w-full">
              <Input
                label="Confirm Password"
                type={showPassword.confirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  validate: (value) =>
                    value === password || "Passwords must be match",
                })}
                name="confirmPassword"
                important
                placeholder="Enter Confirm Password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute top-[40px] right-[15px] text-gray-500"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
              >
                {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm ml-[10px] mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="w-full flex flex-col">
              <Input
                label="Mobile No"
                name="mobileNo"
                {...register("mobileNo", {
                  minLength: {
                    value: 10,
                    message: "Mobile number must be at least 10 digits",
                  },
                  maxLength: {
                    value: 12,
                    message: "Mobile number must be at most 12 digits",
                  },
                })}
                placeholder="Enter Mobile No"
                type="number"
              />
              {errors.mobileNo && (
                <p className="text-red-500 text-sm ml-[10px]">
                  {errors.mobileNo.message}
                </p>
              )}
            </div>
            <SelectInput
              label="Location"
              placeholder="Select Location"
              options={[
                { value: "Australia", label: "Australia" },
                { value: "Brazil", label: "Brazil" },
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
                setValue("location", e.target.value);
              }}
            />
          </div>
          <div className="flex gap-[10px] mt-2 w-full">
            <div className="w-4">
              <Input
                {...register("isUserBox")}
                type="checkbox"
                onChange={(e) => setValue("isUserBox", e.target.checked)}
                name=""
                className="accent-primary focus:outline-none focus:ring-0"
              />
            </div>
            <div className="w-full flex ">
              <p className="font-semibold mr-2">Is Api User? </p>
              <span className="text-[#696774] text-[14px]">
                (Please check this box if you want to grant API access to the
                user.)
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[99%] h-[2px] bg-[#D9D9D9]"></div>

      <div className="flex w-full gap-2 flex-wrap">
        <div className="flex flex-col gap-4 w-[15%]">
          <DetailTitle
            title="Additional Discount Details"
            codeName="Kindly apply an additional discount specifically to the inventories at the designated location."
            className="text-[#696774]"
          />
        </div>
        <div className="flex w-[50%] justify-between gap-[40px]">
          <div className="w-full flex flex-col">
            <Input
              label="Mumbai"
              name="mumbaiPer"
              {...register("mumbaiPer", {
                pattern: {
                  value: /^-?\d*(\.\d+)?$/,
                  message: "Enter a valid number, like 42 or 3.14.",
                },
              })}
              type="number"
              placeholder="Enter Percentage"
            />
            {errors.mumbaiPer && (
              <p className="text-red-500 text-sm ml-[10px]">
                {errors.mumbaiPer.message}
              </p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <Input
              label="Hong Kong"
              name="hongkongPer"
              {...register("hongkongPer", {
                pattern: {
                  value: /^-?\d*(\.\d+)?$/,
                  message: "Enter a valid number, like 42 or 3.14.",
                },
              })}
              type="number"
              placeholder="Enter Percentage"
            />
            {errors.hongkongPer && (
              <p className="text-red-500 text-sm ml-[10px]">
                {errors.hongkongPer.message}
              </p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <Input
              label="New York"
              name="newyorkPer"
              type="number"
              {...register("newyorkPer", {
                pattern: {
                  value: /^-?\d*(\.\d+)?$/,
                  message: "Enter a valid number, like 42 or 3.14.",
                },
              })}
              placeholder="Enter Percentage"
            />
            {errors.newyorkPer && (
              <p className="text-red-500 text-sm ml-[10px]">
                {errors.newyorkPer.message}
              </p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <Input
              label="Belgium"
              name="belgiumPer"
              type="number"
              {...register("belgiumPer", {
                pattern: {
                  value: /^-?\d*(\.\d+)?$/,
                  message: "Enter a valid number, like 42 or 3.14.",
                },
              })}
              placeholder="Enter Percentage"
            />
            {errors.belgiumPer && (
              <p className="text-red-500 text-sm ml-[10px]">
                {errors.belgiumPer.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-[20px]">
        <ButtonGroup
          previousPath="terms-datails"
          ResetButton={() => handleResetForm(3)}
          onSave={handleSave}
          onSaveAndNext={handleSaveAndNext}
        />
      </div>
    </form>
  );
}
