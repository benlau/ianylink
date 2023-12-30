import React from 'react';
import cn from 'classnames';

export function Heading(props) {
    const {
        className,
        children
    } = props;

    const classes = cn("text-lg font-bold text-[#1F2937]", className)

    return (
        <div className={classes}>
            {children}
        </div>
    )

}