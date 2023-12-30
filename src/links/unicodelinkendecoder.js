import { fromBase64Url, toBase64Url } from "./common.js";

export class UnicodeLinkEndecoder {
    constructor() {}

    encode(link) {
        const bytes = new TextEncoder().encode(link);

        return toBase64Url(btoa(String.fromCodePoint(...bytes)));
    }

    decode(encoded) {
        const bytes = atob(fromBase64Url(encoded));
        const buffer = Uint8Array.from(bytes, (m) => m.codePointAt(0));
        return new TextDecoder().decode(buffer);
    }
}
