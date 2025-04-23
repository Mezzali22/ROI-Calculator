import React from "react";
import ROICalculator from "./ROICalculator";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black p-4 sm:p-8">
      <h1 className="text-center text-3xl font-bold mb-6">ROI Calculator</h1>
      <ROICalculator />
    </div>
  );
}
