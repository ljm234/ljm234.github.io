import { describe, it, expect } from "vitest";
import { predictRisk, sanitizeFeatures, DEFAULT_INPUT } from "./model";

describe("predictRisk/sanitize", () => {
  it("never returns NaN for default", () => {
    const out = predictRisk(DEFAULT_INPUT);
    expect(Number.isFinite(out.p)).toBe(true);
  });
  it("coerces junk to safe numbers", () => {
    const x = {
      freshwater_exposure: "1",
      days_since_exposure: "abc",
      csf_wbc: undefined,
      csf_protein: null,
      csf_glucose: "200.5",
      pcr_available: "0",
      microscopy_available: "nope"
    };
    const s = sanitizeFeatures(x);
    expect(s.freshwater_exposure).toBe(1);
    expect(s.days_since_exposure).toBe(0);
    expect(s.csf_wbc).toBe(0);
    expect(s.csf_protein).toBe(0);
    expect(s.csf_glucose).toBe(200);
    expect(s.pcr_available).toBe(0);
    expect(s.microscopy_available).toBe(0);
    const out = predictRisk(x);
    expect(Number.isFinite(out.p)).toBe(true);
  });
});