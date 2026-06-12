/* Hook wrapper around the shared GitHub commit-count fetcher. */
import { useEffect, useState } from "react";
import { fetchCommitCount } from "../lib/commitCount";

/* Returns the live commit total, or null until/unless the fetch resolves */
export function useCommitCount(): number | null {
  const [commits, setCommits] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchCommitCount(controller.signal)
      .then(setCommits)
      .catch(() => { /* keep the static fallback on failure */ });
    return () => controller.abort();
  }, []);

  return commits;
}
