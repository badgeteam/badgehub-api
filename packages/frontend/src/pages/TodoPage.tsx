import { MLink } from "@components/MLink.tsx";
import { REPO_URL } from "@config.ts";

export const TodoPage = () => (
  <div style={{ textAlign: "center", marginTop: "4rem", fontSize: "1.5rem" }}>
    This page is under construction, come help construct it at{" "}
    <MLink to={REPO_URL} external={true}>
      our git repository
    </MLink>
    !
  </div>
);
