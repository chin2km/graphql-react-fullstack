// eslint-disable-next-line no-undef
module.exports = {
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "js"],
    transform: { "^.+\\.(j|t)s?$": "babel-jest" },
    testMatch: ["<rootDir>/src/**/*.test.ts"],
    rootDir: ".",
};
