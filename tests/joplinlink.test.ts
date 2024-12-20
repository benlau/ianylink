import { JoplinLink } from "../src/links/joplinlink";
describe("JoplinLink", () => {
    it("decodePath", () => {
        const joplinkLink: JoplinLink = new JoplinLink();

        expect(
            joplinkLink.decodePath("/j/n/12345678901234567890123456789012")
                ?.url,
        ).toBe(
            "joplin://x-callback-url/openNote?id=12345678901234567890123456789012",
        );

        expect(
            joplinkLink.decodePath("/j/t/12345678901234567890123456789012")
                ?.url,
        ).toBe(
            "joplin://x-callback-url/openTag?id=12345678901234567890123456789012",
        );

        expect(
            joplinkLink.decodePath("/j/f/12345678901234567890123456789012")
                ?.url,
        ).toBe(
            "joplin://x-callback-url/openFolder?id=12345678901234567890123456789012",
        );

        // ID is not 32 characters long
        expect(joplinkLink.decodePath("/j/f/123456789012345678901234567")).toBe(
            undefined,
        );
    });

    it("encodeLink", () => {
        const joplinLink = new JoplinLink();

        expect(
            joplinLink.encodeLink(
                "joplin://x-callback-url/openNote?id=12345678901234567890123456789012",
            ),
        ).toBe("/j/n/12345678901234567890123456789012");

        expect(
            joplinLink.encodeLink(
                "joplin://x-callback-url/openTag?id=12345678901234567890123456789012",
            ),
        ).toBe("/j/t/12345678901234567890123456789012");

        expect(
            joplinLink.encodeLink(
                "joplin://x-callback-url/openFolder?id=12345678901234567890123456789012",
            ),
        ).toBe("/j/f/12345678901234567890123456789012");

        expect(
            joplinLink.encodeLink(
                "joplin://x-callback-url/openFolder?id=12345678901234567890123456789012#title",
            ),
        ).toBe("/j/f/12345678901234567890123456789012#title");

        expect(joplinLink.encodeLink("https://example.com")).toBe(undefined);
    });
});
