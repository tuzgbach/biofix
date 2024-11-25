'use client'
import React, { useState } from 'react'
import { useInfo } from '@/context/InfoContext'
import { useMessage } from '@/context/MessageContext'
import customerApi from '@/http/customerApi'
import { Locale } from '@/i18n'
import { Button, Checkbox, Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import propTypes from 'prop-types'
import { useRouter } from '@/navigation'

const initialValues = {
    name: '',
    email: '',
    phone: '',
    company: '',
}

const Fromdangki = () => {
    const t = useTranslations()
    const locale = useLocale() as Locale
    const router = useRouter()
    const [form] = Form.useForm()
    const {
        info: { brands, images },
    } = useInfo()
    const [loadingButton, setLoadingButton] = useState(false)
    const { loading, success, error } = useMessage()

    const onFinish = async (values: any) => {
        const newData = {
            ...values,
            content: `Đơn vị công tác: ${values.company}`,
            address: values.company,
        }
        delete newData.company

        setLoadingButton(true)
        loading('Đang gửi...')
        try {
            const res = await customerApi.register(newData)
            success(t('contact.success'))
            router.push('/')
        } catch (e) {
            error(t('contact.error'))
        }

        setLoadingButton(false)
    }

    return (
        <div className="container mx-auto mt-[5rem] md:mb-[5rem] mb-0 p-4 bg-white shadow-lg rounded-lg max-w-md">
            <div className="header text-center mb-4">
                <p className="text-2xl font-bold text-cyan-600 mb-4 mt-2">Liên hệ hợp tác</p>
                <div className="header-image relative rounded-lg overflow-hidden mb-4">
                    <Image
                        src={images?.[1]}
                        className="absolute inset-0 w-full h-full object-cover transition-transform transform hover:scale-105"
                        alt="Contact"
                        width={500}
                        height={500}
                    />
                    <div className="overlay absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>
                    <span className="absolute top-0 mt-4 ml-2 text-white text-base font-semibold">
                        {brands?.[0]?.slogan[locale]}
                    </span>
                </div>
            </div>
            <Form
                form={form}
                onFinish={onFinish}
                initialValues={initialValues}
                layout="vertical"
                className="text-gray-700 p-2"
            >
                <div className="grid grid-cols-1 gap-2">
                    <Form.Item
                        label={t('contact.name')}
                        name="name"
                        rules={[
                            {
                                required: true,
                                validator: (_, value) => {
                                    if (!value) {
                                        const name = t('contact.name')
                                        return Promise.reject(
                                            new Error(t('admin.info.isRequire', { name }))
                                        )
                                    } else {
                                        return Promise.resolve()
                                    }
                                },
                            },
                        ]}
                    >
                        <Input size="small" />
                    </Form.Item>
                    <Form.Item
                        label={t('contact.phone')}
                        name="phone"
                        rules={[
                            {
                                required: true,
                                validator: (_, value) => {
                                    if (!value) {
                                        const name = t('contact.phone')
                                        return Promise.reject(
                                            new Error(t('admin.info.isRequire', { name }))
                                        )
                                    } else if (value) {
                                        return Promise.resolve()
                                    }
                                },
                            },
                            {
                                pattern: /^0\d{8,11}$/,
                                message: t('contact.error.phoneValid'),
                            },
                        ]}
                    >
                        <Input type="number" size="small" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                validator: (_, value) => {
                                    if (!value) {
                                        return Promise.reject(
                                            new Error(t('admin.info.isRequire', { name: 'email' }))
                                        )
                                    } else {
                                        return Promise.resolve()
                                    }
                                },
                            },
                            { type: 'email', message: t('contact.error.emailValid') },
                        ]}
                    >
                        <Input size="small" />
                    </Form.Item>
                    <Form.Item label={t('contact.company')} name="company">
                        <TextArea rows={3} />
                    </Form.Item>
                </div>
                <Form.Item className="text-center">
                    <Checkbox defaultChecked className="text-sm text-gray-500 mb-4">
                        Tôi đồng ý nhận thông tin mới nhất từ BIOFIXFRESH Vietnam.
                    </Checkbox>
                </Form.Item>
                <Form.Item className="text-center">
                    <Button
                        type="primary"
                        loading={loadingButton}
                        onClick={form.submit}
                        size="large"
                        style={{
                            backgroundColor: '#1890ff',
                            borderColor: '#1890ff',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            borderRadius: '20px',
                            padding: '10px 24px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        }}
                    >
                        Gửi
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

Fromdangki.propTypes = {
    open: propTypes.bool,
    onCancel: propTypes.func,
}

export default Fromdangki
