import React from "react";
import { Content } from "./content";
import { Heading } from "./heading";
import { ActionButton } from "./actionbutton";
import { isValidURL } from "../links/common";
import { WhatIsIt } from "./whatisit";

const ALLOWLIST_KEY = "ianylink_allowlist";
const DISALLOWLIST = ["javascript://"];

function useLocalStorage(key, initialValue) {
    const getLocalStorageValue = React.useCallback(() => {
        const object = localStorage.getItem(key);
        if (object == null) {
            return initialValue;
        }
        try {
            return JSON.parse(object);
        } catch {
            return initialValue;
        }
    }, [key, initialValue]);

    const [value, setValue] = React.useState(() => {
        return getLocalStorageValue();
    });

    const saveValue = React.useCallback(
        (callback) => {
            const newValue = callback(getLocalStorageValue());
            localStorage.setItem(key, JSON.stringify(newValue));
            setValue(newValue);
        },
        [key, getLocalStorageValue],
    );

    return [value, saveValue];
}

export function useRedirectorState(props) {
    const { redirectLink } = props;

    const [allowList, saveAllowList] = useLocalStorage(ALLOWLIST_KEY, {});

    const [isInWhitelist, setIsInWhitelist] = React.useState(false);

    const [isDisallowed, setIsDisallowed] = React.useState(false);

    const isLinkValid = isValidURL(redirectLink);

    const contentType = React.useMemo(() => {
        try {
            const url = new URL(redirectLink);

            if (url.protocol === "http:" || url.protocol === "https:") {
                return `${url.protocol}//${url.hostname}`;
            }
            return url.protocol + "//";
        } catch {
            return "";
        }
    }, [redirectLink]);

    React.useEffect(() => {
        if (DISALLOWLIST.includes(contentType)) {
            setIsInWhitelist(false);
            setIsDisallowed(true);
            return;
        }

        const isInWhitelist = allowList[contentType] === true;
        setIsInWhitelist(isInWhitelist);

        if (isInWhitelist) {
            window.open(redirectLink, "_self");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onProceedClick = React.useCallback(() => {
        window.open(redirectLink, "_self");
    }, [redirectLink]);

    const onAlwaysShowClick = React.useCallback(
        (event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsInWhitelist((value) => {
                saveAllowList((allowList) => {
                    allowList[contentType] = !value;
                    return allowList;
                });
                return !value;
            });
        },
        [contentType, saveAllowList],
    );

    const onCloseClick = React.useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        window.close();
    }, []);

    return React.useMemo(() => {
        return {
            redirectLink,
            onProceedClick,
            contentType,
            isInWhitelist,
            onAlwaysShowClick,
            onCloseClick,
            isDisallowed,
            isLinkValid,
        };
    }, [
        redirectLink,
        contentType,
        isInWhitelist,
        onProceedClick,
        onAlwaysShowClick,
        onCloseClick,
        isDisallowed,
        isLinkValid,
    ]);
}

export function Banner(props) {
    const { heading, redirectLink, onCloseClick } = props;

    return (
        <Content>
            <div className="flex flex-col gap-4 mt-2">
                <Heading>{heading}</Heading>
                <div className="underline bg-[#f6f8fa] p-2 rounded border border-[#D0D6DE] break-all line-through">
                    {redirectLink}
                </div>
                <div className="flex flex-row justify-between mt-8">
                    <button
                        className="border px-4 py-1 rounded bg-[#f6f8fa] hover:opacity-70 active:opacity-50"
                        onClick={onCloseClick}
                    >
                        Close
                    </button>
                </div>
            </div>
        </Content>
    );
}

export function RedirectorImpl(props) {
    const {
        redirectLink,
        contentType,
        onProceedClick,
        isInWhitelist,
        onAlwaysShowClick,
        onCloseClick,
        isDisallowed,
        isLinkValid,
    } = props;

    if (!isLinkValid) {
        return (
            <Banner
                heading={`Invalid link detected.`}
                redirectLink={redirectLink}
                onCloseClick={onCloseClick}
            />
        );
    }

    if (isDisallowed) {
        return (
            <Banner
                heading={`${contentType} is forbidden`}
                redirectLink={redirectLink}
                onCloseClick={onCloseClick}
            />
        );
    }

    return (
        <Content>
            <div className="flex flew-row justify-between">
                <Heading>You are being redirected to</Heading>
                <WhatIsIt />
            </div>
            <div className="flex flex-col gap-4 mt-2">
                <div className="underline bg-[#f6f8fa] p-2 rounded border border-[#D0D6DE] break-all">
                    <a href={redirectLink}>{redirectLink}</a>
                </div>
                <div className="flex flex-row gap-2">
                    {isInWhitelist ? (
                        <input
                            type="checkbox"
                            defaultChecked
                            readOnly
                            onClick={onAlwaysShowClick}
                            key={1}
                        />
                    ) : (
                        <input
                            type="checkbox"
                            readOnly
                            onClick={onAlwaysShowClick}
                            key={2}
                        />
                    )}
                    <div className="select-none" onClick={onAlwaysShowClick}>
                        Auto open {contentType}
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between mt-8">
                <button
                    className="border px-4 py-1 rounded bg-[#f6f8fa] hover:opacity-70 active:opacity-50"
                    onClick={onCloseClick}
                >
                    Close
                </button>
                <ActionButton
                    className="hover:opacity-70 active:opacity-50 text-[#0969DA]"
                    onClick={onProceedClick}
                >
                    Open
                </ActionButton>
            </div>
        </Content>
    );
}

export function Redirector(props) {
    const states = useRedirectorState(props);
    return <RedirectorImpl {...states} />;
}
