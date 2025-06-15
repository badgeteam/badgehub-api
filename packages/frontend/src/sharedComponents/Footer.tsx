import React from "react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-16 todoElement">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-400">
        <div className="mb-4">
          {["About", "Contact", "Terms of Service"].map((item) => (
            <a
              key={item}
              href="#"
              className="px-3 hover:text-emerald-400 transition-colors text-sm"
            >
              {item}
            </a>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 hover:text-emerald-400 transition-colors text-sm"
          >
            GitHub
          </a>
        </div>
        <p className="text-sm font-roboto-mono">
          &copy; {year} BadgeHub. All rights reserved.
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Designed for makers, by makers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
