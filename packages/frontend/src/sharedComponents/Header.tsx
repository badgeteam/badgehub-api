import React, { useState } from "react";
import { BadgeHubIcon } from "@sharedComponents/BadgeHubIcon.tsx";
import ProfileIcon from "@sharedComponents/ProfileIcon";
import { MLink } from "@sharedComponents/MLink.tsx";

const navLinks = [
  { label: "Browse Projects", to: "/", testId: "BrowseProjects" },
  {
    label: "Create Project",
    to: "/page/create-project",
    testId: "CreateProject",
  },
  {
    label: "My Projects",
    to: "/page/my-projects",
    testId: "MyProjects",
  },
  {
    label: "API Docs",
    to: "/api-docs",
    external: true,
    testId: "APIDocs",
  },
  // { label: "Community", to: "#" },
];

type SearchProps = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
};

const SearchField: React.FC<SearchProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="relative hidden sm:block">
      <input
        type="search"
        placeholder="Search apps..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        data-testid="search-bar"
        className="bg-gray-700 text-gray-300 placeholder-gray-500 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg
          className="h-4 w-4 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

const Header: React.FC<Partial<SearchProps>> = (searchProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchEnabled =
    searchProps.searchQuery !== undefined &&
    searchProps.setSearchQuery !== undefined;
  const checkedSearchProps: SearchProps | undefined = searchEnabled
    ? (searchProps as SearchProps)
    : undefined;

  return (
    <header className="bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <MLink
              to="/"
              className="flex items-center space-x-2 text-xl font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <BadgeHubIcon />
              <span>BadgeHub</span>
            </MLink>
          </div>

          <nav className="hidden md:flex space-x-4 items-center">
            {navLinks.map((link) => (
              <MLink
                to={link.to}
                external={link.external}
                key={link.label}
                data-testid={"Header/Link/" + link.testId}
                className={
                  (link.to.endsWith("/todo") ? "todoElement " : "") +
                  "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                }
              >
                {link.label}
              </MLink>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {checkedSearchProps && (
              <SearchField {...checkedSearchProps}></SearchField>
            )}
            <ProfileIcon />
          </div>

          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
              aria-label="Open main menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${mobileOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${mobileOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`md:hidden${mobileOpen ? "" : " hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <MLink
              to={link.to}
              external={link.external}
              key={link.label}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              {link.label}
            </MLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
