import Header from "./components/Header";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import AppsGrid from "./components/AppsGrid";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import "./App.css";
import type { AppCardProps } from "./components/types.ts";

function App() {
  const apps: AppCardProps[] = [
    {
      title: "Weather Station Deluxe",
      description:
        "Displays temperature, humidity, and pressure. Sends data to cloud.",
      tags: [
        { label: "ESP32", isMcu: true },
        { label: "IoT" },
        { label: "Sensors" },
      ],
      author: "DevGuru42",
      authorLink: "#",
      rating: 4.8,
      ratingCount: 120,
      downloads: "1.5k",
    },
    {
      title: "Pico MIDI Controller",
      description:
        "Turns your Raspberry Pi Pico into a versatile USB MIDI device.",
      tags: [
        { label: "Pi Pico", isMcu: true },
        { label: "Music" },
        { label: "USB" },
      ],
      author: "SynthWizard",
      authorLink: "#",
      rating: 4.5,
      ratingCount: 88,
      downloads: "970",
    },
    {
      title: "Arduino CNC Controller",
      description: "GRBL-based CNC control software for Arduino Uno/Mega.",
      tags: [
        { label: "Arduino", isMcu: true },
        { label: "Robotics" },
        { label: "CNC" },
      ],
      author: "MakerBotTom",
      authorLink: "#",
      rating: 4.9,
      ratingCount: 250,
      downloads: "2.1k",
    },
    {
      title: "STM32 FFT Spectrum Analyzer",
      description:
        "Real-time audio spectrum analysis using an STM32 and a microphone.",
      tags: [
        { label: "STM32", isMcu: true },
        { label: "Audio" },
        { label: "DSP" },
      ],
      author: "SignalPro",
      authorLink: "#",
      rating: 4.7,
      ratingCount: 75,
      downloads: "800",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-slate-200">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <Hero />
        <Filters />
        <AppsGrid apps={apps} />
        <Pagination />
      </main>
      <Footer />
    </div>
  );
}

export default App;
