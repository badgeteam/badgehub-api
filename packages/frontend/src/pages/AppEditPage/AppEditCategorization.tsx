import React from "react";

const mcuOptions = [
  "Arduino Uno",
  "ESP32",
  "Raspberry Pi Pico",
  "STM32",
  "nRF52",
  "ESP8266",
];

const AppEditCategorization: React.FC<{
  form: any;
  onChange: (changes: Partial<any>) => void;
}> = ({ form, onChange }) => (
  <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold text-slate-100 mb-4">Categorization</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Microcontroller (MCU)</label>
        <select
          className="w-full form-input p-2"
          value={form.mcu}
          onChange={e => onChange({ mcu: e.target.value })}
        >
          {mcuOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Tags</label>
        <input
          type="text"
          className="w-full form-input p-2"
          value={form.tags}
          onChange={e => onChange({ tags: e.target.value })}
        />
        <p className="text-xs text-slate-500 mt-1">Comma-separated values.</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">License</label>
        <input
          type="text"
          className="w-full form-input p-2"
          value={form.license}
          onChange={e => onChange({ license: e.target.value })}
        />
      </div>
    </div>
  </section>
);

export default AppEditCategorization;
