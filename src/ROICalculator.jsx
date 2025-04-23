import React, { useState } from 'react';

const ROIcalculator = () => {
  const [totalViewers, setTotalViewers] = useState(4000000000);
  const [arpu, setArpu] = useState(66.12);
  const [fee, setFee] = useState(426000000);

  const [emeaV2F, setEmeaV2F] = useState(1.5);
  const [apacV2F, setApacV2F] = useState(0.5);
  const [amerV2F, setAmerV2F] = useState(0.8);

  const [emeaF2S, setEmeaF2S] = useState(25);
  const [apacF2S, setApacF2S] = useState(12);
  const [amerF2S, setAmerF2S] = useState(20);

  const [winterUplift, setWinterUplift] = useState(4);
  const [summerUplift, setSummerUplift] = useState(8);
  const [activationRatio, setActivationRatio] = useState(100);

  const applyPreset = () => {
    setArpu(66.12);
    setFee(426000000);
  };

  const format = (val) => parseFloat(val.toFixed(2)).toLocaleString();

  const calculateROI = () => {
    const emeaViewer = totalViewers * 0.35;
    const apacViewer = totalViewers * 0.45;
    const amerViewer = totalViewers * 0.2;

    const emeaV2FCount = (emeaV2F / 100) * emeaViewer;
    const apacV2FCount = (apacV2F / 100) * apacViewer;
    const amerV2FCount = (amerV2F / 100) * amerViewer;

    const emeaF2SCount = (emeaF2S / 100) * emeaV2FCount;
    const apacF2SCount = (apacF2S / 100) * apacV2FCount;
    const amerF2SCount = (amerF2S / 100) * amerV2FCount;

    const totalF2S = emeaF2SCount + apacF2SCount + amerF2SCount;
    const subRevenue = totalF2S * arpu * 6;

    const winterAd = (2170000000 + 2457000000) * (winterUplift / 100);
    const summerAd = (2305000000 + 2645000000) * (summerUplift / 100);
    const adRevenue = winterAd + summerAd;

    const investment = fee * (1 + activationRatio / 100);
    const totalRevenue = subRevenue + adRevenue;
    const profit = totalRevenue - investment;
    const roi = (profit / investment) * 100;

    return {
      subRevenue,
      adRevenue,
      totalRevenue,
      investment,
      profit,
      roi,
    };
  };

  const result = calculateROI();

  const sliderBlock = (label, value, setValue, min, max) => (
    <div className="w-full md:w-1/3 px-2">
      <label className="block font-semibold mb-1">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step="0.01"
        value={value}
        onChange={(e) => setValue(Math.min(Math.max(parseFloat(e.target.value), min), max))}
        className="w-full accent-blue-600"
      />
      <input
        type="number"
        step="0.01"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const val = parseFloat(e.target.value);
          if (!isNaN(val)) setValue(Math.min(Math.max(val, min), max));
        }}
        className="mt-1 w-full border px-2 py-1 rounded"
      />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">ROI Calculator</h1>
      <div className="flex justify-center mb-6">
        <button onClick={applyPreset} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          Apply Preset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block font-semibold mb-1">Total Viewers</label>
          <input
            type="number"
            className="w-full border px-2 py-1 rounded"
            value={totalViewers}
            onChange={(e) => setTotalViewers(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">ARPU</label>
          <input
            type="number"
            className="w-full border px-2 py-1 rounded"
            value={arpu}
            onChange={(e) => setArpu(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Total Partnership Fee</label>
          <input
            type="number"
            className="w-full border px-2 py-1 rounded"
            value={fee}
            onChange={(e) => setFee(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mb-8">
        {sliderBlock('EMEA V2F %', emeaV2F, setEmeaV2F, 1, 1.5)}
        {sliderBlock('APAC V2F %', apacV2F, setApacV2F, 0.45, 0.5)}
        {sliderBlock('Americas V2F %', amerV2F, setAmerV2F, 0.75, 0.8)}
        {sliderBlock('EMEA F2S %', emeaF2S, setEmeaF2S, 18, 25)}
        {sliderBlock('APAC F2S %', apacF2S, setApacF2S, 5, 12)}
        {sliderBlock('Americas F2S %', amerF2S, setAmerF2S, 12, 20)}
        {sliderBlock('Winter Uplift %', winterUplift, setWinterUplift, 2, 4)}
        {sliderBlock('Summer Uplift %', summerUplift, setSummerUplift, 5, 8)}
        {sliderBlock('Activation Ratio %', activationRatio, setActivationRatio, 80, 120)}
      </div>

      <div className="bg-blue-50 p-6 rounded shadow">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Results</h2>
        <p><strong>Total Subscription Revenue:</strong> ${format(result.subRevenue)}</p>
        <p><strong>Total Advertising Revenue:</strong> ${format(result.adRevenue)}</p>
        <p><strong>Total Revenue Uplift:</strong> ${format(result.totalRevenue)}</p>
        <p><strong>Total Investment:</strong> ${format(result.investment)}</p>
        <p><strong>Total Profit:</strong> ${format(result.profit)}</p>
        <p className="text-xl mt-2"><strong>ROI:</strong> {result.roi.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default ROIcalculator;
