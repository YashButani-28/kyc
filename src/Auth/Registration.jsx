import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthPageImage from "./AuthPageImage";
import Input from "./AuthComponents/Input";
import SelectInput from "./AuthComponents/SelectInput";
import AuthButtons from "./AuthComponents/AuthButtons";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../redux/slices/auth";

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "",
    },
  });

  // data fetch from server and store to redux store
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setServerError("Failed to load user data. Please try again.");
      }
    };
    fetchUsers();
  }, []);

  const userExists = (email, role) => {
    return users.some((user) => user.email === email && user.role === role);
  };
  const onSubmit = async (data) => {
    setServerError("");
    try {
      if (userExists(data.email, data.role)) {
        setServerError("A user with the same email and role already exists.");
        return;
      }

      // Generate the next ID for the new user
      const nextId =
        users.length > 0 ? Number(users[users.length - 1].id) + 1 : 1;

      // Post the new user data to the server
      const newUserData = {
        ...data,
        id: String(nextId),
        // kycForms: { form1: {}, form2: {}, form3: {}, form4: {} },
      };
      await axios.post("http://localhost:3000/users", newUserData);
      navigate("/login");
    } catch (error) {
      setServerError("Failed to register user. Please try again.");
    }
  };

  return (
    <div className="Authentication-page flex w-full">
      <AuthPageImage />
      <div className="w-3/5 flex flex-col justify-center items-center bg-white px-10">
        <h1 className="text-3xl font-bold mb-6">Register</h1>
        <form
          className="w-full max-w-sm space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              label="Name"
              name="name"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm ml-[10px]">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email should look like this, john.xyz@example",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm ml-[10px]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Mobile Number"
              name="contact_no"
              type="number"
              placeholder="Enter your mobile number"
              {...register("contact_no", {
                required: "Mobile number is required",
                minLength: {
                  value: 10,
                  message: "Mobile number must be at least 10 digits",
                },
                maxLength: {
                  value: 12,
                  message: "Mobile number must be at most 12 digits",
                },
              })}
            />
            {errors.contact_no && (
              <p className="text-red-500 text-sm ml-[10px]">
                {errors.contact_no.message}
              </p>
            )}
          </div>

          <div>
            <SelectInput
              label="Choose Role"
              options={[
                { value: "Admin", label: "Admin" },
                { value: "User", label: "User" },
              ]}
              {...register("role", {
                required: "Role is required",
              })}
              onChange={(e) => {
                setValue("role", e.target.value);
                clearErrors("role");
              }}
            />
            {errors.role && (
              <p className="text-red-500 text-sm ml-[10px]">
                {errors.role.message}
              </p>
            )}
          </div>

          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter your Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              className="absolute top-[40px] right-[15px] text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm ml-[10px]">
                {errors.password.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="text-red-500 text-sm text-center">{serverError}</p>
          )}

          <AuthButtons>Register</AuthButtons>
        </form>

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
