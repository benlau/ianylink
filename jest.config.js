module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ["bower_components"],
    testRegex: "/tests/.*.test.ts[x]?$",
    transformIgnorePatterns: ["/node_modules/(?!(@jupyter(lab|-widgets)/.*)/)"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest",
    },
};
