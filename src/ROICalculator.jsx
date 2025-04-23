import React, { useState } from 'react';

const clamp = (value, min, max) => Math.min(Math.max(Number(value), min), max);

const InputSlider = ({ label, value, setValue, min, max, step, suffix = '%' }) => {
  const handleSliderChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    const num = parseFloat(input);
    if (!isNaN(num)) {
      setValue(clamp(num, min, max));
    }
  };

  return (
    <div className="mb-6 w-full">
      <label className="font-semibold block mb-1">
        {label} {suffix && `(${(value * 100).toFixed(2)}${suffix})`}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="w-full"
        />
        <input
          type="number"
          value={value}
          step={step}
          onChange={handleInputChange}
          className="border px-2 py-1 rounded w-24 text-right"
        />
      </div>
    </div>
  );
};

export default function ROICalculator() {
  const [totalViewers, setTotalViewers] = useState(4000000000);
  const [arpu, setArpu] = useState(66.12);
  const [fee, setFee] = useState(426000000);

  const [emv2F, setEmv2F] = useState(0.015);
  const [apv2F, setApv2F] = useState(0.005);
  const [amv2F, setAmv2F] = useState(0.008);

  const [emF2S, setEmF2S] = useState(0.25);
  const [apF2S, setApF2S] = useState(0.12);
  const [amF2S, setAmF2S] = useState(0.2);

  const [winterUplift, setWinterUplift] = useState(0.04);
  const [summerUplift, setSummerUplift] = useState(0.08);
  const [activationRatio, setActivationRatio] = useState(1.0);

  const applyPreset = () => {
    setTotalViewers(4000000000);
    setArpu(66.12);
    setFee(426000000);

    setEmv2F(0.015);
    setApv2F(0.005);
    setAmv2F(0.008);

    setEmF2S(0.25);
    setApF2S(0.12);
    setAmF2S(0.2);

    setWinterUplift(0.04);
    setSummerUplift(0.08);
    setActivationRatio(1.0);
  };

  const calculateROI = () => {
    const v2FTotal =
      (totalViewers * emv2F) +
      (totalViewers * apv2F) +
      (totalViewers * amv2F);

    const convertedSubscribers =
      v2FTotal *
      ((emF2S + apF2S + amF2S) * activationRatio) / 3;

    const upliftMultiplier = 1 + (winterUplift + summerUplift) / 2;
    const revenue = convertedSubscribers * arpu * upliftMultiplier;
    const roi = ((revenue - fee) / fee) * 100;

    return {
      roi: roi.toFixed(2),
      revenue: revenue.toFixed(2),
    };
  };

  const { roi, revenue } = calculateROI();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">ROI Calculator</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={applyPreset}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
        >
          Apply Preset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="font-semibold block mb-1">Total Viewers</label>
          <input
            type="number"
            value={totalViewers}
            onChange={(e) => setTotalViewers(parseInt(e.target.value))}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">ARPU</label>
          <input
            type="number"
            value={arpu}
            onChange={(e) => setArpu(parseFloat(e.target.value))}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">Total Partnership Fee</label>
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(parseInt(e.target.value))}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <InputSlider label="EMEA V2F %" value={emv2F} setValue={setEmv2F} min={0.01} max={0.015} step={0.0005} />
        <InputSlider label="APAC V2F %" value={apv2F} setValue={setApv2F} min={0.0045} max={0.005} step={0.0005} />
        <InputSlider label="Americas V2F %" value={amv2F} setValue={setAmv2F} min={0.0075} max={0.008} step={0.0005} />

        <InputSlider label="EMEA F2S %" value={emF2S} setValue={setEmF2S} min={0.18} max={0.25} step={0.01} />
        <InputSlider label="APAC F2S %" value={apF2S} setValue={setApF2S} min={0.05} max={0.12} step={0.01} />
        <InputSlider label="Americas F2S %" value={amF2S} setValue={setAmF2S} min={0.12} max={0.2} step={0.01} />

        <InputSlider label="Winter Uplift %" value={winterUplift} setValue={setWinterUplift} min={0.02} max={0.04} step={0.005} />
        <InputSlider label="Summer Uplift %" value={summerUplift} setValue={setSummerUplift} min={0.05} max={0.08} step={0.005} />
        <InputSlider label="Activation Ratio %" value={activationRatio} setValue={setActivationRatio} min={0.8} max={1.2} step={0.01} />
      </div>

      <div className="bg-blue-50 mt-10 p-6 rounded shadow text-blue-900">
        <h2 className="text-xl font-bold mb-2">Results</h2>
        <p><strong>Estimated Revenue:</strong> ${revenue}</p>
        <p><strong>ROI:</strong> {roi}%</p>
      </div>
    </div>
  );
}
