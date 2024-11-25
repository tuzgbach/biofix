'use client'

import React from 'react'
import { Button, Result } from 'antd'
import { useRouter } from '@/navigation'
import { ResultStatusType } from 'antd/es/result'

interface ErrorType {
    status: ResultStatusType
    title: string
    subTitle: string
    extra: React.ReactNode
}

interface ErrorPageProps {
    type: '403' | '404' | '500' | 'warning'
    title?: string
    subTitle?: string
    extra?: React.ReactNode
    callBack?: () => void
}

const ErrorPage: React.FC<ErrorPageProps> = ({
    type = '404',
    title,
    subTitle,
    extra,
    callBack,
}) => {
    const router = useRouter()

    const errorType: Record<ErrorPageProps['type'], ErrorType> = {
        '403': {
            status: '403',
            title: '403',
            subTitle: 'Sorry, you are not authorized to access this page.',
            extra: (
                <Button
                    type="primary"
                    onClick={
                        callBack ||
                        function () {
                            router.push('/')
                        }
                    }
                >
                    Back Home
                </Button>
            ),
        },
        '404': {
            status: '404',
            title: '404',
            subTitle: 'Sorry, the page you visited does not exist.',
            extra: (
                <Button
                    type="primary"
                    onClick={
                        callBack ||
                        function () {
                            router.push('/')
                        }
                    }
                >
                    Back Home
                </Button>
            ),
        },
        '500': {
            status: '500',
            title: '500',
            subTitle: 'Sorry, the server is wrong.',
            extra: (
                <Button
                    type="primary"
                    onClick={
                        callBack ||
                        function () {
                            router.push('/')
                        }
                    }
                >
                    Back Home
                </Button>
            ),
        },
        warning: {
            status: 'warning',
            title: 'There are some problems with your operation.',
            subTitle: '',
            extra: <Button type="primary">Go Console</Button>,
        },
    }

    return (
        <Result
            status={errorType[type].status}
            title={title || errorType[type].title}
            subTitle={subTitle || errorType[type].subTitle}
            extra={extra || errorType[type].extra}
        />
    )
}

export default ErrorPage
