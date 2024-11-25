import { useCategory } from '@/context/CategoryContext'
import { useInfo } from '@/context/InfoContext'
import { useMessage } from '@/context/MessageContext'
import customerApi from '@/http/customerApi'
import { Locale } from '@/i18n'
import { processCatesUseInAntd } from '@/utils'
import { CustomerDemand, District } from '@/utils/constants'
import { Button, Checkbox, Form, Input, Modal, Select, TreeSelect } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import propTypes from 'prop-types'
import { useState } from 'react'
import districts from '../../../public/address/district.json'
import province from '../../../public/address/province.json'
import './ModalContact.css'

const initialValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
    province: null,
    district: null,
    content: '',
    categoryId: '',
    demand: '',
}

type Props = {
    open: boolean
    onCancel: () => void
}

const ModalContact = ({ open = false, onCancel }: Props) => {
    const t = useTranslations()
    const locale = useLocale() as Locale
    const [form] = Form.useForm()
    const {
        info: { brands, images },
    } = useInfo()
    const { categories } = useCategory()
    const [keyDistrict, setKeyDistrict] = useState<keyof District | null>(null)
    const [loadingButton, setLoadingButton] = useState(false)
    const { loading, success, error } = useMessage()

    const onFinish = async (values: any) => {
        const newData = { ...values, address: `${values.province}, ${values.district}` }
        setLoadingButton(true)
        loading('Đang gửi...')
        await customerApi
            .register(newData)
            .catch((err) => {
                error(t('contact.error'))
            })
            .then(() => {
                success(t('contact.success'))
                setLoadingButton(false)
                onCancel()
            })
            .finally(() => setLoadingButton(false))
    }

    return (
        <>
            <Modal
                open={open}
                onCancel={onCancel}
                title={
                    <>
                        <p className="text-3xl font-bold text-cyan-600 mb-8 mt-2">
                            Liên hệ hợp tác
                        </p>
                        <div className="header-image relative rounded-lg overflow-hidden mb-4">
                            <Image
                                src={images?.[1]}
                                className="absolute inset-0 w-full h-full object-cover transition-transform transform hover:scale-105"
                                alt="Contact"
                                width={500}
                                height={500}
                            />
                            <div className="overlay absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>
                            <span className="absolute top-0 mt-6 ml-4 text-white text-lg font-semibold">
                                {brands?.[0]?.slogan[locale]}
                            </span>
                        </div>
                    </>
                }
                footer={[
                    <div key={'1'}>
                        <Checkbox
                            defaultChecked
                            className="text-sm text-gray-500 mb-4 text-wrap flex justify-center"
                        >
                            Tôi đồng ý nhận thông tin mới nhất từ BIOFIXFRESH Vietnam.
                        </Checkbox>
                        <div className="flex justify-center space-x-4">
                            <Button onClick={onCancel} className="btn-cancel">
                                Hủy
                            </Button>
                            {/* <Form.Item> */}
                            <Button
                                type="primary"
                                loading={loadingButton}
                                // htmlType="submit"
                                className="btn-submit"
                                onClick={form.submit}
                            >
                                Gửi
                            </Button>
                            {/* </Form.Item> */}
                        </div>
                    </div>,
                ]}
                height={'100vh'}
                className="top-0 md:!w-[50vw] !w-[100vh]"
                classNames={{
                    wrapper: 'h-[100vh] w-[50wv] mx-auto ',
                    content: 'h-[100vh] flex flex-col ',
                    body: 'flex-1 overflow-y-scroll',
                    header: 'flex-none',
                    footer: 'flex-none',
                }}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    initialValues={initialValues}
                    layout="vertical"
                    className="text-gray-700 h-full"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            label={t('contact.demand')}
                            name="demand"
                            rules={[
                                {
                                    required: true,
                                    validator: (_, value) => {
                                        if (!value) {
                                            const name = t('contact.demand')

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
                            <Select
                                options={Object.keys(CustomerDemand).map((key) => ({
                                    key,
                                    label: CustomerDemand[key as keyof typeof CustomerDemand].name[
                                        locale
                                    ],
                                    value: key,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item
                            label={t('contact.category')}
                            name="categoryId"
                            rules={[
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            const name = t('contact.category')
                                            return Promise.reject(
                                                new Error(t('admin.info.isRequire', { name }))
                                            )
                                        } else {
                                            return Promise.resolve()
                                        }
                                    },
                                    required: true,
                                },
                            ]}
                        >
                            <TreeSelect
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                treeData={processCatesUseInAntd(categories, locale)}
                                placeholder="Category"
                                treeDefaultExpandAll
                            />
                        </Form.Item>
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
                            className="col-span-2"
                        >
                            <Input />
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
                                        }
                                        return Promise.resolve()
                                    },
                                },
                                {
                                    pattern: /^0\d{8,11}$/,
                                    message: t('contact.error.phoneValid'),
                                },
                            ]}
                        >
                            <Input type="number" />
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
                                                new Error(
                                                    t('admin.info.isRequire', { name: 'email' })
                                                )
                                            )
                                        } else {
                                            return Promise.resolve()
                                        }
                                    },
                                },
                                { type: 'email', message: t('contact.error.emailValid') },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={t('contact.province')}
                            name="province"
                            rules={[
                                {
                                    required: true,
                                    validator: (_, value) => {
                                        if (!value) {
                                            const name = t('contact.province')
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
                            <Select
                                showSearch
                                options={province}
                                onChange={(_, options) => {
                                    if (!Array.isArray(options)) {
                                        setKeyDistrict(options.key as keyof District)
                                        form.setFieldValue('district', null)
                                    }
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Quận huyện"
                            name="district"
                            tooltip={!form.getFieldValue('province') && 'chọn tỉnh thành trước'}
                        >
                            <Select
                                showSearch
                                disabled={!form.getFieldValue('province')}
                                options={districts[keyDistrict as keyof typeof districts]}
                            />
                        </Form.Item>
                        <Form.Item
                            label={t('contact.content')}
                            name="content"
                            className="col-span-2"
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

ModalContact.propTypes = {
    open: propTypes.bool,
    onCancel: propTypes.func,
}

export default ModalContact
