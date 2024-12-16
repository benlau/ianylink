import React from "react";

export function ActionButton(props) {
    const { children, onClick } = props;

    const onClickHandler = React.useCallback(
        (event) => {
            event.preventDefault();
            event.stopPropagation();
            onClick?.(event);
        },
        [onClick],
    );

    return (
        <button
            onClick={onClickHandler}
            className="hover:opacity-70 active:opacity-50 text-[#0969DA]"
        >
            {children}
        </button>
    );
}
