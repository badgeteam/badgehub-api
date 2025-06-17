import React, { useEffect, useState } from "react";
import { tsRestClient as defaultTsRestClient } from "../../api/tsRestClient.ts";
import Header from "@sharedComponents/Header.tsx";
import Footer from "@sharedComponents/Footer.tsx";
import AppEditBreadcrumb from "./AppEditBreadcrumb.tsx";
import AppEditBasicInfo from "./AppEditBasicInfo.tsx";
import AppEditCategorization from "./AppEditCategorization.tsx";
import AppEditActions from "./AppEditActions.tsx";
import { Project } from "@shared/domain/readModels/project/Project.ts";
import { ProjectEditFormData } from "@pages/AppEditPage/ProjectEditFormData.ts";
import { useSession } from "@sharedComponents/keycloakSession/SessionContext.tsx";

const AppEditPage: React.FC<{
  tsRestClient?: typeof defaultTsRestClient;
  slug: string;
}> = ({ tsRestClient = defaultTsRestClient, slug }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ProjectEditFormData | undefined>(undefined);
  const { user, keycloak } = useSession();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      await keycloak?.updateToken(30);
      const res = await tsRestClient.getDraftProject({
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
        params: { slug },
      });
      if (mounted && res.status === 200) {
        const project = res.body;
        setProject(project);
        setForm({
          name: project.name ?? undefined,
          semantic_version:
            project.version.app_metadata.semantic_version ?? undefined,
          description: project.description ?? undefined,
          // badge: project.badges.join(",") ?? undefined,
          category: project.version.app_metadata.category ?? undefined,
          license_file: project.version.app_metadata.license_file ?? undefined,
          main_executable:
            project.version.app_metadata.main_executable ?? undefined,
        });
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [keycloak, slug, tsRestClient, user?.token]);

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

  const handleFormChange = (changes: Partial<ProjectEditFormData>) => {
    setForm((prev) => {
      const newName = prev?.name || changes.name;
      if (!newName) {
        return undefined;
      }
      return {
        ...prev,
        ...changes,
        name: newName,
      } as ProjectEditFormData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    await tsRestClient.changeDraftAppMetadata({
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
      params: { slug },
      body: form,
    });
    await tsRestClient.publishVersion({
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
      params: { slug },
      body: undefined,
    });
  };

  return (
    <div
      data-testid="app-edit-page"
      className="min-h-screen flex flex-col bg-gray-900 text-slate-200"
    >
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <AppEditBreadcrumb project={project} />
        <h1 className="text-3xl font-bold text-slate-100 mb-6">
          Editing: {form.name}
        </h1>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <AppEditBasicInfo form={form} onChange={handleFormChange} />
          <AppEditCategorization form={form} onChange={handleFormChange} />
          <AppEditActions />
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AppEditPage;
