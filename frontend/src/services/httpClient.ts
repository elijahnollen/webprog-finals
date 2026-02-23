export class HttpError extends Error {
  public readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

function tryParseJson(text: string): unknown {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const data = tryParseJson(text);

  if (!response.ok) {
    const message =
      (typeof data === "object" && data && "message" in data && String(data.message)) ||
      `Request failed with status ${response.status}`;
    throw new HttpError(response.status, message);
  }

  return data as T;
}

export async function httpGet<T>(url: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network request failed.";
    throw new HttpError(0, message);
  }

  return parseResponse<T>(response);
}

export async function httpPost<T, B>(url: string, body: B): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network request failed.";
    throw new HttpError(0, message);
  }

  return parseResponse<T>(response);
}
