export const LinkType = {
    Joplin: "joplin",
    Universal: "universal",
} as const;

Object.freeze(LinkType);

export function toBase64Url(text: string): string {
    return text.replace(/\+/g, "-").replace(/\//g, "_");
}

export function fromBase64Url(text: string): string {
    return text.replace(/_/g, "/");
}

export function isValidURL(text: string): boolean {
    try {
        new URL(text);
        return true;
    } catch {
        return false;
    }
}

export function buildURL(
    protocol: string,
    host: string,
    path?: string,
    hash?: string,
    search?: string,
): string {
    const parts = [host, path, hash, search];

    return `${protocol}://${parts.filter(Boolean).join("")}`;
}
