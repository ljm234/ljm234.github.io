const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  timeout: 60000,
  testDir: "./e2e",
  use: { baseURL: "http://localhost:3000" },
  webServer: {
    command: "npm run start",
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
