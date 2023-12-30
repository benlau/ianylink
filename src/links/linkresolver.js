import { UniversalLink } from "./universallink";

export class LinkResolver {
    resolve(prefix, url) {
        const path = url.pathname.replace(new RegExp(`^${prefix}`), "");
        const types = [new UniversalLink()];

        const type = types.find((type) => {
            return type.isEncodedPath(path);
        });

        if (type === undefined) {
            return undefined;
        }

        //@todo - validate the link
        return type.decode(path);
    }
}
