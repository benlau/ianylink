import { JoplinLink } from "../src/links/joplinlink";
describe("JoplinLink", () => {
    it("decode", () => {
        const joplinkLink = new JoplinLink();

        expect(
            joplinkLink.decode("/j/n/12345678901234567890123456789012"),
        ).toBe(
            "joplin://x-callback-url/openNote?id=12345678901234567890123456789012",
        );

        expect(
            joplinkLink.decode("/j/t/12345678901234567890123456789012"),
        ).toBe(
            "joplin://x-callback-url/openTag?id=12345678901234567890123456789012",
        );

        expect(
            joplinkLink.decode("/j/f/12345678901234567890123456789012"),
        ).toBe(
            "joplin://x-callback-url/openFolder?id=12345678901234567890123456789012",
        );

        // ID is not 32 characters long
        expect(joplinkLink.decode("/j/f/123456789012345678901234567")).toBe(
            null,
        );
    });

    it("encode", () => {
        const joplinLink = new JoplinLink();

        expect(
            joplinLink.encode(
                "joplin://x-callback-url/openNote?id=12345678901234567890123456789012",
            ),
        ).toBe("/j/n/12345678901234567890123456789012");

        expect(
            joplinLink.encode(
                "joplin://x-callback-url/openTag?id=12345678901234567890123456789012",
            ),
        ).toBe("/j/t/12345678901234567890123456789012");

        expect(
            joplinLink.encode(
                "joplin://x-callback-url/openFolder?id=12345678901234567890123456789012",
            ),
        ).toBe("/j/f/12345678901234567890123456789012");

        expect(joplinLink.encode("https://example.com")).toBe(null);
    });
});
