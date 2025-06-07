import React from "react";
import { Project } from "@shared/domain/readModels/project/Project.ts";

const AppSidebarSimilar: React.FC<{ project: Project }> = () => (
  <section className="bg-gray-800 p-6 rounded-lg shadow-lg todoElement">
    <h2 className="text-xl font-semibold text-slate-100 mb-4 border-b border-gray-700 pb-2">
      Other Projects by this author
    </h2>
    <div className="space-y-4">
      <div className="flex items-start space-x-3">
        <img
          src="https://placehold.co/60x60/374151/D1D5DB?text=App"
          alt="Similar App Icon"
          className="w-12 h-12 rounded-md flex-shrink-0"
        />
        <div>
          <a
            href="#"
            className="text-sm font-semibold text-emerald-400 hover:underline todoElement"
          >
            PicoTemp Monitor
          </a>
          <p className="text-xs text-slate-400">RPi Pico, Temperature</p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <img
          src="https://placehold.co/60x60/374151/D1D5DB?text=App"
          alt="Similar App Icon"
          className="w-12 h-12 rounded-md flex-shrink-0"
        />
        <div>
          <a
            href="#"
            className="text-sm font-semibold text-emerald-400 hover:underline todoElement"
          >
            Arduino EnviroLogger
          </a>
          <p className="text-xs text-slate-400">Arduino, DHT22, SD Card</p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <img
          src="https://placehold.co/60x60/374151/D1D5DB?text=App"
          alt="Similar App Icon"
          className="w-12 h-12 rounded-md flex-shrink-0"
        />
        <div>
          <a
            href="#"
            className="text-sm font-semibold text-emerald-400 hover:underline todoElement"
          >
            ESP8266 Smart Plant
          </a>
          <p className="text-xs text-slate-400">ESP8266, Soil Moisture</p>
        </div>
      </div>
    </div>
  </section>
);

export default AppSidebarSimilar;
