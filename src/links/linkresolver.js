import { JoplinLink } from "./joplinlink";
import { UniversalLink } from "./universallink";

const types = [new JoplinLink(), new UniversalLink()];

export class LinkResolver {
    decode(prefix, url) {
        const path = url.pathname.replace(new RegExp(`^${prefix}`), "");

        const type = types.find((type) => {
            return type.isEncodedPath(path);
        });

        if (type === undefined) {
            return undefined;
        }

        //@todo - validate the link
        return type.decodePath(path);
    }

    encode(prefix, link) {
        const type = types.find((type) => {
            return type.canEncodeLink(link);
        });

        if (type === undefined) {
            return undefined;
        }

        return [prefix, type.encodeLink(link)].join("");
    }
}
