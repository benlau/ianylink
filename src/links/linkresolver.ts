import { JoplinLink } from "./joplinlink";
import { UniversalLink } from "./universallink";
import { UniversalLink2 } from "./universallink2";

const types = [new JoplinLink(), new UniversalLink2(), new UniversalLink()];

export class LinkResolver {
    decode(prefix: string, url: URL) {
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

    encode(prefix: string, link: string) {
        const type = types.find((type) => {
            return type.canEncodeLink(link);
        });

        if (type === undefined) {
            return undefined;
        }

        return [prefix, type.encodeLink(link)].join("");
    }
}
