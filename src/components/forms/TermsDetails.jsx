import DetailTitle from "../DetailTitle";
import Input from "../formComponents/Input";
import SelectInput from "../formComponents/SelectInput";
import ButtonGroup from "../formComponents/ButtonGroup";
import { FaTimes } from "react-icons/fa";

import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { saveFormData } from "../../redux/slices/forms";
import { useDispatch, useSelector } from "react-redux";
import { resetSpecificForm } from "../../redux/slices/forms";
import { currentForm } from "../../redux/slices/forms";

export default function TermsDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { markStepCompleted } = useOutletContext();
  const form2 = useSelector((state) => state.forms);
  const TermsDetails = form2.kycForms.form2;

  const [submitAction, setSubmitAction] = useState("");

  useEffect(() => {
    dispatch(currentForm(2));
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
      currency: "",
      dayTerm: "",
      termName: "",
      ExtPercent: "",
      RapPercent: "",
      ExtraPercent: "",
      creaditLimit: "",
      memoLimit: "",
      defaultBox: false,
      aadatParty: "",
      commAadat: "",
      broker1: "",
      commBroker1: "",
    },
  });
  useEffect(() => {
    // Reset form values when BasicDetails updates
    if (TermsDetails) {
      reset(TermsDetails);
    }
  }, [TermsDetails, reset]);

  const watchAadatParty = watch("aadatParty");

  const brokerDependencies = {
    Buyer: [
      "Real Estate Broker",
      "Stock Broker",
      "Insurance Broker",
      "Trade Broker",
      "Freight Broker",
    ],
    Seller: [
      "Real Estate Broker",
      "Stock Broker",
      "Trade Broker",
      "Freight Broker",
    ],
    Distributor: ["Insurance Broker", "Freight Broker", "Trade Broker"],
    Vendor: ["Trade Broker", "Real Estate Broker", "Stock Broker"],
    Customer: [
      "Stock Broker",
      "Insurance Broker",
      "Real Estate Broker",
      "Freight Broker",
    ],
  };

  const onSubmit = (data) => {
    if (submitAction === "save") {
      dispatch(saveFormData({ formId: 2, data }));

      console.log("Save data:", data);
      markStepCompleted(2);
      // Add your save logic here
    } else if (submitAction === "saveAndNext") {
      dispatch(saveFormData({ formId: 2, data }));
      markStepCompleted(2);

      console.log("Save and Next data:", data);
      // Add your save logic here
      navigate("/layout/user-details");
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex w-full gap-2 ">
        <div className="flex flex-col gap-116 w-[15%]">
          <DetailTitle
            title="Terms Details"
            codeName="Total Terms %"
            code="2.2 %"
          />
        </div>
        <div className="flex flex-col w-[80%] gap-4">
          <div className="flex w-full justify-between gap-[40px]">
            <div className="w-1/2 flex gap-12 ">
              <div className="flex flex-col w-full">
                <SelectInput
                  label="Currnecy (%)"
                  placeholder="Select Currency"
                  {...register("currency", {
                    required: "Currency is required",
                  })}
                  important
                  options={[
                    // { value: "", label: "Select Currency" },
                    { value: "AUD", label: "AUD" },
                    { value: "BRL", label: "BRL" },
                    { value: "CAD", label: "CAD" },
                    { value: "USD", label: "USD" },
                    { value: "CNY", label: "CNY" },
                    { value: "EUR", label: "EUR" },
                    { value: "JPY", label: "JPY" },
                    { value: "PKR", label: "PKR" },
                    { value: "RUB", label: "RUB" },
                    { value: "ZAR", label: "ZAR" },
                    { value: "GBP", label: "GBP" },
                  ]}
                  onChange={(e) => {
                    setValue("currency", e.target.value);
                    clearErrors("currency");
                  }}
                />
                {errors.currency && (
                  <p className="text-red-500 text-sm ml-[10px] mt-1">
                    {errors.currency.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <SelectInput
                  label="Day Terms (O)"
                  placeholder="Select Day Terms"
                  {...register("dayTerm", {
                    required: "Day Terms is required",
                  })}
                  important
                  options={[
                    { value: "Net 30", label: "Net 30" },
                    { value: "Net 60", label: "Net 60" },
                    { value: "Cash on Delivery", label: "Cash on Delivery" },
                    { value: "Prepaid", label: "Prepaid" },
                    { value: "Due on Receipt", label: "Due on Receipt" },
                  ]}
                  onChange={(e) => {
                    setValue("dayTerm", e.target.value);
                    clearErrors("dayTerm");
                  }}
                />
                {errors.dayTerm && (
                  <p className="text-red-500 text-sm ml-[10px] mt-1">
                    {errors.dayTerm.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-1/2">
              <Input
                label="Term Name"
                {...register("termName")}
                type="text"
                name="termName"
                placeholder="Enter Term Name"
              />
            </div>
          </div>
          <div className="flex w-full justify-between gap-[40px]">
            <div className="w-1/2 flex gap-12">
              <div className="w-1/2 flex gap-4">
                <div className="w-full flex flex-col">
                  <Input
                    label="Ext %"
                    {...register("ExtPercent", {
                      pattern: {
                        value: /^-?\d*(\.\d+)?$/,
                        message: "Enter a valid number, like 42 or 3.14.",
                      },
                    })}
                    name="ExtPercent"
                    type="number"
                    placeholder="Enter Ext %"
                  />
                  {errors.ExtPercent && (
                    <p className="text-red-500 text-sm ml-[10px]">
                      {errors.ExtPercent.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col">
                  <Input
                    label="Rap %"
                    {...register("RapPercent", {
                      pattern: {
                        value: /^-?\d*(\.\d+)?$/,
                        message: "Enter a valid number, like 42 or 3.14.",
                      },
                    })}
                    name="RapPercent"
                    type="number"
                    placeholder="Enter Rap %"
                  />
                  {errors.RapPercent && (
                    <p className="text-red-500 text-sm ml-[10px]">
                      {errors.RapPercent.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-1/2 flex gap-4">
                <div className="w-full flex flex-col">
                  <Input
                    label="Extra %"
                    {...register("ExtraPercent", {
                      pattern: {
                        value: /^-?\d*(\.\d+)?$/,
                        message: "Enter a valid number, like 42 or 3.14.",
                      },
                    })}
                    type="number"
                    name="ExtraPercent"
                    placeholder="0.00"
                  />
                  {errors.ExtraPercent && (
                    <p className="text-red-500 text-sm ml-[10px]">
                      {errors.ExtraPercent.message}
                    </p>
                  )}
                </div>
                <div className="w-full flex flex-col">
                  <Input
                    label="Credit Limit"
                    {...register("creaditLimit", {
                      pattern: {
                        value: /^\d{1,8}(,\d{8})*$/,
                        message: "Enter valid input",
                      },
                    })}
                    name="creaditLimit"
                    placeholder="Enter Limit "
                  />
                  {errors.creaditLimit && (
                    <p className="text-red-500 text-sm ml-[10px]">
                      {errors.creaditLimit.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-1/2 flex items-center gap-4">
              <div className="w-1/4">
                <div className="w-full flex flex-col">
                  <Input
                    label="Memo Limit"
                    {...register("memoLimit", {
                      pattern: {
                        value: /^\d{1,8}(,\d{8})*$/,
                        message: "Enter valid input",
                      },
                    })}
                    name="memoLimit"
                    type="number"
                    placeholder="Enter Limit "
                  />
                  {errors.memoLimit && (
                    <p className="text-red-500 text-sm ml-[10px]">
                      {errors.memoLimit.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-3/4 mt-8">
                <div className="flex gap-[10px] w-full">
                  <div className="w-4">
                    <Input
                      {...register("acviveBox")}
                      type="checkbox"
                      onChange={(e) => setValue("defaultBox", e.target.checked)}
                      name=""
                      className="accent-primary focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div className="w-full flex">
                    <p className="font-semibold mr-2">Default </p>
                    <span className="text-[#696774] text-[14px]">
                      (Please check the box if the terms should be marked as
                      Default.)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[99%] h-[2px]  bg-[#D9D9D9]"></div>
      <div className="flex w-full gap-2 flex-wrap">
        <div className="flex flex-col gap-4 w-[15%]">
          <DetailTitle title="Aadat & Broker Details" />
        </div>
        <div className="flex w-[83%] justify-between gap-[40px]">
          <div className="flex w-1/2 gap-12">
            <div className="w-full flex gap-5 justify-center items-center">
              <div className="w-full flex gap-2">
                <SelectInput
                  label="Aadat Party 1"
                  placeholder="Select Aadat Party"
                  {...register("aadatParty")}
                  className="w-full"
                  options={[
                    { value: "Buyer", label: "Buyer" },
                    { value: "Seller", label: "Seller" },
                    { value: "Distributor", label: "Distributor" },
                    { value: "Vendor", label: "Vendor" },
                    { value: "Customer", label: "Customer" },
                  ]}
                  onChange={(e) => {
                    const selectedAadatPary = e.target.value;
                    setValue("aadatParty", selectedAadatPary);
                    setValue("broker1", "");
                  }}
                />
              </div>
              <div className="w-24">
                <Input
                  label="Comm"
                  name="commAadat"
                  {...register("commAadat")}
                  type="number"
                  placeholder="00"
                  className="w-full"
                />
              </div>
              <div className="w-[2px] mt-6">
                <FaTimes className="inline-flex items-center justify-center border border-red-600 rounded-full p-[1px] text-red-500" />
              </div>
            </div>
            <div className="w-full flex gap-5 justify-center items-center">
              <div className="w-full flex gap-2 ">
                <SelectInput
                  label="Broker 1"
                  placeholder="Select Broker 1"
                  {...register("broker1")}
                  className="w-full"
                  options={
                    watchAadatParty
                      ? brokerDependencies[watchAadatParty]?.map((type) => ({
                          value: type,
                          label: type,
                        }))
                      : []
                  }
                  onChange={(e) => {
                    setValue("broker1", e.target.value);
                  }}
                />
              </div>
              <div className="w-24">
                <Input
                  label="Comm"
                  name="commBroker1"
                  {...register("commBroker1")}
                  type="number"
                  placeholder="00"
                  className="w-full"
                />
              </div>
              <div className="w-[2px] mt-6">
                <FaTimes className="inline-flex items-center justify-center border border-red-600 rounded-full p-[1px] text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-[20px]">
        <ButtonGroup
          previousPath="basic-details"
          ResetButton={() => handleResetForm(2)}
          onSave={handleSave}
          onSaveAndNext={handleSaveAndNext}
        />
      </div>
    </form>
  );
}
