export const ok = <T>(data: T) => {
  return {
    status: 200, //
    body: data,
  } as const;
};
export const nok = <T extends number>(status: T, reason: string) => {
  return {
    status: status,
    body: { reason },
  } as const;
};
