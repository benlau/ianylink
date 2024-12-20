import { UniversalLink2 } from "../src/links/universallink2";

describe("UniversalLink2", () => {
    let universalLink2: UniversalLink2;

    beforeEach(() => {
        universalLink2 = new UniversalLink2();
    });

    it("should encode a link correctly", () => {
        expect(universalLink2.encodeLink("https://example.com")).toBe(
            "/v/https///example.com",
        );
        expect(universalLink2.encodeLink("https://example.com/")).toBe(
            "/v/https///example.com/",
        );
        expect(universalLink2.encodeLink("https://example.com/path")).toBe(
            "/v/https///example.com/path",
        );
        expect(universalLink2.encodeLink("https://example.com/path/")).toBe(
            "/v/https///example.com/path/",
        );

        expect(universalLink2.encodeLink("file:///Users/user")).toBe(
            "/v/file////Users/user",
        );

        expect(
            universalLink2.encodeLink("https://example.com/path1/path2"),
        ).toBe("/v/https///example.com/path1/path2");

        expect(
            universalLink2.encodeLink("https://example.com/path?query=value"),
        ).toBe("/v/https///example.com/path?query=value");
        expect(
            universalLink2.encodeLink(
                "https://example.com/path?query=value&query2=value2",
            ),
        ).toBe("/v/https///example.com/path?query=value&query2=value2");

        expect(
            universalLink2.encodeLink(
                "https://example.com/path#hash?query=value",
            ),
        ).toBe("/v/https///example.com/path#hash?query=value");

        expect(
            universalLink2.encodeLink(
                "https://example.com/path?query=value#hash",
            ),
        ).toBe("/v/https///example.com/path?query=value#hash");

        expect(universalLink2.encodeLink("mailto:test@test.com")).toBe(
            "/v/mailto/test@test.com",
        );

        expect(universalLink2.encodeLink("https://中文.tw")).toBe(
            "/v/https///中文.tw",
        );

        expect(
            universalLink2.encodeLink("http://username:password@example.com"),
        ).toBe("/v/http///username:password@example.com");

        expect(universalLink2.encodeLink("javascript:alert('test')")).toBe(
            undefined,
        );
        expect(universalLink2.encodeLink("javascript:void(0)")).toBe(undefined);
    });

    it("should decode a path correctly", () => {
        expect(universalLink2.decodePath("/v/https///example.com")?.url).toBe(
            "https://example.com",
        );
        expect(universalLink2.decodePath("/v/https///example.com/")?.url).toBe(
            "https://example.com/",
        );
        expect(
            universalLink2.decodePath("/v/https///example.com/path")?.url,
        ).toBe("https://example.com/path");
        expect(
            universalLink2.decodePath("/v/https///example.com/path?query=value")
                ?.url,
        ).toBe("https://example.com/path?query=value");
        expect(
            universalLink2.decodePath(
                "/v/https///example.com/path?query=value&query2=value2",
            )?.url,
        ).toBe("https://example.com/path?query=value&query2=value2");
        expect(
            universalLink2.decodePath(
                "/v/https///example.com/path1/path2?query=value&query2=value2",
            )?.url,
        ).toBe("https://example.com/path1/path2?query=value&query2=value2");

        expect(universalLink2.decodePath("/v/mailto/test@test.com")?.url).toBe(
            "mailto:test@test.com",
        );

        expect(universalLink2.decodePath("/v/file////Users/user")?.url).toBe(
            "file:///Users/user",
        );

        expect(universalLink2.decodePath("/v/https///中文.tw")?.url).toBe(
            "https://中文.tw",
        );

        expect(
            universalLink2.decodePath("/v/http///username:password@example.com")
                ?.url,
        ).toBe("http://username:password@example.com");

        expect(universalLink2.decodePath("/v/javascript/alert('test')")).toBe(
            undefined,
        );
        expect(universalLink2.decodePath("/v/javascript/void(0)")).toBe(
            undefined,
        );
    });
});
