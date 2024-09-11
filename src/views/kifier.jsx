import React from "react";
import copy from "copy-to-clipboard";
import { AppConfig } from "../appconfig";
import { isValidURL, buildURL } from "../links/common";
import cntl from "cntl";
import { Content } from "./content";
import { Heading } from "./heading";
import { ActionButton } from "./actionbutton";
import { WhatIsIt } from "./whatisit";
import { LinkResolver } from "../links/linkresolver";

const linkResolver = new LinkResolver();

const InfoType = {
    InvalidURL: "InvalidURL",
    JavaScriptNotAllowed: "JavaScriptNotAllowed",
    FileURL: "FileURL",
};

const ERRORS = {
    [InfoType.InvalidURL]: "Your app link is not valid",
    [InfoType.JavaScriptNotAllowed]:
        "Embed JavaScript in the link is forbidden",
};

const ERROR_TEXT_LENGTH_THRESHOLD = 10;

function InlineButton(props) {
    const { children, onClick, isDisabled } = props;
    const buttonClasses = cntl`
        border-l-[#D0D6DE] 
        border-l-[1px] 
        p-1 
        min-w-[70px] 
        flex 
        justify-center 
        cursor-pointer 
        hover:bg-[#E4E6EB] 
        active:opacity-50 
        select-none
        disabled:opacity-30
        disabled:hover:bg-transparent
    `;

    return (
        <button
            onClick={onClick}
            className={buttonClasses}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
}

export function useKifierState() {
    const [inputLink, setInputLink] = React.useState("");
    const [convertedLink, setConvertedLink] = React.useState("");
    const [info, setInfo] = React.useState(undefined);
    const inputLinkRef = React.useRef(null);
    const onInputLinkChange = React.useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        setInputLink(event.target.value.replace(/(\r\n|\r|\n)/g, ""));
    }, []);
    const [isCopiedVisible, setIsCopiedVisible] = React.useState(false);

    const validateLink = React.useCallback(() => {
        const inputLinkTrimmed = inputLink.trim();
        if (inputLinkTrimmed === "") {
            setConvertedLink("");
            setInfo();
            return;
        }

        if (isValidURL(inputLinkTrimmed) === false) {
            if (inputLink.length > ERROR_TEXT_LENGTH_THRESHOLD) {
                setInfo(InfoType.InvalidURL);
            } else {
                setInfo();
            }
            setConvertedLink("");
            return;
        }

        if (inputLinkTrimmed.startsWith("javascript:")) {
            setInfo(InfoType.JavaScriptNotAllowed);
            setConvertedLink("");
            return;
        }

        try {
            setConvertedLink(
                linkResolver.encode(
                    [AppConfig.host, AppConfig.uriPrefix].join(""),
                    inputLinkTrimmed,
                ),
            );
            setInfo();
        } catch (e) {
            console.error({ e });
            setConvertedLink("");
            return;
        }

        try {
            const url = new URL(inputLinkTrimmed);
            if (url.protocol === "file:") {
                setInfo(InfoType.FileURL);
            }
        } catch {
            // ignore
        }
    }, [inputLink]);

    React.useEffect(() => {
        validateLink();
    }, [validateLink]);

    const copyRedirectLink = React.useCallback(() => {
        if (convertedLink.trim() === "") {
            return;
        }
        copy(convertedLink);
        setIsCopiedVisible(true);
        setTimeout(() => {
            setIsCopiedVisible(false);
        }, 1000);
    }, [convertedLink]);

    const onCopyClick = React.useCallback(
        (event) => {
            event.preventDefault();
            event.stopPropagation();
            copyRedirectLink();
        },
        [copyRedirectLink],
    );

    const onTestClick = React.useCallback(
        (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (convertedLink.trim() === "") {
                return;
            }
            window.open(convertedLink, "_blank");
        },
        [convertedLink],
    );

    const convertToVSCode = React.useCallback(() => {
        try {
            const url = new URL(inputLink);
            setInputLink(
                buildURL("vscode", "file", url.pathname, url.hash, url.search),
            );
        } catch {
            // ignore
        }
    }, [inputLink]);

    return React.useMemo(() => {
        return {
            inputLink,
            convertedLink,
            info,
            inputLinkRef,
            onInputLinkChange,
            onCopyClick,
            onTestClick,
            isCopiedVisible,
            copyRedirectLink,
            convertToVSCode,
        };
    }, [
        inputLink,
        convertedLink,
        info,
        inputLinkRef,
        onInputLinkChange,
        onCopyClick,
        onTestClick,
        isCopiedVisible,
        copyRedirectLink,
        convertToVSCode,
    ]);
}

export function KifierImpl(props) {
    const {
        inputLink,
        convertedLink,
        info,
        inputLinkRef,
        onInputLinkChange,
        onCopyClick,
        onTestClick,
        isCopiedVisible,
        copyRedirectLink,
        convertToVSCode,
    } = props;

    const inputClasses = cntl`
        border border-[#D0D6DE] bg-[#f6f8fa] rounded p-1
        w-full resize-none
    `;

    const onKeyPress = React.useCallback(
        (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                event.stopPropagation();
                copyRedirectLink();
            }
        },
        [copyRedirectLink],
    );

    const infoViewClasses = cntl`
        text-gray-500
        h-11
        p-2
        ${!info && "invisible"}
    `;

    return (
        <Content>
            <div>
                <div className="flex flex-row justify-between items-center mb-2">
                    <Heading>App Link</Heading>
                    <WhatIsIt />
                </div>
                <textarea
                    ref={inputLinkRef}
                    className={inputClasses}
                    rows="5"
                    onChange={onInputLinkChange}
                    value={inputLink}
                    onKeyDown={onKeyPress}
                    placeholder="Put your app link here"
                ></textarea>
                <div className={infoViewClasses}>
                    {info === InfoType.FileURL ? (
                        <div>
                            File link is not working. Try vscode:// ?{" "}
                            <ActionButton onClick={convertToVSCode}>
                                Yes
                            </ActionButton>
                        </div>
                    ) : info !== undefined ? (
                        <div>{ERRORS[info]}</div>
                    ) : null}
                </div>
            </div>
            <Heading>Converted Web Link</Heading>
            <div className="border bg-[#f6f8fa] border-[#D0D6DE] rounded flex flex-row justify-between items-center">
                <div className="p-1 truncate">{convertedLink}</div>
                <div className="flex flex-row">
                    <InlineButton
                        onClick={onTestClick}
                        isDisabled={convertedLink.trim() === ""}
                    >
                        Test
                    </InlineButton>
                    <InlineButton
                        onClick={onCopyClick}
                        isDisabled={convertedLink.trim() === ""}
                    >
                        {isCopiedVisible ? "Copied" : "Copy"}
                    </InlineButton>
                </div>
            </div>
        </Content>
    );
}

export function Kifier() {
    const states = useKifierState();
    return <KifierImpl {...states} />;
}
