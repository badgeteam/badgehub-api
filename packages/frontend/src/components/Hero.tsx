import React from "react";

const Hero: React.FC = () => (
  <section className="text-center mb-12 pt-8">
    <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
      Share. Build. Innovate.
    </h1>
    <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
      Badge applications at your fingertips. Discover projects or contribute
      your own.
    </p>
    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 todoElement">
      <a
        href="#apps-grid"
        className="btn-primary px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        Explore Projects
      </a>
      <a
        href="#"
        className="btn-secondary px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        Upload Your Creation
      </a>
    </div>
  </section>
);

export default Hero;
