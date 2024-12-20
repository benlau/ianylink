import React from "react";

export type Props = {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function ActionButton(props: Props) {
    const { children, onClick } = props;

    const onClickHandler = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
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
