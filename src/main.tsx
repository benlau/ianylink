import { LinkResolver } from "./links/linkresolver";
import React from "react";
import { Kifier } from "./views/kifier";
import { AppConfig } from "./appconfig";
import { Redirector } from "./views/redirector";
import { createRoot } from "react-dom/client";

const linkResolver = new LinkResolver();
const uriPrefix = AppConfig.uriPrefix;

const url = new URL(decodeURI(window.location.href));
let redirectLink = linkResolver.decode(uriPrefix, url);

if (redirectLink != null) {
    redirectLink = decodeURI(redirectLink);
}

const domNode = document.getElementById("root");
const root = createRoot(domNode);

if (redirectLink !== undefined) {
    root.render(<Redirector redirectLink={redirectLink} />);
} else {
    root.render(<Kifier />);
}
