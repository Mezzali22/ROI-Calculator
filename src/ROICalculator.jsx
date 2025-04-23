import React, { useState } from 'react';

export default function ROICalculator() {
  const [totalViewers, setTotalViewers] = useState(4000000000);
  const [arpu, setArpu] = useState(66.12);
  const [totalPartnershipFee, setTotalPartnershipFee] = useState(426000000);

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
    setTotalPartnershipFee(426000000);
    setTotalViewers(4000000000);
    setEmeaV2F(1.5);
    setApacV2F(0.5);
    setAmerV2F(0.8);
    setEmeaF2S(25);
    setApacF2S(12);
    setAmerF2S(20);
    setWinterUplift(4);
    setSummerUplift(8);
    setActivationRatio(100);
  };

  const calculateROI = () => {
    const v2fTotal = (
      (totalViewers * emeaV2F) / 100 +
      (totalViewers * apacV2F) / 100 +
      (totalViewers * amerV2F) / 100
    );

    const convertedSubscribers = (
      (v2fTotal * ((emeaF2S / 100 + apacF2S / 100 + amerF2S / 100)) *
        (activationRatio / 100)) /
      3
    );

    const upliftMultiplier = 1 + (winterUplift + summerUplift) / 200;
    const revenue = convertedSubscribers * arpu * upliftMultiplier;
    const roi = ((revenue - totalPartnershipFee) / totalPartnershipFee) * 100;

    return {
      revenue: revenue.toFixed(2),
      roi: roi.toFixed(2),
    };
  };

  const { revenue, roi } = calculateROI();

  const sliders = [
    {
      label: 'Total Viewers',
      value: totalViewers,
      min: 1000000000,
      max: 5000000000,
      step: 100000000,
      setter: setTotalViewers,
    },
    {
      label: 'EMEA V2F %',
      value: emeaV2F,
      min: 1,
      max: 1.5,
      step: 0.01,
      setter: setEmeaV2F,
    },
    {
      label: 'APAC V2F %',
      value: apacV2F,
      min: 0.45,
      max: 0.5,
      step: 0.01,
      setter: setApacV2F,
    },
    {
      label: 'Americas V2F %',
      value: amerV2F,
      min: 0.75,
      max: 0.8,
      step: 0.01,
      setter: setAmerV2F,
    },
    {
      label: 'EMEA F2S %',
      value: emeaF2S,
      min: 18,
      max: 25,
      step: 1,
      setter: setEmeaF2S,
    },
    {
      label: 'APAC F2S %',
      value: apacF2S,
      min: 5,
      max: 12,
      step: 1,
      setter: setApacF2S,
    },
    {
      label: 'Americas F2S %',
      value: amerF2S,
      min: 12,
      max: 20,
      step: 1,
      setter: setAmerF2S,
    },
    {
      label: 'Winter Uplift %',
      value: winterUplift,
      min: 2,
      max: 4,
      step: 0.01,
      setter: setWinterUplift,
    },
    {
      label: 'Summer Uplift %',
      value: summerUplift,
      min: 5,
      max: 8,
      step: 0.01,
      setter: setSummerUplift,
    },
    {
      label: 'Activation Ratio: 100.00%',
      value: activationRatio,
      min: 80,
      max: 120,
      step: 1,
      setter: setActivationRatio,
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">ROI Calculator</h1>
      <button
        onClick={applyPreset}
        className="mb-4 px-4 py-2 bg-blue-700 text-white rounded shadow"
      >
        Apply Preset
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sliders.map(({ label, value, min, max, step, setter }) => (
          <div key={label} className="bg-white p-4 rounded shadow">
            <label className="block font-semibold mb-2">{label}</label>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={(e) => setter(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-right font-medium">
              {label.includes('%') ? `${value.toFixed(2)}%` : value}
            </div>
          </div>
        ))}

        <div className="bg-white p-4 rounded shadow">
          <label className="block font-semibold mb-2">ARPU</label>
          <input
            type="number"
            value={arpu}
            onChange={(e) => setArpu(Number(e.target.value))}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <label className="block font-semibold mb-2">Total Partnership Fee</label>
          <input
            type="number"
            value={totalPartnershipFee}
            onChange={(e) => setTotalPartnershipFee(Number(e.target.value))}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Results</h2>
        <p><strong>Estimated Revenue:</strong> ${revenue}</p>
        <p><strong>ROI:</strong> {roi}%</p>
      </div>
    </div>
  );
}
