import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navigation from "./forms/Navigation";
import { useState } from "react";

export default function Layout() {
  const [stepCompleted, setStepCompleted] = useState([
    true,
    false,
    false,
    false,
  ]);

  const markStepCompleted = (step) => {
    setStepCompleted((prev) => {
      const updated = [...prev];
      updated[step] = true;
      return updated;
    });
  };
  return (
    <div className="layout-container flex flex-col h-screen">
      <Header />
      <Navigation stepCompleted={stepCompleted} />
      <div className="p-8 w-full">
        <Outlet context={{ markStepCompleted }} />
      </div>
    </div>
  );
}
