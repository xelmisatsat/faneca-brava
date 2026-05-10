import { describe, it, expect } from "vitest";

describe("OpenRouter API Key Validation", () => {
  it("should have VITE_OPENROUTER_API_KEY set", () => {
    const key = import.meta.env.VITE_OPENROUTER_API_KEY;
    expect(key).toBeDefined();
    expect(key.length).toBeGreaterThan(10);
  });
});
