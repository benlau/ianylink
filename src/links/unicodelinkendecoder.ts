import { fromBase64Url, toBase64Url } from "./common";

export class UnicodeLinkEndecoder {
    constructor() {}

    encode(link: string) {
        const bytes = new TextEncoder().encode(link);

        return toBase64Url(btoa(String.fromCodePoint(...bytes)));
    }

    decode(encoded: string) {
        const bytes = atob(fromBase64Url(encoded));
        const buffer = Uint8Array.from(bytes, (m) => m.codePointAt(0) ?? 0);
        return new TextDecoder().decode(buffer);
    }
}
