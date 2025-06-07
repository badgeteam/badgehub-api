import inspector from "node:inspector";

export function isInDebugMode() {
  return inspector.url() !== undefined;
}
