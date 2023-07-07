type ApiErrorProps = {
  message: string;
  status: number;
};

export class ApiError extends Error {
  message: string;
  status: number;

  constructor({ message, status }: ApiErrorProps) {
    super(message);
    this.message = message;
    this.status = status;
    this.name = "ApiError";
  }
}

const fetcher = <T = unknown>(url: string, init?: RequestInit) =>
  fetch(`${import.meta.env.VITE_API_URL}${url}`, init).then((res) => {
    if (!res.ok) {
      throw new ApiError({
        status: res.status,
        message: res.statusText,
      });
    }

    return res.json() as Promise<T>;
  });

type Method = "POST" | "DELETE" | "PUT" | "PATCH";

const mutate =
  (method: Method) =>
  <TResponse = unknown, TBody = Record<string, unknown>>(
    url: string,
    body: TBody
  ) =>
    fetcher<TResponse>(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

export const api = {
  get: fetcher,
  post: mutate("POST"),
  delete: mutate("DELETE"),
  put: mutate("PUT"),
  patch: mutate("PATCH"),
};
