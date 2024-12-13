import React, { useState, useEffect } from "react";
import DetailTitle from "../DetailTitle";
import Input from "../formComponents/Input";
import SelectInput from "../formComponents/SelectInput";
import { useForm } from "react-hook-form";
import ButtonGroup from "../formComponents/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveFormData } from "../../redux/slices/forms";
import { dataTransmit } from "../../redux/slices/forms";
import { resetSpecificForm } from "../../redux/slices/forms";
import { currentForm } from "../../redux/slices/forms";

export default function AddressDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form4 = useSelector((state) => state.forms);
  const AddressDetails = form4.kycForms.form4;

  const userId = useSelector((state) => state.auth.user.userId);

  const [submitAction, setSubmitAction] = useState("");

  useEffect(() => {
    dispatch(currentForm(4));
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
      addressType: "",
      companyName: "",
      contactNo: "",
      unit: "",
      building: "",
      street: "",
      landmark: "",
      area: "",
      country: "",
      state: "",
      city: "",
      zipcode: "",
      addressDefaultBox: false,
    },
  });

  useEffect(() => {
    // Reset form values when BasicDetails updates
    if (AddressDetails) {
      reset(AddressDetails);
    }
  }, [AddressDetails, reset]);

  // Data structure for countries, states, and cities

  const data = {
    India: {
      states: {
        Maharashtra: ["Mumbai", "Pune", "Nagpur"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
        Karnataka: ["Bangalore", "Mysore", "Hubli"],
        Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
      },
    },

    Australia: {
      states: {
        "New South Wales": ["Sydney", "Newcastle", "Coffs Harbour"],
        Victoria: ["Melbourne", "Geelong", "Ballarat"],
        Queensland: ["Brisbane", "Gold Coast", "Cairns"],
        "Western Australia": ["Perth", "Bunbury", "Mandurah"],
        "South Australia": ["Adelaide", "Mount Gambier", "Whyalla"],
      },
    },
    Brazil: {
      states: {
        "Sao Paulo": ["Sao Paulo", "Campinas", "Santos"],
        Rio: ["Rio de Janeiro", "Niteroi", "Petropolis"],
        "Minas Gerais": ["Belo Horizonte", "Uberlandia", "Contagem"],
        Parana: ["Curitiba", "Londrina", "Maringa"],
      },
    },
    Canada: {
      states: {
        Ontario: ["Toronto", "Ottawa", "Hamilton"],
        Quebec: ["Montreal", "Quebec City", "Gatineau"],
        "British Columbia": ["Vancouver", "Victoria", "Surrey"],
        Alberta: ["Calgary", "Edmonton", "Red Deer"],
      },
    },
    "United States": {
      states: {
        California: ["Los Angeles", "San Francisco", "San Diego"],
        "New York": ["New York City", "Buffalo", "Rochester"],
        Texas: ["Austin", "Dallas", "Houston"],
        Florida: ["Miami", "Orlando", "Tampa"],
      },
    },
    China: {
      states: {
        Beijing: ["Beijing City"],
        Shanghai: ["Shanghai City"],
        Guangdong: ["Guangzhou", "Shenzhen", "Zhuhai"],
        Sichuan: ["Chengdu", "Mianyang", "Leshan"],
      },
    },
    Italy: {
      states: {
        Lazio: ["Rome", "Viterbo", "Rieti"],
        Lombardy: ["Milan", "Bergamo", "Brescia"],
        Tuscany: ["Florence", "Pisa", "Siena"],
        Veneto: ["Venice", "Verona", "Padua"],
      },
    },
    Japan: {
      states: {
        Tokyo: ["Tokyo City"],
        Osaka: ["Osaka City"],
        Kyoto: ["Kyoto City"],
        Hokkaido: ["Sapporo", "Asahikawa", "Hakodate"],
      },
    },
    Pakistan: {
      states: {
        Punjab: ["Lahore", "Faisalabad", "Rawalpindi"],
        Sindh: ["Karachi", "Hyderabad", "Sukkur"],
        "Khyber Pakhtunkhwa": ["Peshawar", "Mardan", "Abbottabad"],
        Balochistan: ["Quetta", "Gwadar", "Zhob"],
      },
    },
    Russia: {
      states: {
        Moscow: ["Moscow City"],
        "St Petersburg": ["St. Petersburg City"],
        Tatarstan: ["Kazan", "Naberezhnye Chelny"],
        Siberia: ["Novosibirsk", "Omsk", "Krasnoyarsk"],
      },
    },
    "South Africa": {
      states: {
        Gauteng: ["Johannesburg", "Pretoria", "Ekurhuleni"],
        "Western Cape": ["Cape Town", "Paarl", "George"],
        "KwaZulu Natal": ["Durban", "Pietermaritzburg", "Richards Bay"],
        "Eastern Cape": ["Port Elizabeth", "East London"],
      },
    },
    "United Kingdom": {
      states: {
        England: ["London", "Manchester", "Birmingham"],
        Scotland: ["Edinburgh", "Glasgow", "Aberdeen"],
        Wales: ["Cardiff", "Swansea", "Newport"],
        "Northern Ireland": ["Belfast", "Londonderry", "Lisburn"],
      },
    },
  };

  // Country options for the dropdown
  const countryOptions = [
    { value: "India", label: "India" },
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
  ];

  const selectedCountry = watch("country");
  const selectedState = watch("state");

  // Generate state options based on the selected country
  const stateOptions = selectedCountry
    ? Object.keys(data[selectedCountry]?.states || {}).map((state) => ({
        value: state,
        label: state,
      }))
    : [];

  // Generate city options based on the selected state
  const cityOptions = selectedState
    ? data[selectedCountry]?.states[selectedState]?.map((city) => ({
        value: city,
        label: city,
      }))
    : [];

  const onSubmit = (data) => {
    if (submitAction === "save") {
      dispatch(saveFormData({ formId: 4, data }));

      console.log("Save data:", data);
      // Add your save logic here
    } else if (submitAction === "submit") {
      dispatch(saveFormData({ formId: 4, data }));

      dispatch(dataTransmit(userId));
      // console.log(userId);

      console.log("Submit dataaaa:", data);
      // Add your save logic here
      navigate("/layout/view-details"); // view details redirection
    }
  };
  const handleResetForm = (formId) => {
    dispatch(resetSpecificForm(formId));
  };
  const handleSave = () => {
    setSubmitAction("save");
  };

  const SubmitData = () => {
    setSubmitAction("submit");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex w-full gap-2">
        <div className="flex flex-col gap-4 w-[15%]">
          <DetailTitle title="Address Details" />
        </div>
        <div className="flex flex-col w-[80%] gap-4">
          <div className="flex w-full justify-between gap-[40px]">
            <div className="w-1/4">
              <SelectInput
                label="Type"
                placeholder="Select Type"
                {...register("addressType", {
                  required: "Address Type is required",
                })}
                important
                options={[
                  { value: "Temporary Address", label: "Temporary Address" },
                  { value: "Permanent Address", label: "Permanent Address" },
                  { value: "Corporate Address", label: "Corporate Address" },
                  { value: "Billing Address", label: "Billing Address" },
                  { value: "Shipping Address", label: "Shipping Address" },
                  { value: "Postal Address", label: "Postal Address" },
                ]}
                onChange={(e) => {
                  setValue("addressType", e.target.value);
                }}
              />
              {errors.addressType && (
                <p className="text-red-500 text-sm ml-[10px] mt-1">
                  {errors.addressType.message}
                </p>
              )}
            </div>
            <div className="w-1/4">
              <Input
                label="Company Name"
                {...register("companyName")}
                name="companyName"
                placeholder="Enter Company Name"
              />
            </div>
            <div className="w-1/4 flex gap-4">
              <div className="w-full flex flex-col">
                <Input
                  label="Contact No."
                  name="contactNo"
                  important
                  {...register("contactNo", {
                    required: "Contact is required",

                    minLength: {
                      value: 10,
                      message: "Contact must be at least 10 digits",
                    },
                    maxLength: {
                      value: 12,
                      message: "Contact must be at most 12 digits",
                    },
                  })}
                  type="number"
                  placeholder="Enter Contact"
                />

                {errors.contactNo && (
                  <p className="text-red-500 text-sm ml-[10px] mt-1">
                    {errors.contactNo.message}
                  </p>
                )}
              </div>
              <Input
                label="Unit"
                {...register("unit")}
                name="unit"
                placeholder="Enter Flat Number"
              />
            </div>
            <div className="w-1/4">
              <Input
                label="Building"
                {...register("building")}
                name="building"
                placeholder="Enter Building"
              />
            </div>
          </div>
          <div className="flex w-full justify-between gap-[40px]">
            <div className="w-1/4">
              <Input
                label="Street"
                name="street"
                {...register("street")}
                placeholder="Enter Street"
              />
            </div>
            <div className="w-1/4 flex gap-4">
              <Input
                label="Landmark"
                {...register("landmark")}
                name="landmark"
                placeholder="Enter Landmark"
              />

              <Input
                label="Area"
                name="area"
                {...register("area")}
                placeholder="Enter Area"
              />
            </div>
            <div className="w-1/4 flex gap-4">
              <div className="flex flex-col w-full">
                <SelectInput
                  label="Country"
                  placeholder="Select Country"
                  {...register("country", { required: "Country is required" })}
                  important
                  options={countryOptions}
                  onChange={(e) => {
                    const value = e.target.value;
                    setValue("country", value);
                    setValue("state", "");
                    setValue("city", "");
                    clearErrors("country");
                  }}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm ml-[10px] mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <SelectInput
                  label="State"
                  {...register("state", { required: "State is required" })}
                  options={stateOptions}
                  important
                  placeholder="Select State"
                  onChange={(e) => {
                    const value = e.target.value;
                    setValue("state", value);
                    setValue("city", "");
                    clearErrors("state");
                  }}
                  disabled={!selectedCountry}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm ml-[10px] mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-1/4 flex gap-4">
              <div className="flex flex-col w-full">
                <SelectInput
                  label="City"
                  {...register("city", { required: "City is required" })}
                  placeholder="Select City"
                  important
                  options={cityOptions}
                  onChange={(e) => {
                    setValue("city", e.target.value);
                    clearErrors("city");
                  }}
                  disabled={!selectedState}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm ml-[10px] mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col">
                <Input
                  label="Zip Code"
                  name="zipcode"
                  important
                  {...register("zipcode", {
                    required: "Zip code is required!",
                    pattern: {
                      value: /^-?\d*(\.\d+)?$/,
                      message: "Enter a valid number, like 42 or 3.14.",
                    },
                  })}
                  type="number"
                  placeholder="Enter Zip Code"
                />
                {errors.zipcode && (
                  <p className="text-red-500 text-sm ml-[10px] mt-1">
                    {errors.zipcode.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-[10px] mt-2 w-full">
            <div className="w-4">
              <Input
                {...register("addressDefaultBox")}
                type="checkbox"
                onChange={(e) =>
                  setValue("addressDefaultBox", e.target.checked)
                }
                name=""
                className="accent-primary focus:outline-none focus:ring-0"
                required
              />
            </div>
            <div className="w-full flex">
              <p className="font-semibold mr-2 text-[14px]">
                Please check the box if the Address should be marked as Default.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-[20px]">
        <ButtonGroup
          previousPath="user-details"
          ResetButton={() => handleResetForm(4)}
          onSave={handleSave}
          submitButton
          onSubmit={SubmitData}
        />
      </div>
    </form>
  );
}
