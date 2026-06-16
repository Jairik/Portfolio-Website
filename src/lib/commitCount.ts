const COMMIT_COUNT_ENDPOINT = "https://jairik--e9c872b823b611f1845142dde27851f2.web.val.run";

const COMMIT_COUNT_FIELDS = [
  "totalCommits",
  "total_commits",
  "commitCount",
  "commit_count",
  "commits",
  "total",
  "count",
  "value"
] as const;

const parseNumericValue = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, Math.round(value));
  }

  if (typeof value === "string") {
    const parsed = Number(value.trim().replace(/,/g, ""));
    if (Number.isFinite(parsed)) {
      return Math.max(0, Math.round(parsed));
    }
  }

  return null;
};

const parseCommitCount = (payload: unknown): number | null => {
  const directValue = parseNumericValue(payload);
  if (directValue !== null) return directValue;

  if (!payload || typeof payload !== "object") return null;

  const queue: unknown[] = [payload];
  const visited = new Set<object>();

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || typeof current !== "object") continue;
    if (visited.has(current as object)) continue;
    visited.add(current as object);

    const record = current as Record<string, unknown>;

    for (const field of COMMIT_COUNT_FIELDS) {
      if (field in record) {
        const parsed = parseNumericValue(record[field]);
        if (parsed !== null) return parsed;
      }
    }

    Object.values(record).forEach(value => {
      if (value && typeof value === "object") {
        queue.push(value);
      }
    });
  }

  return null;
};

export const fetchCommitCount = async (signal?: AbortSignal): Promise<number> => {
  const response = await fetch(COMMIT_COUNT_ENDPOINT, {
    method: "GET",
    signal,
    headers: {
      Accept: "application/json, text/plain"
    }
  });

  if (!response.ok) {
    throw new Error(`Commit endpoint returned ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";
  const payload: unknown = contentType.includes("application/json")
    ? await response.json()
    : await response.text();
  const parsedCommitCount = parseCommitCount(payload);

  if (parsedCommitCount === null) {
    throw new Error("Commit endpoint response does not contain a numeric commit total.");
  }

  return parsedCommitCount;
};
