import React, { useState } from 'react';

export default function ROICalculator() {
  const [totalViewers, setTotalViewers] = useState(4000000000);
  const [arpu, setArpu] = useState(66.12);
  const [fee, setFee] = useState(426000000);

  const [emeaV2F, setEmeaV2F] = useState(0.015);
  const [apacV2F, setApacV2F] = useState(0.005);
  const [amerV2F, setAmerV2F] = useState(0.008);

  const [emeaF2S, setEmeaF2S] = useState(0.25);
  const [apacF2S, setApacF2S] = useState(0.12);
  const [amerF2S, setAmerF2S] = useState(0.2);

  const [winterUplift, setWinterUplift] = useState(0.04);
  const [summerUplift, setSummerUplift] = useState(0.08);
  const [activationRatio, setActivationRatio] = useState(1.0);

  const applyPreset = () => {
    setArpu(66.12);
    setFee(426000000);
  };

  const calculateROI = () => {
    const v2fTotal =
      (totalViewers * emeaV2F + totalViewers * apacV2F + totalViewers * amerV2F) / 3;

    const convertedSubscribers =
      ((emeaF2S + apacF2S + amerF2S) / 3) * (v2fTotal * activationRatio);

    const upliftMultiplier = 1 + (winterUplift + summerUplift);

    const revenue = convertedSubscribers * arpu * upliftMultiplier;
    const roi = ((revenue - fee) / fee) * 100;

    return {
      revenue: revenue.toFixed(2),
      roi: roi.toFixed(2),
    };
  };

  const { revenue, roi } = calculateROI();

  const labelClass = "block font-medium text-gray-700 mb-1";
  const inputClass = "w-full border px-2 py-1 rounded";
  const sliderClass = "w-full accent-indigo-600";

  const variables = [
    { label: "totalViewers", val: totalViewers, setter: setTotalViewers, min: 1000000, max: 10000000000 },
    { label: "emeaV2FPercentage", val: emeaV2F, setter: setEmeaV2F, min: 0.01, max: 0.015 },
    { label: "apacV2FPercentage", val: apacV2F, setter: setApacV2F, min: 0.0045, max: 0.005 },
    { label: "americasV2FPercentage", val: amerV2F, setter: setAmerV2F, min: 0.0075, max: 0.008 },
    { label: "emeaF2SPercentage", val: emeaF2S, setter: setEmeaF2S, min: 0.18, max: 0.25 },
    { label: "apacF2SPercentage", val: apacF2S, setter: setApacF2S, min: 0.05, max: 0.12 },
    { label: "americasF2SPercentage", val: amerF2S, setter: setAmerF2S, min: 0.12, max: 0.2 },
    { label: "arpu", val: arpu, setter: setArpu, min: 30, max: 100 },
    { label: "winterUpliftRate", val: winterUplift, setter: setWinterUplift, min: 0.02, max: 0.04 },
    { label: "summerUpliftRate", val: summerUplift, setter: setSummerUplift, min: 0.05, max: 0.08 },
    { label: "totalPartnershipFee", val: fee, setter: setFee, min: 100000000, max: 600000000 },
    { label: "activationRatio", val: activationRatio, setter: setActivationRatio, min: 0.8, max: 1.2 },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-4">ROI Calculator</h1>
      <button onClick={applyPreset} className="bg-indigo-900 text-white px-4 py-2 rounded mb-6">
        Apply Preset
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {variables.map(({ label, val, setter, min, max }) => (
          <div key={label}>
            <label className={labelClass}>{label}</label>
            <input
              type="range"
              min={min}
              max={max}
              step="0.0001"
              value={val}
              onChange={(e) => setter(parseFloat(e.target.value))}
              className={sliderClass}
            />
            <p>{label.includes("Percentage") || label.includes("Rate") ? `${(val * 100).toFixed(2)}%` : val}</p>
          </div>
        ))}
      </div>
      <div className="bg-blue-50 p-6 rounded shadow text-lg">
        <h2 className="text-xl font-semibold mb-2">Results</h2>
        <p>Estimated Revenue: ${revenue}</p>
        <p>ROI: {roi}%</p>
      </div>
    </div>
  );
}
