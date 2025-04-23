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
  const [activationRatio, setActivationRatio] = useState(1);

  const applyPreset = () => {
    setTotalViewers(4000000000);
    setArpu(66.12);
    setFee(426000000);
    setEmeaV2F(0.015);
    setApacV2F(0.005);
    setAmerV2F(0.008);
    setEmeaF2S(0.25);
    setApacF2S(0.12);
    setAmerF2S(0.2);
    setWinterUplift(0.04);
    setSummerUplift(0.08);
    setActivationRatio(1);
  };

  const convertedSubscribers =
    totalViewers * 0.35 * emeaV2F * emeaF2S +
    totalViewers * 0.45 * apacV2F * apacF2S +
    totalViewers * 0.2 * amerV2F * amerF2S;

  const upliftMultiplier = 1 + (winterUplift + summerUplift + (activationRatio - 1)) / 2;
  const subscriptionRevenue = convertedSubscribers * arpu * 6 * upliftMultiplier;
  const advertisingRevenue = 581080000;
  const totalRevenue = subscriptionRevenue + advertisingRevenue;
  const investment = 426000000 + 426000000 + 0; // Fee x 2 (partnership + activation)
  const profit = totalRevenue - investment;
  const roi = (profit / investment) * 100;

  const format = num => "$" + num.toLocaleString(undefined, { maximumFractionDigits: 0 });

  const SliderBox = ({ label, value, setValue, min, max, step }) => (
    <div className="flex flex-col">
      <label className="font-semibold mb-1">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => setValue(parseFloat(e.target.value))}
        className="mb-1"
      />
      <input
        type="number"
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={e => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v)) {
            setValue(Math.min(Math.max(v, min), max));
          }
        }}
        className="border rounded px-2 py-1 w-24"
      />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold text-center mb-4">ROI Calculator</h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={applyPreset}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Apply Preset
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div>
          <label className="font-semibold">Total Viewers</label>
          <input
            type="number"
            value={totalViewers}
            onChange={e => setTotalViewers(Number(e.target.value))}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="font-semibold">ARPU</label>
          <input
            type="number"
            value={arpu}
            onChange={e => setArpu(Number(e.target.value))}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="font-semibold">Total Partnership Fee</label>
          <input
            type="number"
            value={fee}
            onChange={e => setFee(Number(e.target.value))}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <SliderBox label="EMEA V2F %" value={emeaV2F} setValue={setEmeaV2F} min={0.01} max={0.015} step={0.0001} />
        <SliderBox label="APAC V2F %" value={apacV2F} setValue={setApacV2F} min={0.0045} max={0.005} step={0.0001} />
        <SliderBox label="Americas V2F %" value={amerV2F} setValue={setAmerV2F} min={0.0075} max={0.008} step={0.0001} />

        <SliderBox label="EMEA F2S %" value={emeaF2S} setValue={setEmeaF2S} min={0.18} max={0.25} step={0.01} />
        <SliderBox label="APAC F2S %" value={apacF2S} setValue={setApacF2S} min={0.05} max={0.12} step={0.01} />
        <SliderBox label="Americas F2S %" value={amerF2S} setValue={setAmerF2S} min={0.12} max={0.2} step={0.01} />

        <SliderBox label="Winter Uplift %" value={winterUplift} setValue={setWinterUplift} min={0.02} max={0.04} step={0.005} />
        <SliderBox label="Summer Uplift %" value={summerUplift} setValue={setSummerUplift} min={0.05} max={0.08} step={0.005} />
        <SliderBox label="Activation Ratio %" value={activationRatio} setValue={setActivationRatio} min={0.8} max={1.2} step={0.01} />
      </div>

      <div className="bg-blue-50 p-6 rounded shadow-md text-blue-900 space-y-2 max-w-xl mx-auto">
        <h2 className="text-xl font-bold">Results</h2>
        <p><strong>Total Subscription Revenue:</strong> {format(subscriptionRevenue)}</p>
        <p><strong>Total Advertising Revenue:</strong> {format(advertisingRevenue)}</p>
        <p><strong>Total Revenue Uplift:</strong> {format(totalRevenue)}</p>
        <p><strong>Total Investment:</strong> {format(investment)}</p>
        <p><strong>Total Profit:</strong> {format(profit)}</p>
        <p className="text-lg font-bold text-blue-800">ROI: {roi.toFixed(2)}%</p>
      </div>
    </div>
  );
}
