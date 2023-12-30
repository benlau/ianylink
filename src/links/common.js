export const LinkType = {
    Joplin: "joplin",
    Universal: "universal",
};

Object.freeze(LinkType);

export function toBase64Url(text) {
    return text.replace(/\+/g, "-").replace(/\//g, "_");
}

export function fromBase64Url(text) {
    return text.replace(/_/g, "/");
}

export function isValidURL(text) {
    try {
        new URL(text);
        return true;
    } catch {
        return false;
    }
}

export function buildURL(protocol, host, path, hash, search) {
    const parts = [host, path, hash, search];

    return `${protocol}://${parts.filter(Boolean).join("")}`;
}
