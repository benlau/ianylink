import { LinkResolver } from "../src/links/linkresolver";

describe("LinkResolver", () => {
    let linkResolver: LinkResolver;
    const uriPrefix = "/l";

    beforeEach(() => {
        linkResolver = new LinkResolver();
    });

    it("should decode a valid Joplin link", () => {
        const url = new URL(
            "http://example.com/l/j/n/12345678901234567890123456789012",
        );
        const decodedLink = linkResolver.decode(uriPrefix, url);
        expect(decodedLink).toBe(
            "joplin://x-callback-url/openNote?id=12345678901234567890123456789012",
        );
    });

    it("should decode a valid UniversalLink2 link", () => {
        const url = new URL("http://example.com/l/v/https///example.com");
        const decodedLink = linkResolver.decode(uriPrefix, url);
        expect(decodedLink).toBe("https://example.com");
    });

    it("should return undefined for an invalid link", () => {
        const url = new URL("http://example.com/l/invalid/path");
        const decodedLink = linkResolver.decode(uriPrefix, url);
        expect(decodedLink).toBeUndefined();
    });

    it("should encode a valid Joplin link", () => {
        const link =
            "joplin://x-callback-url/openNote?id=12345678901234567890123456789012";
        const encodedLink = linkResolver.encode(uriPrefix, link);
        expect(encodedLink).toBe("/l/j/n/12345678901234567890123456789012");
    });

    it("should encode a valid UniversalLink2 link", () => {
        const link = "https://example.com";
        const encodedLink = linkResolver.encode(uriPrefix, link);
        expect(encodedLink).toBe("/l/v/https///example.com");
    });

    it("should decode a valid UniversalLink link", () => {
        const url = new URL(
            "http://example.com/l/u/aHR0cHM6Ly9leGFtcGxlLmNvbQ",
        );
        const decodedLink = linkResolver.decode(uriPrefix, url);
        expect(decodedLink).toBe("https://example.com");
    });

    it("should return undefined for an invalid link to encode", () => {
        const link = "javascript:alert('test')";
        const encodedLink = linkResolver.encode(uriPrefix, link);
        expect(encodedLink).toBeUndefined();
    });
});
