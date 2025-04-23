import React, { useState } from "react";

const ROICalculator = () => {
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
  const [activationRatio, setActivationRatio] = useState(1);

  const applyPreset = () => {
    setArpu(66.12);
    setFee(426000000);
  };

  const calculateROI = () => {
    const emeaF2SValue = (totalViewers * emeaV2F * emeaF2S) / 100;
    const apacF2SValue = (totalViewers * apacV2F * apacF2S) / 100;
    const amerF2SValue = (totalViewers * amerV2F * amerF2S) / 100;
    const totalF2S = emeaF2SValue + apacF2SValue + amerF2SValue;
    const upliftMultiplier = 1 + (winterUplift + summerUplift) / 2;
    const convertedSubscribers = totalF2S * activationRatio;
    const totalRevenue = convertedSubscribers * arpu * upliftMultiplier;
    const roi = ((totalRevenue - fee) / fee) * 100;
    return {
      totalRevenue,
      roi,
    };
  };

  const { totalRevenue, roi } = calculateROI();

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">ROI Calculator</h1>
      <div className="text-center mb-6">
        <button onClick={applyPreset} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Apply Preset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label>Total Viewers</label>
          <input type="number" value={totalViewers} onChange={(e) => setTotalViewers(+e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label>ARPU</label>
          <input type="number" value={arpu} onChange={(e) => setArpu(+e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label>Total Partnership Fee</label>
          <input type="number" value={fee} onChange={(e) => setFee(+e.target.value)} className="w-full p-2 border rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[{
          label: 'EMEA V2F %', val: emeaV2F, set: setEmeaV2F, min: 0.01, max: 0.015
        }, {
          label: 'APAC V2F %', val: apacV2F, set: setApacV2F, min: 0.0045, max: 0.005
        }, {
          label: 'Americas V2F %', val: amerV2F, set: setAmerV2F, min: 0.0075, max: 0.008
        }, {
          label: 'EMEA F2S %', val: emeaF2S, set: setEmeaF2S, min: 0.18, max: 0.25
        }, {
          label: 'APAC F2S %', val: apacF2S, set: setApacF2S, min: 0.05, max: 0.12
        }, {
          label: 'Americas F2S %', val: amerF2S, set: setAmerF2S, min: 0.12, max: 0.2
        }, {
          label: 'Winter Uplift %', val: winterUplift, set: setWinterUplift, min: 0.02, max: 0.04
        }, {
          label: 'Summer Uplift %', val: summerUplift, set: setSummerUplift, min: 0.05, max: 0.08
        }, {
          label: 'Activation Ratio', val: activationRatio, set: setActivationRatio, min: 0.8, max: 1.2
        }].map(({ label, val, set, min, max }) => (
          <div key={label}>
            <label className="block font-medium mb-1">{label}</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={min}
                max={max}
                step="0.0001"
                value={val}
                onChange={(e) => set(+e.target.value)}
                className="flex-1"
              />
              <input
                type="number"
                value={val}
                min={min}
                max={max}
                step="0.0001"
                onChange={(e) => set(+e.target.value)}
                className="w-20 p-1 border rounded text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-6 rounded mt-10 shadow">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Results</h2>
        <p><strong>Total Subscription Revenue:</strong> ${(totalRevenue * 0.84).toLocaleString()}</p>
        <p><strong>Total Advertising Revenue:</strong> ${(totalRevenue * 0.16).toLocaleString()}</p>
        <p><strong>Total Revenue Uplift:</strong> ${totalRevenue.toLocaleString()}</p>
        <p><strong>Total Investment:</strong> ${fee.toLocaleString()}</p>
        <p><strong>Total Profit:</strong> ${(totalRevenue - fee).toLocaleString()}</p>
        <p className="font-bold mt-2 text-blue-800">ROI: {roi.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default ROICalculator;
