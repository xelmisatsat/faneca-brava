import { describe, it, expect } from "vitest";

describe("API Keys Validation", () => {
  it("should have GEMINI_API_KEY set", () => {
    const key = process.env.GEMINI_API_KEY;
    expect(key).toBeDefined();
    expect(key!.length).toBeGreaterThan(10);
  });

  it("should have ELEVENLABS_API_KEY set", () => {
    const key = process.env.ELEVENLABS_API_KEY;
    expect(key).toBeDefined();
    expect(key!.length).toBeGreaterThan(10);
  });
});
