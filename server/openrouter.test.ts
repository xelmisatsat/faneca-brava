import { describe, it, expect } from "vitest";

describe("OpenRouter API Key Validation", () => {
  it("should have VITE_OPENROUTER_API_KEY set in environment", () => {
    const key = process.env.VITE_OPENROUTER_API_KEY;
    expect(key).toBeDefined();
    expect(key!.length).toBeGreaterThan(10);
  });
});
