'use client'

import { useEffect } from 'react'
import initFaceBookSDK from './initFaceBookSDK'

const FanPage = () => {
    useEffect(() => {
        initFaceBookSDK()
    }, [])

    return (
        <div
            className="fb-page"
            style={{
                borderRadius: '10px',
                padding: '8px', // Increased padding
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f9ff'
                e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            data-href="https://www.facebook.com/BiofixFresh"
            data-tabs="timeline"
            data-width=""
            data-height=""
            data-small-header="false"
            data-adapt-container-width="false"
            data-hide-cover="false"
            data-show-facepile="true"
        >
            <blockquote
                cite="https://www.facebook.com/BiofixFresh"
                className="fb-xfbml-parse-ignore"
            >
                <a href="https://www.facebook.com/BiofixFresh">Facebook</a>
            </blockquote>
        </div>
    )
}
export default FanPage
