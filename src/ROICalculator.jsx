import React, { useState } from 'react';

export default function ROICalculator() {
  const [totalViewers, setTotalViewers] = useState(4000000000);
  const [emeaV2F, setEmeaV2F] = useState(0.015);
  const [apacV2F, setApacV2F] = useState(0.005);
  const [americasV2F, setAmericasV2F] = useState(0.008);
  const [emeaF2S, setEmeaF2S] = useState(0.25);
  const [apacF2S, setApacF2S] = useState(0.12);
  const [americasF2S, setAmericasF2S] = useState(0.2);
  const [winterUplift, setWinterUplift] = useState(0.04);
  const [summerUplift, setSummerUplift] = useState(0.08);
  const [activationRatio, setActivationRatio] = useState(1);
  const [arpu, setArpu] = useState(66.12);
  const [fee, setFee] = useState(426000000);

  const applyPreset = () => {
    setTotalViewers(4000000000);
    setEmeaV2F(0.015);
    setApacV2F(0.005);
    setAmericasV2F(0.008);
    setEmeaF2S(0.25);
    setApacF2S(0.12);
    setAmericasF2S(0.2);
    setWinterUplift(0.04);
    setSummerUplift(0.08);
    setActivationRatio(1);
    setArpu(66.12);
    setFee(426000000);
  };

  // ---- Calculation ----
  const emeaF2SCount = totalViewers * 0.35 * emeaV2F * emeaF2S;
  const apacF2SCount = totalViewers * 0.45 * apacV2F * apacF2S;
  const americasF2SCount = totalViewers * 0.2 * americasV2F * americasF2S;
  const totalSubsRevenue = (emeaF2SCount + apacF2SCount + americasF2SCount) * arpu * 6;

  const winterAdRevenue = (2170000000 + 2457000000) * winterUplift;
  const summerAdRevenue = (2305000000 + 2645000000) * summerUplift;
  const totalAdRevenue = winterAdRevenue + summerAdRevenue;

  const totalRevenue = totalSubsRevenue + totalAdRevenue;
  const totalInvestment = fee * (1 + activationRatio);
  const totalProfit = totalRevenue - totalInvestment;
  const roi = (totalProfit / totalInvestment) * 100;

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">ROI Calculator</h1>
      <div className="text-center mb-6">
        <button onClick={applyPreset} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Apply Preset
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <Input label="Total Viewers" value={totalViewers} setValue={setTotalViewers} isSlider={false} />
        <Slider label="EMEA V2F %" value={emeaV2F} setValue={setEmeaV2F} min={0.01} max={0.015} />
        <Slider label="APAC V2F %" value={apacV2F} setValue={setApacV2F} min={0.0045} max={0.005} />
        <Slider label="Americas V2F %" value={americasV2F} setValue={setAmericasV2F} min={0.0075} max={0.008} />
        <Slider label="EMEA F2S %" value={emeaF2S} setValue={setEmeaF2S} min={0.18} max={0.25} />
        <Slider label="APAC F2S %" value={apacF2S} setValue={setApacF2S} min={0.05} max={0.12} />
        <Slider label="Americas F2S %" value={americasF2S} setValue={setAmericasF2S} min={0.12} max={0.2} />
        <Slider label="Winter Uplift %" value={winterUplift} setValue={setWinterUplift} min={0.02} max={0.04} />
        <Slider label="Summer Uplift %" value={summerUplift} setValue={setSummerUplift} min={0.05} max={0.08} />
        <Slider label="Activation Ratio" value={activationRatio} setValue={setActivationRatio} min={0.8} max={1.2} />
        <Input label="ARPU" value={arpu} setValue={setArpu} />
        <Input label="Total Partnership Fee" value={fee} setValue={setFee} />
      </div>

      <div className="bg-blue-50 p-6 rounded-lg shadow-md text-blue-900 space-y-2 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">Results</h2>
        <p><strong>Total Subscription Revenue:</strong> ${totalSubsRevenue.toLocaleString()}</p>
        <p><strong>Total Advertising Revenue:</strong> ${totalAdRevenue.toLocaleString()}</p>
        <p><strong>Total Revenue Uplift:</strong> ${totalRevenue.toLocaleString()}</p>
        <p><strong>Total Investment:</strong> ${totalInvestment.toLocaleString()}</p>
        <p><strong>Total Profit:</strong> ${totalProfit.toLocaleString()}</p>
        <p className="text-lg font-bold">ROI: {roi.toFixed(2)}%</p>
      </div>
    </div>
  );
}

function Slider({ label, value, setValue, min, max }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step="0.0001"
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-blue-600"
      />
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        step="0.0001"
        className="border w-full mt-1 p-1 rounded"
      />
    </div>
  );
}

function Input({ label, value, setValue, isSlider = true }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="border w-full p-1 rounded"
      />
    </div>
  );
}
