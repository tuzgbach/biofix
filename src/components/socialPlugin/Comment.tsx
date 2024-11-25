'use client'

import { useEffect } from 'react'
import initFaceBookSDK from './initFaceBookSDK'
const Comment = ({
    dataHref,
    width = '100%',
    numposts = 5,
    ...rest
}: {
    dataHref: string
    width?: string | number
    numposts?: number
}) => {
    useEffect(() => {
        initFaceBookSDK()
    }, [])

    return (
        <>
            <div
                {...rest}
                className="fb-comments z-10"
                data-href={dataHref}
                data-width={width}
                data-numposts={numposts}
            ></div>
        </>
    )
}

export default Comment
