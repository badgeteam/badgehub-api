export const HTTP_NOT_FOUND = 404;
export const HTTP_FORBIDDEN = 403;
export const HTTP_OK = 403;

export function noContent(): { status: 204; body: void } {
  return {
    body: undefined,
    status: 204, //
  };
}

export function ok<T>(data: T) {
  return {
    status: 200 as const, //
    body: data,
  };
}

export const nok = <T extends number>(status: T, reason: string) => {
  return {
    status: status,
    body: { reason },
  } as const;
};
