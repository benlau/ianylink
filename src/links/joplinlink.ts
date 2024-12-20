/** Joplin Link
 *
 *
 * joplin://x-callback-url/openNote?id=<note id> for note
 * joplin://x-callback-url/openFolder?id=<folder id> for folder
 * joplin://x-callback-url/openTag?id=<tag id> for tag
 */

import { DecodedLink } from "./types";

const DECODED_LINK_REGEX = /^\/j\/(?<action>[nft])\/(?<id>[A-Za-z0-9]{32})/;
const ENCODE_LINK_REGEX =
    "joplin://x-callback-url/open(?<action>Note|Folder|Tag)?\\?id=(?<id>[A-Za-z0-9]{32})";

const URI_PREFIX = "/j";

const JoplinActionMappingFromLongToShort = {
    Note: "n",
    Folder: "f",
    Tag: "t",
};

const JoplinActionMappingFromShortToLong = {
    n: "Note",
    f: "Folder",
    t: "Tag",
};

export class JoplinLink {
    constructor() {}

    encodeLink(link: string) {
        const found = link.match(ENCODE_LINK_REGEX);
        if (found == null || found.groups == null) {
            return;
        }
        const id = found.groups.id;
        const action =
            JoplinActionMappingFromLongToShort[
                found.groups
                    .action as keyof typeof JoplinActionMappingFromLongToShort
            ];
        return `${URI_PREFIX}/${action}/${id}`;
    }

    decodePath(path: string): DecodedLink | undefined {
        const found = path.match(DECODED_LINK_REGEX);
        if (found == null || found.groups == null) {
            return;
        }
        const id = found.groups?.id;
        const action =
            JoplinActionMappingFromShortToLong[
                found.groups
                    .action as keyof typeof JoplinActionMappingFromShortToLong
            ];
        const url = `joplin://x-callback-url/open${action}?id=${id}`;
        return {
            url,
        };
    }

    isEncodedPath(path: string) {
        return this.decodePath(path) != null;
    }

    canEncodeLink(link: string) {
        return this.encodeLink(link) != null;
    }
}
