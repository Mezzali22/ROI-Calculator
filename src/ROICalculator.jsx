import React, { useState } from 'react';

export default function ROICalculator() {
  const [totalViewers, setTotalViewers] = useState(4000000000);
  const [arpu, setArpu] = useState(66.12);
  const [fee, setFee] = useState(426000000);

  const [emv2f, setEmv2f] = useState(1.5);
  const [apv2f, setApv2f] = useState(0.5);
  const [amv2f, setAmv2f] = useState(0.8);

  const [emf2s, setEmf2s] = useState(25);
  const [apf2s, setApf2s] = useState(12);
  const [amf2s, setAmf2s] = useState(20);

  const [winterUplift, setWinterUplift] = useState(4);
  const [summerUplift, setSummerUplift] = useState(8);
  const [activationRatio, setActivationRatio] = useState(100);

  const applyPreset = () => {
    setArpu(66.12);
    setFee(426000000);
    setTotalViewers(4000000000);
    setEmv2f(1.5);
    setApv2f(0.5);
    setAmv2f(0.8);
    setEmf2s(25);
    setApf2s(12);
    setAmf2s(20);
    setWinterUplift(4);
    setSummerUplift(8);
    setActivationRatio(100);
  };

  const calculateROI = () => {
    const v2fTotal =
      (totalViewers * emv2f) / 100 +
      (totalViewers * apv2f) / 100 +
      (totalViewers * amv2f) / 100;

    const convertedSubscribers =
      (v2fTotal *
        ((emf2s / 100 + apf2s / 100 + amf2s / 100) *
          (activationRatio / 100))) /
      3;

    const upliftMultiplier = 1 + (winterUplift + summerUplift) / 200;

    const subscriptionRevenue = convertedSubscribers * arpu * upliftMultiplier;
    const advertisingRevenue = fee * 0.12;
    const totalRevenue = subscriptionRevenue + advertisingRevenue;
    const totalInvestment = fee * 0.175;
    const profit = totalRevenue - totalInvestment;

    return {
      subscriptionRevenue: subscriptionRevenue.toFixed(0),
      advertisingRevenue: advertisingRevenue.toFixed(0),
      totalRevenue: totalRevenue.toFixed(0),
      totalInvestment: totalInvestment.toFixed(0),
      profit: profit.toFixed(0),
      roi: ((profit / totalInvestment) * 100).toFixed(2),
    };
  };

  const result = calculateROI();

  const slider = (label, value, setter, min, max, step = 0.01) => (
    <div className="flex flex-col w-full">
      <label className="font-semibold mb-1">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setter(parseFloat(e.target.value))}
        className="w-full"
      />
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => setter(parseFloat(e.target.value))}
        className="mt-1 border px-2 py-1 rounded w-full"
      />
    </div>
  );

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">ROI Calculator</h1>
      <div className="text-center mb-6">
        <button
          onClick={applyPreset}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply Preset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="font-semibold mb-1 block">Total Viewers</label>
          <input
            type="number"
            value={totalViewers}
            onChange={(e) => setTotalViewers(parseInt(e.target.value))}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div>
          <label className="font-semibold mb-1 block">ARPU</label>
          <input
            type="number"
            step="0.01"
            value={arpu}
            onChange={(e) => setArpu(parseFloat(e.target.value))}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div>
          <label className="font-semibold mb-1 block">Total Partnership Fee</label>
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(parseInt(e.target.value))}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {slider('EMEA V2F %', emv2f, setEmv2f, 1.0, 1.5)}
        {slider('APAC V2F %', apv2f, setApv2f, 0.45, 0.5)}
        {slider('Americas V2F %', amv2f, setAmv2f, 0.75, 0.8)}
        {slider('EMEA F2S %', emf2s, setEmf2s, 18, 25, 1)}
        {slider('APAC F2S %', apf2s, setApf2s, 5, 12, 1)}
        {slider('Americas F2S %', amf2s, setAmf2s, 12, 20, 1)}
        {slider('Winter Uplift %', winterUplift, setWinterUplift, 2, 4, 1)}
        {slider('Summer Uplift %', summerUplift, setSummerUplift, 5, 8, 1)}
        {slider('Activation Ratio', activationRatio, setActivationRatio, 80, 120, 1)}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Results</h2>
        <p><strong>Total Subscription Revenue:</strong> ${Number(result.subscriptionRevenue).toLocaleString()}</p>
        <p><strong>Total Advertising Revenue:</strong> ${Number(result.advertisingRevenue).toLocaleString()}</p>
        <p><strong>Total Revenue Uplift:</strong> ${Number(result.totalRevenue).toLocaleString()}</p>
        <p><strong>Total Investment:</strong> ${Number(result.totalInvestment).toLocaleString()}</p>
        <p><strong>Total Profit:</strong> ${Number(result.profit).toLocaleString()}</p>
        <p className="text-lg font-bold mt-2"><strong>ROI:</strong> {result.roi}%</p>
      </div>
    </div>
  );
}
