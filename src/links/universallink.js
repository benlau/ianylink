import { UnicodeLinkEndecoder } from "./unicodelinkendecoder.js";

const ENCODED_LINK_REGEX = /^\/u\/(?<encoded>[A-Za-z0-9_\-=]+)/;
const URI_PREFIX = "/u";

/** Universal Unicode Link
 *
 * Encoded link format: /u/${based64_unicode_encoded}
 */

export class UniversalLink {
    constructor() {
        this.endecoder = new UnicodeLinkEndecoder();
    }

    encodeLink(link) {
        return URI_PREFIX + "/" + this.endecoder.encode(link);
    }

    decodePath(path) {
        const found = path.match(ENCODED_LINK_REGEX);
        if (found === null) {
            return;
        }
        const base64 = found.groups.encoded
            .replace(/-/g, "+")
            .replace(/_/g, "/");
        const decoded = this.endecoder.decode(base64).trim();
        return decoded;
    }

    isEncodedPath(path) {
        const found = path.match(ENCODED_LINK_REGEX);
        // check is base64
        return found != null && found.groups.encoded != null;
    }

    canEncodeLink(link) {
        return this.isValidateLink(link);
    }

    isValidateLink(link) {
        //@TODO - test case
        // mailto: xxx
        // javascript: ?
        try {
            new URL(link);
            return true;
        } catch (err) {
            return false;
        }
    }
}
