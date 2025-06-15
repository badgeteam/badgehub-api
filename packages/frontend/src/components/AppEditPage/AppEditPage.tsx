import React, { useEffect, useState } from "react";
import { tsRestClient as defaultTsRestClient } from "../../api/tsRestClient.ts";
import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import AppEditBreadcrumb from "./AppEditBreadcrumb.tsx";
import AppEditBasicInfo from "./AppEditBasicInfo.tsx";
import AppEditCategorization from "./AppEditCategorization.tsx";
import AppEditMediaFiles from "./AppEditMediaFiles.tsx";
import AppEditActions from "./AppEditActions.tsx";
import { Project } from "@shared/domain/readModels/project/Project.ts";

const AppEditPage: React.FC<{
  tsRestClient?: typeof defaultTsRestClient;
  slug: string;
}> = ({ tsRestClient = defaultTsRestClient, slug }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>(null);

  // Dummy search state for Header (not used here)
  const [searchQuery] = useState("");
  const setSearchQuery = () => {};

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    tsRestClient.getProject({ params: { slug } }).then((res) => {
      if (mounted && res.status === 200) {
        setProject(res.body);
        setForm({
          name: res.body.name ?? "",
          version: res.body.version ?? "",
          description: res.body.description ?? "",
          mcu: res.body.category ?? "",
          tags: res.body.tags?.join(", ") ?? "",
          license: res.body.license ?? "",
          media: res.body.media ?? [],
          code: res.body.code ?? "",
          bundle: res.body.bundle ?? "",
        });
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
  if (!project || !form) {
    return (
      <div
        data-testid="app-edit-error"
        className="flex justify-center items-center h-64 text-red-400 bg-gray-900 min-h-screen"
      >
        App not found.
      </div>
    );
  }

  // Form state handlers
  const handleFormChange = (changes: Partial<typeof form>) => {
    setForm((prev: any) => ({ ...prev, ...changes }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save logic
  };

  return (
    <div
      data-testid="app-edit-page"
      className="min-h-screen flex flex-col bg-gray-900 text-slate-200"
    >
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <AppEditBreadcrumb project={project} />
        <h1 className="text-3xl font-bold text-slate-100 mb-6">
          Editing: {form.name}
        </h1>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <AppEditBasicInfo form={form} onChange={handleFormChange} />
          <AppEditCategorization form={form} onChange={handleFormChange} />
          <AppEditMediaFiles form={form} onChange={handleFormChange} />
          <AppEditActions />
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AppEditPage;
