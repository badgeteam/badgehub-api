import React, { useEffect, useState } from "react";
import { tsRestClient as defaultTsRestClient } from "../../api/tsRestClient.ts";
import AppDetailHeader from "./AppDetailHeader.tsx";
import AppDescription from "./AppDescription.tsx";
import AppCodePreview from "./AppCodePreview.tsx";
// import AppReviews from "./AppDetailPage/AppReviews";
import AppSidebarDetails from "./AppSidebarDetails.tsx";
import AppSidebarAuthor from "./AppSidebarAuthor.tsx";
import AppSidebarSimilar from "./AppSidebarSimilar.tsx";
import AppBreadcrumb from "./AppBreadcrumb.tsx";
import { Project } from "@shared/domain/readModels/project/Project.ts";
import Header from "@sharedComponents/Header.tsx";
import Footer from "@sharedComponents/Footer.tsx";

const AppDetailPage: React.FunctionComponent<{
  tsRestClient?: typeof defaultTsRestClient;
  slug: string;
}> = ({ tsRestClient = defaultTsRestClient, slug }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Dummy search state for Header (not used on detail page)
  const [searchQuery] = useState("");
  const setSearchQuery = () => {};

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    tsRestClient.getProject({ params: { slug } }).then((res) => {
      if (mounted && res.status === 200) {
        setProject(res.body);
      }
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [slug, tsRestClient]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-slate-400 bg-gray-900 min-h-screen">
        Loading...
      </div>
    );
  }
  if (!project) {
    return (
      <div
        data-testid="app-detail-error"
        className="flex justify-center items-center h-64 text-red-400 bg-gray-900 min-h-screen"
      >
        App not found.
      </div>
    );
  }
  return (
    <div
      data-testid={"app-detail-page"}
      className="min-h-screen flex flex-col bg-gray-900 text-slate-200"
    >
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <AppBreadcrumb project={project} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AppDetailHeader project={project} />
            <AppDescription project={project} />
            <AppCodePreview project={project} />
            {/*<AppReviews project={project} />*/}
          </div>
          <aside className="lg:col-span-1 space-y-8">
            <AppSidebarDetails project={project} />
            <AppSidebarAuthor project={project} />
            <AppSidebarSimilar project={project} />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppDetailPage;
