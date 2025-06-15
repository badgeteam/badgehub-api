import Header from "../components/Header.tsx";
import Hero from "../components/Hero.tsx";
import Footer from "../components/Footer.tsx";
import { memo, useState } from "react";
import { tsRestClient as defaultTsRestClient } from "../api/tsRestClient.ts";
import {
  AppFetcher,
  AppGridWithFilterAndPagination,
} from "@components/AppGridWithFilterAndPagination.tsx";

interface AppProps {
  tsRestClient?: typeof defaultTsRestClient;
}

const HomePage = memo(({ tsRestClient = defaultTsRestClient }: AppProps) => {
  const appFetcher: AppFetcher = async (filters) => {
    const result = await tsRestClient?.getProjects({
      query: {
        category: filters.category,
        device: filters.device,
      },
    });
    switch (result.status) {
      case 200:
        return result.body;
      default:
        throw new Error(
          "Failed to fetch projects, reason " +
            (result.body as { reason: string })?.reason
        );
    }
  };
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-900 text-slate-200"
      data-testid="main-page"
    >
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <Hero />
        <AppGridWithFilterAndPagination
          appFetcher={appFetcher}
          searchQuery={searchQuery}
        />
      </main>
      <Footer />
    </div>
  );
});

export default HomePage;
