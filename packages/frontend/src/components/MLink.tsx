import { Link } from "react-router-dom";
import React from "react";
// Maybe Link, can also just be an anchor tag for external links
export const MLink: React.FC<{
  to: string;
  className?: string;
  key?: string;
  external?: boolean;
  children: React.ReactNode;
}> = ({ external, to, ...props }) => {
  if (external) {
    return <a {...props} href={to} />;
  }
  return <Link {...props} to={to} />;
};
