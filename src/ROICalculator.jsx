import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ROICalculator() {
  const [totalViewers, setTotalViewers] = useState(4000000000);
  const [arpu, setArpu] = useState(56.16);
  const [fee, setFee] = useState(486000000);

  const [emV2F, setEmV2F] = useState(1.5);
  const [apV2F, setApV2F] = useState(0.5);
  const [amV2F, setAmV2F] = useState(0.8);

  const [emF2S, setEmF2S] = useState(25);
  const [apF2S, setApF2S] = useState(12);
  const [amF2S, setAmF2S] = useState(20);

  const [winterUplift, setWinterUplift] = useState(4);
  const [summerUplift, setSummerUplift] = useState(8);
  const [activationRatio, setActivationRatio] = useState(100);

  const applyPreset = () => {
    setArpu(66.12);
    setFee(426000000);
  };

  const calculateROI = () => {
    const v2fTotal = (
      (totalViewers * emV2F) / 100 +
      (totalViewers * apV2F) / 100 +
      (totalViewers * amV2F) / 100
    );

    const convertedSubscribers = (
      v2fTotal *
      ((emF2S / 100 + apF2S / 100 + amF2S / 100) *
        (activationRatio / 100)) /
      3
    );

    const upliftMultiplier = 1 + (winterUplift + summerUplift) / 200;
    const revenue = convertedSubscribers * arpu * upliftMultiplier;

    return {
      roi: ((revenue - fee) / fee) * 100,
      revenue: revenue.toFixed(2),
    };
  };

  const { roi, revenue } = calculateROI();

  const labelClass = 'block font-medium text-gray-700 mb-1';
  const sliderClass = 'border px-2 py-1 rounded w-full';

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">ROI Calculator</h1>
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={applyPreset} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Apply Preset</button>
        <Link to="/logistics" className="text-purple-700 underline self-center">Calculation Logistics →</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className={labelClass}>Total Viewers</label>
          <input type="number" value={totalViewers} onChange={e => setTotalViewers(+e.target.value)} className={sliderClass} />
        </div>
        <div>
          <label className={labelClass}>ARPU</label>
          <input type="number" step="0.01" value={arpu} onChange={e => setArpu(+e.target.value)} className={sliderClass} />
        </div>
        <div>
          <label className={labelClass}>Total Partnership Fee</label>
          <input type="number" value={fee} onChange={e => setFee(+e.target.value)} className={sliderClass} />
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          ['EMEA V2F %', emV2F, setEmV2F, 1, 1.5],
          ['APAC V2F %', apV2F, setApV2F, 0.45, 0.5],
          ['Americas V2F %', amV2F, setAmV2F, 0.75, 0.8],
          ['EMEA F2S %', emF2S, setEmF2S, 18, 25],
          ['APAC F2S %', apF2S, setApF2S, 5, 12],
          ['Americas F2S %', amF2S, setAmF2S, 12, 20],
          ['Winter Uplift %', winterUplift, setWinterUplift, 2, 4],
          ['Summer Uplift %', summerUplift, setSummerUplift, 5, 8],
          ['Activation Ratio', activationRatio, setActivationRatio, 80, 100],
        ].map(([label, val, setter, min, max], i) => (
          <div key={label}>
            <label className={labelClass}>{label}: {val.toFixed(2)}%</label>
            <input
              type="range"
              min={min}
              max={max}
              step="0.01"
              value={val}
              onChange={e => setter(+e.target.value)}
              className={sliderClass}
            />
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="bg-blue-50 p-6 rounded shadow text-lg">
        <h2 className="text-xl font-semibold mb-2">Results</h2>
        <p>Estimated Revenue: ${revenue}</p>
        <p>ROI: {roi.toFixed(2)}%</p>
      </div>
    </div>
  );
}
