import { LinkResolver } from "./links/linkresolver";
import React from "react";
import { Kifier } from "./views/kifier";
import { AppConfig } from "./appconfig";
import { Redirector } from "./views/redirector";
import { createRoot } from "react-dom/client";

const linkResolver = new LinkResolver();
const uriPrefix = AppConfig.uriPrefix;

const url = new URL(window.location.href);
const redirectLink = linkResolver.resolve(uriPrefix, url);

const domNode = document.getElementById("root");
const root = createRoot(domNode);

if (redirectLink !== undefined) {
    root.render(<Redirector redirectLink={redirectLink} />);
} else {
    root.render(<Kifier />);
}
