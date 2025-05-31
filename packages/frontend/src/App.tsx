import Header from "./components/Header";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import AppsGrid from "./components/AppsGrid";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";
import "./App.css";
import type { AppCardProps } from "./components/types.ts";
import { useEffect, useState } from "react";
import { tsRestClient } from "./api/tsRestClient";

function App() {
  const [apps, setApps] = useState<AppCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    tsRestClient
      .getProjects({ query: {} })
      .then((res) => {
        if (res.status === 200) {
          const body = res.body;
          setApps(body);
          setError(null);
        } else {
          setError("Failed to fetch projects");
        }
      })
      .catch(() => setError("Failed to fetch projects"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-slate-200">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <Hero />
        <Filters />
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-center py-10 text-red-400">{error}</div>
        ) : (
          <AppsGrid apps={apps} />
        )}
        <Pagination />
      </main>
      <Footer />
    </div>
  );
}

export default App;
