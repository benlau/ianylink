module.exports = {
    testEnvironment: "node",
    modulePathIgnorePatterns: ["bower_components"],
    testRegex: "/tests/.*.test.js[x]?$",
    transformIgnorePatterns: ["/node_modules/(?!(@jupyter(lab|-widgets)/.*)/)"],
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
};
