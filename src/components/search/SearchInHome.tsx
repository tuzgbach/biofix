import { Listbox, ListboxItem, Spinner, User } from '@nextui-org/react'
import { MutableRefObject, memo, useEffect, useRef, useState } from 'react'

import { FaRegNewspaper } from 'react-icons/fa'

import clsx from 'clsx'

import useDebounce from '@/hooks/useDebounce'
import { News } from '@/http/newsApi'
import { Product } from '@/http/productApi'
import searchApi from '@/http/searchApi'
import { Locale } from '@/i18n'
import { SearchOutlined } from '@ant-design/icons'
import { useLocale, useTranslations } from 'next-intl'
import { LinkLocale } from '../LinkLocale'
import { processNewsUrl, processProductsUrl } from '@/utils'

const SearchInHome = ({ ...rest }) => {
    const ref: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null)
    const t = useTranslations()
    const locale = useLocale() as Locale
    const [search, setSearch] = useState('')
    const keySearch = useDebounce({ value: search, delay: 500 })
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [resultProducts, setResultProducts] = useState<Product[]>([])
    const [resultNews, setResultNews] = useState<News[]>([])
    const [showInitialMessage, setShowInitialMessage] = useState(false)

    useEffect(() => {
        if (!keySearch.trim()) {
            setResultProducts([])
            setResultNews([])
            setShow(false)
            return
        }

        const fetchAPI = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await searchApi.search({ keySearch })

                const { news, products } = res

                news.content && setResultNews(processNewsUrl(news.content as News[]))
                products.content &&
                    setResultProducts(processProductsUrl(products.content as Product[]))

                if (resultProducts.length > 0 || resultNews.length > 0) {
                    setShow(true)
                }
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchAPI()
    }, [keySearch])

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShow(false)
            }
        }

        const handleMouseDown = (event: any) => {
            handleClickOutside(event)
        }

        if (ref.current) {
            document.addEventListener('mousedown', handleMouseDown)
        }

        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [ref])

    rest.className = `${rest.className || ''} relative flex items-center`

    return (
        <div {...rest} ref={ref}>
            <div
                className={clsx(
                    'flex items-center border-1 border-gray-500 rounded-full transition-all duration-300 ease-in-out relative',
                    show ? 'px-4 py-1' : 'px-1 py-1'
                )}
            >
                <div className="relative">
                    <SearchOutlined
                        className="rounded-full p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-200 text-sm md:text-xl"
                        onClick={() => {
                            setShow(!show)
                            setShowInitialMessage(true)
                        }}
                    />
                    {show && (
                        <span className="absolute top-0 left-0 h-full w-full bg-gray-200 rounded-full animate-ping"></span>
                    )}
                </div>
                <input
                    className={clsx(
                        'outline-none transition-all duration-500 ease-in-out',
                        show ? 'w-full bg-white pl-4' : 'w-0'
                    )}
                    placeholder={t('common.search')}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value || '')
                        setShowInitialMessage(false)
                    }}
                />
                {loading && (
                    <Spinner
                        size="lg"
                        className="absolute right-0 top-1/2 transform -translate-y-1/2"
                    />
                )}
            </div>

            <div
                className={clsx(
                    'absolute top-full right-0 md:right-5 max-h-[500px] z-50 overflow-y-auto bg-white shadow-lg rounded-b-md md:w-[60vw] w-[80vw] lg:w-[40vw] transition-all duration-500 ease-in-out transform',
                    show ? 'opacity-100 scale-100' : 'opacity-0 scale-95 invisible'
                )}
                style={{ top: '100%' }}
            >
                {error ? (
                    <div className="p-4 text-red-500">Error: {error}</div>
                ) : keySearch &&
                  resultNews.length === 0 &&
                  resultProducts.length === 0 &&
                  !loading ? (
                    <div
                        className="p-4 text-gray-500"
                        style={{
                            backgroundColor: 'white',
                            textAlign: 'start',
                            fontSize: '15px',
                            fontWeight: '100',
                            fontFamily: 'Arial, sans-serif',
                        }}
                    >
                        {`Không tìm thấy kết quả cho "${keySearch}". Vui lòng thử lại với từ khóa khác.`}
                    </div>
                ) : (
                    <div>
                        {resultNews && resultNews.length > 0 && (
                            <div className="mb-4">
                                <div className="bg-[#F1F3F4] w-full flex items-center justify-between px-2 mt-2">
                                    <div className="flex items-center space-x-2">
                                        <FaRegNewspaper />
                                        <span className="text-black font-roboto text-2sm">
                                            Các bài viết ({resultNews.length})
                                        </span>
                                    </div>
                                    <LinkLocale
                                        href={`/news?keySearch=${keySearch}`}
                                        className="text-xs"
                                    >
                                        Xem tất cả
                                    </LinkLocale>
                                </div>
                                <Listbox variant="faded" aria-label="Listbox menu with icons">
                                    {resultNews.slice(0, 6).map((item, index) => (
                                        <ListboxItem key={index} onClick={() => setShow(false)}>
                                            <LinkLocale href={`/${item.slug}`}>
                                                <User
                                                    name={item.name[locale]}
                                                    description={item.description[locale]}
                                                    avatarProps={{
                                                        src: item.thumb,
                                                        alt: item.name[locale],
                                                    }}
                                                />
                                            </LinkLocale>
                                        </ListboxItem>
                                    ))}
                                </Listbox>
                            </div>
                        )}
                        {resultProducts && resultProducts.length > 0 && (
                            <div className="">
                                <div className="bg-[#F1F3F4] w-full flex items-center justify-between px-2 mt-2">
                                    <div className="flex items-center space-x-2">
                                        <FaRegNewspaper />
                                        <span className="text-black font-roboto text-2sm">
                                            Các sản phẩm ({resultProducts.length})
                                        </span>
                                    </div>
                                    <LinkLocale
                                        href={`/product?keySearch=${keySearch}`}
                                        className="text-xs"
                                    >
                                        Xem tất cả
                                    </LinkLocale>
                                </div>
                                <Listbox variant="faded" aria-label="Listbox menu with icons">
                                    {resultProducts.slice(0, 5).map((item, index) => (
                                        <ListboxItem key={index}>
                                            <LinkLocale href={`/product/${item.slug}`}>
                                                <User
                                                    name={item.name[locale]}
                                                    description={item.description[locale]}
                                                    avatarProps={{
                                                        src: item.image,
                                                        alt: item.name[locale],
                                                    }}
                                                />
                                            </LinkLocale>
                                        </ListboxItem>
                                    ))}
                                </Listbox>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default memo(SearchInHome)
