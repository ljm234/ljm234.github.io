import { describe, it, expect } from "vitest";
import { generateCohort, conformalThreshold, adjustForPrevalence, recommendThreshold, simulatePolicy } from "./conformal";

describe("conformal & policy", () => {
  const cohort = generateCohort(500, 123);

  it("finds a conformal threshold", () => {
    const t = conformalThreshold(cohort, 0.1);
    expect(t).toBeGreaterThan(0);
    expect(t).toBeLessThan(1);
  });

  it("adjusts for prevalence sensibly", () => {
    const p0 = cohort[0].p;
    const pAdj = adjustForPrevalence(p0, 0.12, 0.30);
    expect(pAdj).toBeGreaterThan(0);
    expect(pAdj).toBeLessThan(1);
  });

  it("recommends a threshold with max net benefit", () => {
    const r = recommendThreshold(cohort, 0.02);
    expect(r.t).toBeGreaterThan(0);
    expect(r.t).toBeLessThan(1);
  });

  it("simulates a policy and returns sane metrics", () => {
    const sim = simulatePolicy(cohort, 0.2);
    expect(sim.N).toBe(500);
    expect(sim.PPV).toBeGreaterThan(0);
    expect(sim.PPV).toBeLessThan(1);
    expect(sim.NPV).toBeGreaterThan(0);
    expect(sim.NPV).toBeLessThan(1);
  });
});
