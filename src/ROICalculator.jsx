import React, { useState } from 'react';

export default function ROICalculator() {
  const [totalViewers, setTotalViewers] = useState(4000000000);
  const [arpu, setArpu] = useState(66.12);
  const [fee, setFee] = useState(426000000);

  const [emv2f, setEmv2f] = useState(1.5);
  const [apv2f, setApv2f] = useState(0.5);
  const [amv2f, setAmv2f] = useState(0.8);

  const [emF2S, setEmF2S] = useState(25);
  const [apF2S, setApF2S] = useState(12);
  const [amF2S, setAmF2S] = useState(20);

  const [winterUplift, setWinterUplift] = useState(4);
  const [summerUplift, setSummerUplift] = useState(8);
  const [activationRatio, setActivationRatio] = useState(100);

  const applyPreset = () => {
    setTotalViewers(4000000000);
    setArpu(66.12);
    setFee(426000000);
    setEmv2f(1.5); setApv2f(0.5); setAmv2f(0.8);
    setEmF2S(25); setApF2S(12); setAmF2S(20);
    setWinterUplift(4); setSummerUplift(8); setActivationRatio(100);
  };

  const format = val => Number(val).toFixed(2);

  const v2fTotal =
    (totalViewers * emv2f) / 100 +
    (totalViewers * apv2f) / 100 +
    (totalViewers * amv2f) / 100;

  const convertedSubscribers =
    (v2fTotal * ((emF2S / 100 + apF2S / 100 + amF2S / 100)) *
      (activationRatio / 100)) / 3;

  const upliftMultiplier = 1 + (winterUplift + summerUplift) / 200;
  const subscriptionRevenue = convertedSubscribers * arpu * upliftMultiplier;
  const advertisingRevenue = totalViewers * 0.014527;
  const totalRevenueUplift = subscriptionRevenue + advertisingRevenue;

  const investment = fee * (activationRatio / 100);
  const profit = totalRevenueUplift - investment;
  const roi = (profit / investment) * 100;

  const sliders = [
    {
      label: 'EMEA V2F %',
      val: emv2f,
      set: setEmv2f,
      min: 1,
      max: 1.5,
      step: 0.05
    },
    {
      label: 'APAC V2F %',
      val: apv2f,
      set: setApv2f,
      min: 0.45,
      max: 0.5,
      step: 0.05
    },
    {
      label: 'Americas V2F %',
      val: amv2f,
      set: setAmv2f,
      min: 0.75,
      max: 0.8,
      step: 0.05
    },
    {
      label: 'EMEA F2S %',
      val: emF2S,
      set: setEmF2S,
      min: 18,
      max: 25,
      step: 1
    },
    {
      label: 'APAC F2S %',
      val: apF2S,
      set: setApF2S,
      min: 5,
      max: 12,
      step: 1
    },
    {
      label: 'Americas F2S %',
      val: amF2S,
      set: setAmF2S,
      min: 12,
      max: 20,
      step: 1
    },
    {
      label: 'Winter Uplift %',
      val: winterUplift,
      set: setWinterUplift,
      min: 2,
      max: 4,
      step: 0.5
    },
    {
      label: 'Summer Uplift %',
      val: summerUplift,
      set: setSummerUplift,
      min: 5,
      max: 8,
      step: 0.5
    },
    {
      label: 'Activation Ratio %',
      val: activationRatio,
      set: setActivationRatio,
      min: 80,
      max: 120,
      step: 1
    }
  ];

  const handleInput = (e, setter, min, max) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) setter(Math.min(max, Math.max(min, val)));
    else e.target.value = '';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">ROI Calculator</h1>
      <div className="text-center mb-6">
        <button
          onClick={applyPreset}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
        >
          Apply Preset
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="font-semibold">Total Viewers</label>
          <input
            type="number"
            className="w-full border rounded px-2 py-1 mt-1"
            value={totalViewers}
            onChange={(e) => setTotalViewers(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="font-semibold">ARPU</label>
          <input
            type="number"
            className="w-full border rounded px-2 py-1 mt-1"
            value={arpu}
            onChange={(e) => setArpu(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="font-semibold">Total Partnership Fee</label>
          <input
            type="number"
            className="w-full border rounded px-2 py-1 mt-1"
            value={fee}
            onChange={(e) => setFee(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {sliders.map(({ label, val, set, min, max, step }) => (
          <div key={label}>
            <label className="font-semibold">{label}</label>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={val}
              onChange={(e) => set(Number(e.target.value))}
              className="w-full"
            />
            <input
              type="number"
              className="w-full border rounded px-2 py-1 mt-1"
              value={val}
              onChange={(e) => handleInput(e, set, min, max)}
            />
          </div>
        ))}
      </div>

      <div className="bg-blue-50 mt-8 p-6 rounded shadow max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Results</h2>
        <p className="text-blue-900">
          <strong>Total Subscription Revenue:</strong> ${subscriptionRevenue.toLocaleString()}
        </p>
        <p className="text-blue-900">
          <strong>Total Advertising Revenue:</strong> ${advertisingRevenue.toLocaleString()}
        </p>
        <p className="text-blue-900">
          <strong>Total Revenue Uplift:</strong> ${totalRevenueUplift.toLocaleString()}
        </p>
        <p className="text-blue-900">
          <strong>Total Investment:</strong> ${investment.toLocaleString()}
        </p>
        <p className="text-blue-900">
          <strong>Total Profit:</strong> ${profit.toLocaleString()}
        </p>
        <p className="text-blue-900 font-bold">
          ROI: {roi.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
