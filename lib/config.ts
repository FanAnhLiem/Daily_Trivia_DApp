// lib/config.ts

export const NETWORK = "devnet";

// Package ID của smart contract Daily Trivia (vừa publish xong)
export const TRIVIA_PACKAGE_ID =
  "0xf125cefba8ca4c583b120ff6decba0b2c4874f5efc75a2009230723c9f64d202";

export const TRIVIA_MODULE_NAME = "daily_trivia";

export const TRIVIA_METHODS = {
  ANSWER: "answer_trivia",
} as const;
