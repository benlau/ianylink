/** Joplin Link
 *
 *
 * joplin://x-callback-url/openNote?id=<note id> for note
 * joplin://x-callback-url/openFolder?id=<folder id> for folder
 * joplin://x-callback-url/openTag?id=<tag id> for tag
 */

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

    encode(link) {
        const found = link.match(ENCODE_LINK_REGEX);
        if (found == null) {
            return null;
        }
        const id = found.groups.id;
        const action = JoplinActionMappingFromLongToShort[found.groups.action];
        return `${URI_PREFIX}/${action}/${id}`;
    }

    decode(link) {
        const found = link.match(DECODED_LINK_REGEX);
        if (found == null) {
            return null;
        }
        const id = found.groups.id;
        const action = JoplinActionMappingFromShortToLong[found.groups.action];
        return `joplin://x-callback-url/open${action}?id=${id}`;
    }

    isValidateLink(link) {
        //@TODO - test case
        // mailto: xxx
        // javascript: ?
        // Send to trello
        try {
            new URL(link);
            return true;
        } catch (err) {
            return false;
        }
    }
}
