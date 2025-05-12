const nextJest = require("next/jest");

const createJestConfig = nextJest();
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

require("dotenv").config({ path: ".env.development" });

module.exports = jestConfig;
