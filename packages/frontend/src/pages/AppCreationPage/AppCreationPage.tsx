import React, { useState } from "react";
import Header from "@sharedComponents/Header.tsx";
import Footer from "@sharedComponents/Footer.tsx";
import AppCreationBreadcrumb from "./AppCreationBreadcrumb.tsx";
import AppCreationBasicInfo from "./AppCreationBasicInfo.tsx";
import AppCreationActions from "./AppCreationActions.tsx";
import { VALID_SLUG_REGEX } from "@shared/contracts/slug.ts";
import { useSession } from "@sharedComponents/keycloakSession/SessionContext.tsx";
import { tsRestClient as defaultTsRestClient } from "../../api/tsRestClient.ts";
import { useNavigate } from "react-router-dom";
import { PleaseLoginMessage } from "@sharedComponents/PleaseLoginMessage.tsx";

export interface AppCreationFormData {
  slug: string;
}

// Define the valid slug regex

const initialForm: AppCreationFormData = {
  slug: "",
};

const AppCreationPage: React.FC<{
  tsRestClient?: typeof defaultTsRestClient;
}> = ({ tsRestClient = defaultTsRestClient }) => {
  const [form, setForm] = useState<AppCreationFormData>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const { user, keycloak } = useSession();
  const navigate = useNavigate();
  const handleFormChange = (changes: Partial<AppCreationFormData>) => {
    setForm((prev) => ({
      ...prev,
      ...changes,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await tsRestClient.createProject({
        headers: {
          authorization: `Bearer ${keycloak?.token}`,
        },
        params: { slug: form.slug },
      });
      if (response.status === 204) {
        navigate(`/page/project/${form.slug}/edit`);
      } else {
        // Try to extract error reason from response body
        let reason: unknown = "Unknown error";
        if (
          response.body &&
          typeof response.body === "object" &&
          "reason" in response.body
        ) {
          reason = response.body.reason;
        }
        setError(typeof reason === "string" ? reason : "Unknown error");
      }
    } catch (err: unknown) {
      setError((err as { message: string })?.message || "Unknown error");
    }
  };

  // Check if slug is valid
  const isSlugValid = VALID_SLUG_REGEX.test(form.slug);

  // Check if user is logged in
  const userIsLoggedIn = keycloak?.authenticated && user?.id;

  return (
    <div
      data-testid="app-creation-page"
      className="min-h-screen flex flex-col bg-gray-900 text-slate-200"
    >
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <AppCreationBreadcrumb />
        <h1 className="text-3xl font-bold text-slate-100 mb-6">
          Create a New Project
        </h1>
        {!userIsLoggedIn ? (
          <PleaseLoginMessage whatToSee="create a project" />
        ) : (
          <>
            {error && (
              <div className="mb-4 text-red-400 bg-red-900/40 border border-red-700 rounded px-4 py-2">
                {error}
              </div>
            )}
            <form className="space-y-8" onSubmit={handleSubmit}>
              <AppCreationBasicInfo form={form} onChange={handleFormChange} />
              <AppCreationActions isSlugValid={isSlugValid} />
            </form>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AppCreationPage;
