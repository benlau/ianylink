import { UnicodeLinkEndecoder } from "./unicodelinkendecoder.js";

const ENCODED_LINK_REGEX = /^\/u\/(?<encoded>[A-Za-z0-9_\-=]+)/;
const URI_PREFIX = "/u";

/** Universal Unicode Link
 *
 * Encoded link format: /u/${based64_unicode_encoded}
 */

export class UniversalLink {
    private endecoder: UnicodeLinkEndecoder;

    constructor() {
        this.endecoder = new UnicodeLinkEndecoder();
    }

    encodeLink(link: string) {
        return URI_PREFIX + "/" + this.endecoder.encode(link);
    }

    decodePath(path: string) {
        const found = path.match(ENCODED_LINK_REGEX);
        if (found === null || found.groups == null) {
            return;
        }
        const base64 = found.groups.encoded
            .replace(/-/g, "+")
            .replace(/_/g, "/");
        const decoded = this.endecoder.decode(base64).trim();
        return decoded;
    }

    isEncodedPath(path: string) {
        const found = path.match(ENCODED_LINK_REGEX);
        // check is base64
        return found != null && found.groups?.encoded != null;
    }

    canEncodeLink(link: string) {
        return this.isValidateLink(link);
    }

    isValidateLink(link: string) {
        //@TODO - test case
        // mailto: xxx
        // javascript: ?
        try {
            new URL(link);
            return true;
        } catch {
            return false;
        }
    }
}
