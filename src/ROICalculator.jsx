import React, { useState } from 'react';

export default function ROICalculator() {
  const [totalViewers, setTotalViewers] = useState(4000000000);
  const [arpu, setArpu] = useState(66.12);
  const [fee, setFee] = useState(426000000);
  const [activationRatio, setActivationRatio] = useState(1.0);

  const [emeaV2F, setEmeaV2F] = useState(0.015);
  const [apacV2F, setApacV2F] = useState(0.005);
  const [amerV2F, setAmerV2F] = useState(0.008);

  const [emeaF2S, setEmeaF2S] = useState(0.25);
  const [apacF2S, setApacF2S] = useState(0.12);
  const [amerF2S, setAmerF2S] = useState(0.2);

  const [winterUplift, setWinterUplift] = useState(0.04);
  const [summerUplift, setSummerUplift] = useState(0.08);

  const applyPreset = () => {
    setTotalViewers(4000000000);
    setArpu(66.12);
    setFee(426000000);
    setActivationRatio(1.0);
    setEmeaV2F(0.015);
    setApacV2F(0.005);
    setAmerV2F(0.008);
    setEmeaF2S(0.25);
    setApacF2S(0.12);
    setAmerF2S(0.2);
    setWinterUplift(0.04);
    setSummerUplift(0.08);
  };

  const format = (val) => "$" + Number(val).toLocaleString(undefined, { maximumFractionDigits: 0 });

  const emeaSubs = totalViewers * 0.35 * emeaV2F * emeaF2S;
  const apacSubs = totalViewers * 0.45 * apacV2F * apacF2S;
  const amerSubs = totalViewers * 0.2 * amerV2F * amerF2S;
  const totalSubs = emeaSubs + apacSubs + amerSubs;
  const subscriptionRevenue = totalSubs * arpu * 6;

  const winterBase = 2170000000 + 2457000000;
  const summerBase = 2305000000 + 2645000000;
  const advertisingRevenue = winterBase * winterUplift + summerBase * summerUplift;

  const totalRevenue = subscriptionRevenue + advertisingRevenue;
  const investment = fee * (1 + activationRatio);
  const profit = totalRevenue - investment;
  const roi = (profit / investment) * 100;

  const Slider = ({ label, value, setValue, min, max, step }) => (
    <div className="flex flex-col mb-4">
      <label className="font-semibold mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:bg-blue-600
            [&::-webkit-slider-thumb]:rounded-full"
        />
        <input
          type="number"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) {
              setValue(Math.min(Math.max(val, min), max));
            }
          }}
          className="w-20 px-2 py-1 border rounded"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">ROI Calculator</h1>

      <div className="flex justify-center mb-8">
        <button onClick={applyPreset} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Apply Preset
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="font-semibold">Total Viewers</label>
          <input
            type="number"
            className="w-full border px-2 py-1 rounded"
            value={totalViewers}
            onChange={(e) => setTotalViewers(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="font-semibold">ARPU</label>
          <input
            type="number"
            className="w-full border px-2 py-1 rounded"
            value={arpu}
            onChange={(e) => setArpu(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="font-semibold">Partnership Fee</label>
          <input
            type="number"
            className="w-full border px-2 py-1 rounded"
            value={fee}
            onChange={(e) => setFee(Number(e.target.value))}
          />
        </div>

        <Slider label="EMEA V2F %" value={emeaV2F} setValue={setEmeaV2F} min={0.01} max={0.015} step={0.0001} />
        <Slider label="APAC V2F %" value={apacV2F} setValue={setApacV2F} min={0.0045} max={0.005} step={0.0001} />
        <Slider label="Americas V2F %" value={amerV2F} setValue={setAmerV2F} min={0.0075} max={0.008} step={0.0001} />

        <Slider label="EMEA F2S %" value={emeaF2S} setValue={setEmeaF2S} min={0.18} max={0.25} step={0.01} />
        <Slider label="APAC F2S %" value={apacF2S} setValue={setApacF2S} min={0.05} max={0.12} step={0.01} />
        <Slider label="Americas F2S %" value={amerF2S} setValue={setAmerF2S} min={0.12} max={0.2} step={0.01} />

        <Slider label="Winter Uplift %" value={winterUplift} setValue={setWinterUplift} min={0.02} max={0.04} step={0.005} />
        <Slider label="Summer Uplift %" value={summerUplift} setValue={setSummerUplift} min={0.05} max={0.08} step={0.005} />
        <Slider label="Activation Ratio" value={activationRatio} setValue={setActivationRatio} min={0.8} max={1.2} step={0.01} />
      </div>

      <div className="mt-10 bg-blue-50 p-6 rounded shadow space-y-2">
        <h2 className="text-xl font-bold text-blue-800">Results</h2>
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
