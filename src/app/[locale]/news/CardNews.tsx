'use client'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import { FC } from 'react'
// import LikeShare from './LikeShare'
import LikeShare from '@/components/LikeShare'
import { LinkLocale } from '@/components/LinkLocale'
import { Locale } from '@/i18n'
import { useLocale } from 'next-intl'
import { memo } from 'react'
import Image from 'next/image'

interface NewsItem {
    slug: string
    thumb: string
    name: { [key: string]: string }
    description: { [key: string]: string }
    createdAt: string
}

type ComponentProps = {
    item: NewsItem
    type?: CardNewsType
    clampName?: string
    clampDes?: string
}
export type CardNewsType = 'list' | 'table' | 'slider'

const TypeTable: FC<ComponentProps> = ({ item, clampName, clampDes }) => {
    const locale = useLocale() as Locale

    return (
        <Card className="flex flex-col h-full overflow-hidden shadow-lg group ">
            <LinkLocale href={`/${item.slug}`} className="block h-48 overflow-hidden relative">
                <Image
                    alt={item.name[locale]}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    src={item.thumb}
                    width={500}
                    height={500}
                />
                <LikeShare
                    type="col"
                    className="absolute top-2 left-2 transition-all duration-500 ease-in-out group-hover:top-1 group-hover:left-1 z-10"
                    linkShare={process.env.NEXT_PUBLIC_URL + `/${item.slug}`}
                />
            </LinkLocale>
            <CardBody className="flex-grow p-4">
                <h4 className="font-bold text-lg mb-2">{item.name[locale]}</h4>
                <p className="text-sm text-gray-700 flex-grow">{item.description[locale]}</p>
            </CardBody>
            <CardFooter className="px-4 py-2">
                <small className="text-gray-500">{item.createdAt.substring(0, 10)}</small>
            </CardFooter>
        </Card>
    )
}

const TypeList: FC<ComponentProps> = ({ item, clampName, clampDes }) => {
    const locale = useLocale() as Locale
    return (
        <Card
            isBlurred
            className="flex flex-col overflow-hidden shadow-sm bg-background/60 dark:bg-default-100/50 mb-5 border"
        >
            <LinkLocale href={`/${item.slug}`} className="block h-32 overflow-hidden relative">
                <Image
                    alt="Card background"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    src={item.thumb}
                    width={500}
                    height={500}
                />
                <LikeShare
                    type="col"
                    className="absolute bottom-1 left-1 transition-all duration-500 ease-in-out group-hover:bottom-0 group-hover:left-0 z-10"
                    linkShare={process.env.NEXT_PUBLIC_URL + `/${item.slug}`}
                />
            </LinkLocale>
            <CardBody className="flex-grow p-2">
                <p className={`font-medium text-md mb-1 ${clampName}`}>{item.name[locale]}</p>
                <p className={`text-xs text-foreground/100 flex-grow ${clampDes}`}>
                    {item.description[locale]}
                </p>
                <p className="text-end text-xs text-foreground/80">
                    {item.createdAt.substring(0, 10)}
                </p>
            </CardBody>
        </Card>
    )
}

const TypeSlider: FC<ComponentProps> = ({ item, clampName, clampDes }) => {
    const locale = useLocale() as Locale
    return (
        <div className="flex flex-col overflow-hidden shadow-sm bg-background/60 dark:bg-default-100/50 transition-all duration-200 p-3 m-5 rounded-sm border-gray-400 border-e-5">
            <LinkLocale href={`/${item.slug}`} className="block h-32 overflow-hidden relative">
                <Image
                    alt="Card background"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    src={item.thumb}
                    width={500}
                    height={500}
                />
            </LinkLocale>

            <LinkLocale className="flex-grow p-2" href={`/${item.slug}`}>
                <div className="flex flex-col justify-between items-start h-full">
                    <p className="font-normal text-4sm mb-1 text-foreground/90 transition-all duration-200 hover:text-sky-500 overflow-ellipsis overflow-hidden whitespace-nowrap">
                        {item.name[locale]}
                    </p>
                    <p className="text-gray-800 text-2sm overflow-ellipsis overflow-hidden whitespace-nowrap">
                        {item.description[locale]}
                    </p>
                </div>
            </LinkLocale>
        </div>
    )
}
type Props = {
    item: any
    clampName?: string
    clampDes?: string
}
const cpn = {
    list: ({ item, clampName, clampDes }: Props) => TypeList({ item, clampName, clampDes }),
    table: ({ item, clampName, clampDes }: Props) => TypeTable({ item, clampName, clampDes }),
    slider: ({ item, clampName, clampDes }: Props) => TypeSlider({ item, clampName, clampDes }),
}

const CardNews = ({
    item,
    type,
    clampName = 0,
    clampDes = 0,
}: {
    item: any
    type?: 'table' | 'list' | 'slider'
    clampName?: number
    clampDes?: number
}) => {
    const lcName = clampName ? `text-ellipsis line-clamp-${clampName}` : ''
    const lcDes = clampDes ? `text-ellipsis line-clamp-${clampDes}` : ''
    return <>{cpn[type ?? 'list']({ item, clampName: lcName, clampDes: lcDes })}</>
}

export default memo(CardNews)
