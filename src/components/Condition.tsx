import React, { memo, ReactNode } from 'react'

type ShowProps = {
    if: any
    children?: (() => ReactNode) | ReactNode
}

type IfElseProps = {
    if: any
    children?: (() => ReactNode) | ReactNode
    else?: (() => ReactNode) | ReactNode
}

const _Show: React.FC<ShowProps> = ({ if: show, children }) =>
    show ? (typeof children === 'function' ? children() : children) : null

const _IfElse: React.FC<IfElseProps> = ({ if: condition, children, else: fallback }) =>
    condition
        ? typeof children === 'function'
            ? children()
            : children
        : typeof fallback === 'function'
        ? fallback()
        : fallback

const Show = memo(_Show)
const IfElse = memo(_IfElse)

export { Show, IfElse }
