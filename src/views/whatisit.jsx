import React from "react";
import { ActionButton } from "./actionbutton";
import { AppConfig } from "../appconfig";

export function WhatIsIt() {
    const getHelp = React.useCallback(() => {
        window.open(AppConfig.helpUrl, "_blank");
    }, []);

    return <ActionButton onClick={getHelp}>What is it?</ActionButton>;
}
