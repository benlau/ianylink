import React from "react";

export function Content(props) {
    const { children } = props;

    return (
        <div className="flex flex-row w-full p-8 justify-center">
            <div className="flex flex-col w-[600px] gap-2 rounded border border-[#858F99] p-4">
                {children}
            </div>
        </div>
    );
}
