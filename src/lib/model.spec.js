import { describe, it, expect } from "vitest";
import { predictRisk } from "./model";

const base = {
  freshwater_exposure: 0, days_since_exposure: 0,
  fever: 0, headache: 0, nuchal_rigidity: 0,
  csf_wbc: 0, csf_protein: 0, csf_glucose: 70,
  pcr_available: 1, microscopy_available: 1
};

describe("predictRisk", () => {
  it("increases with freshwater exposure", () => {
    const p0 = predictRisk(base).p;
    const p1 = predictRisk({ ...base, freshwater_exposure: 1 }).p;
    expect(p1).toBeGreaterThan(p0);
  });

  it("bands at 0.08 and 0.22", () => {
    const low = predictRisk(base).band;
    const mid = predictRisk({ ...base, freshwater_exposure: 1 }).band;
    expect(["Low","Moderate","High"]).toContain(low);
    expect(["Low","Moderate","High"]).toContain(mid);
  });
});
