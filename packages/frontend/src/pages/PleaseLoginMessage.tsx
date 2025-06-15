import React from "react";

export const PleaseLoginMessage: React.FC<{ whatToSee: string }> = ({
  whatToSee,
}) => (
  <>
    <div className="items-center justify-center bg-gray-900 text-slate-200 text-center">
      <p>Please log in to see {whatToSee}.</p>
    </div>
  </>
);
