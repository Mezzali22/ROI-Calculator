import { useState } from 'react';
import './index.css';

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    totalViewers: 4000000000,
    emeaV2FPercentage: 0.015,
    apacV2FPercentage: 0.005,
    americasV2FPercentage: 0.008,
    emeaF2SPercentage: 0.25,
    apacF2SPercentage: 0.12,
    americasF2SPercentage: 0.2,
    arpu: 56.16,
    winterUpliftRate: 0.04,
    summerUpliftRate: 0.08,
    totalPartnershipFee: 486000000,
    activationRatio: 1.0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setInputs({ ...inputs, [name]: num });
    }
  };

  const handleSliderChange = (key, value, min, max) => {
    const clamped = Math.max(min, Math.min(max, parseFloat(value)));
    if (!isNaN(clamped)) {
      setInputs({ ...inputs, [key]: clamped });
    }
  };

  const applyPreset = () => {
    const preset = {
      totalViewers: 4000000000,
      emeaV2FPercentage: 0.015,
      apacV2FPercentage: 0.005,
      americasV2FPercentage: 0.008,
      emeaF2SPercentage: 0.25,
      apacF2SPercentage: 0.12,
      americasF2SPercentage: 0.2,
      arpu: 56.16,
      winterUpliftRate: 0.04,
      summerUpliftRate: 0.08,
      totalPartnershipFee: 486000000,
      activationRatio: 1.0
    };
    setInputs(preset);
  };

  const viewerData = {
    emea: inputs.totalViewers * 0.35,
    apac: inputs.totalViewers * 0.45,
    americas: inputs.totalViewers * 0.2
  };

  const conversions = {
    emeaF2S: inputs.emeaF2SPercentage * inputs.emeaV2FPercentage * viewerData.emea,
    apacF2S: inputs.apacF2SPercentage * inputs.apacV2FPercentage * viewerData.apac,
    americasF2S: inputs.americasF2SPercentage * inputs.americasV2FPercentage * viewerData.americas
  };

  const totalSubscriptionRevenue = (conversions.emeaF2S + conversions.apacF2S + conversions.americasF2S) * inputs.arpu * 6;
  const totalAdvertisingRevenue = (2170000000 + 2457000000) * inputs.winterUpliftRate + (2305000000 + 2645000000) * inputs.summerUpliftRate;
  const totalInvestment = inputs.totalPartnershipFee * (1 + inputs.activationRatio);
  const totalRevenueUplift = totalSubscriptionRevenue + totalAdvertisingRevenue;
  const totalProfit = totalRevenueUplift - totalInvestment;
  const roi = (totalProfit / totalInvestment) * 100;

  const sliders = [
    { key: "emeaV2FPercentage", label: "EMEA V2F %", min: 0.01, max: 0.015, step: 0.0005 },
    { key: "apacV2FPercentage", label: "APAC V2F %", min: 0.0045, max: 0.005, step: 0.0001 },
    { key: "americasV2FPercentage", label: "Americas V2F %", min: 0.0075, max: 0.008, step: 0.0001 },
    { key: "emeaF2SPercentage", label: "EMEA F2S %", min: 0.18, max: 0.25, step: 0.01 },
    { key: "apacF2SPercentage", label: "APAC F2S %", min: 0.05, max: 0.12, step: 0.01 },
    { key: "americasF2SPercentage", label: "Americas F2S %", min: 0.12, max: 0.2, step: 0.01 },
    { key: "winterUpliftRate", label: "Winter Uplift %", min: 0.02, max: 0.04, step: 0.005 },
    { key: "summerUpliftRate", label: "Summer Uplift %", min: 0.05, max: 0.08, step: 0.005 },
    { key: "activationRatio", label: "Activation Ratio", min: 0.8, max: 1.2, step: 0.01 }
  ];

  return (
    <div className="p-10 max-w-screen-xl mx-auto font-sans">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">ROI Calculator</h1>

      <div className="flex justify-center mb-10">
        <button
          onClick={applyPreset}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md text-sm font-medium"
        >
          Apply Preset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">Total Viewers</label>
          <input
            type="number"
            name="totalViewers"
            value={inputs.totalViewers}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">ARPU</label>
          <input
            type="number"
            name="arpu"
            value={inputs.arpu}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">Total Partnership Fee</label>
          <input
            type="number"
            name="totalPartnershipFee"
            value={inputs.totalPartnershipFee}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {sliders.map(({ key, label, min, max, step }) => (
          <div key={key} className="bg-gray-50 p-5 rounded-md shadow w-full">
            <label className="block text-sm font-semibold mb-2">{label}: {(inputs[key] * 100).toFixed(2)}%</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={inputs[key]}
                onChange={(e) => handleSliderChange(key, e.target.value, min, max)}
                className="w-full"
              />
              <input
                type="number"
                value={(inputs[key] * 100).toFixed(2)}
                onChange={(e) => {
                  const raw = parseFloat(e.target.value) / 100;
                  if (!isNaN(raw)) {
                    handleSliderChange(key, raw, min, max);
                  } else {
                    e.target.value = "";
                  }
                }}
                className="w-20 p-1 border rounded text-sm text-center"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{(min * 100).toFixed(2)}%</span>
              <span>{(max * 100).toFixed(2)}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 p-8 rounded-xl shadow space-y-3 text-blue-900 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3">Results</h2>
        <p><strong>Total Subscription Revenue:</strong> ${totalSubscriptionRevenue.toLocaleString()}</p>
        <p><strong>Total Advertising Revenue:</strong> ${totalAdvertisingRevenue.toLocaleString()}</p>
        <p><strong>Total Revenue Uplift:</strong> ${totalRevenueUplift.toLocaleString()}</p>
        <p><strong>Total Investment:</strong> ${totalInvestment.toLocaleString()}</p>
        <p><strong>Total Profit:</strong> ${totalProfit.toLocaleString()}</p>
        <p className="text-xl font-bold">ROI: {roi.toFixed(2)}%</p>
      </div>
    </div>
  );
}