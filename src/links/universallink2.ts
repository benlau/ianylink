/** Universal Unicode Link V2
 *
 * Encoded link format: /v/${schema}/${url_remove_schema}
 */

import { DecodedLink } from "./types";

export class UniversalLink2 {
    constructor() {}

    encodeLink(link: string): string | undefined {
        try {
            const url = new URL(link);
            const schema = url.protocol.replace(":", "");

            if (schema === "javascript") {
                return;
            }

            const rest = link.slice(url.protocol.length);

            return `/v/${schema}/${rest}`;
        } catch {
            return;
        }
    }

    decodePath(path: string): DecodedLink | undefined {
        try {
            const prefix = "/v/";
            if (!path.startsWith(prefix)) {
                return;
            }
            const encodedPath = path.slice(prefix.length);
            const schema = encodedPath.split("/")[0];
            if (schema === "javascript") {
                return;
            }
            const rest = encodedPath.slice(schema.length + 1);

            const url = `${schema}:${rest}`;
            new URL(url); // throws error if invalid
            return { url };
        } catch {
            return;
        }
    }

    isEncodedPath(path: string) {
        return this.decodePath(path) != null;
    }

    canEncodeLink(link: string) {
        return this.encodeLink(link) != null;
    }
}
