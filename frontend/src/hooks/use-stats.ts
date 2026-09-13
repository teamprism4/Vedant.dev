"use client";

import { useState, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GitHubStats {
  repos: number;
  followers: number;
  stars: number;
  username: string;
  profile: string;
  fetchedAt: string;
}

export interface LeetCodeStats {
  total: number;
  easy: number;
  medium: number;
  hard: number;
  rank: number;
  username: string;
  profile: string;
  fetchedAt: string;
}

interface StatResult<T> {
  data: T | null;
  loading: boolean;
  stale: boolean;     // true when backend is serving last-known value
  error: string | null;
}

// ─── Fallback values (shown if backend is completely unreachable) ─────────────

export const GITHUB_FALLBACK: GitHubStats = {
  repos: 20,
  followers: 6,
  stars: 2,
  username: "vedan4375",
  profile: "https://github.com/vedant4375",
  fetchedAt: "",
};

export const LEETCODE_FALLBACK: LeetCodeStats = {
  total: 65,
  easy: 83,
  medium: 140,
  hard: 42,
  rank: 525037,
  username: "vedan43",
  profile: "https://leetcode.com/vedant43",
  fetchedAt: "",
};

// ─── API URL ─────────────────────────────────────────────────────────────────

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useStats() {
  const [github, setGithub] = useState<StatResult<GitHubStats>>({
    data: GITHUB_FALLBACK,  // start with fallbacks so page renders immediately
    loading: true,
    stale: true,
    error: null,
  });

  const [leetcode, setLeetcode] = useState<StatResult<LeetCodeStats>>({
    data: LEETCODE_FALLBACK,
    loading: true,
    stale: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/stats/all`, {
          signal: AbortSignal.timeout(10_000), // 10 s hard timeout
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();

        if (!cancelled) {
          // GitHub
          if (json.github?.data) {
            setGithub({ data: json.github.data, loading: false, stale: json.github.stale ?? false, error: null });
          } else {
            setGithub({ data: GITHUB_FALLBACK, loading: false, stale: true, error: json.github?.error ?? "No data" });
          }

          // LeetCode
          if (json.leetcode?.data) {
            setLeetcode({ data: json.leetcode.data, loading: false, stale: json.leetcode.stale ?? false, error: null });
          } else {
            setLeetcode({ data: LEETCODE_FALLBACK, loading: false, stale: true, error: json.leetcode?.error ?? "No data" });
          }
        }
      } catch (err) {
        // Network/backend unreachable — keep fallback values
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : "Unknown error";
          setGithub((prev) => ({ ...prev, loading: false, stale: true, error: msg }));
          setLeetcode((prev) => ({ ...prev, loading: false, stale: true, error: msg }));
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { github, leetcode };
}
