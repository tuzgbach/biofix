import infoApi from '@/http/infoApi'
import PageHome from './PageHome'
import { processNewsUrl, processProductsUrl } from '@/utils'

const Home = async () => {
    const newsShow = processNewsUrl(await infoApi.getNewsShowInfo({ next: { revalidate: 60 } }))
    const productsShow = processProductsUrl(
        await infoApi.getProductsShowInfo({
            next: { revalidate: 60 },
            params: { isDeleted: false },
        })
    )
    const pageEvent = await infoApi.getEventShowInfo({
        next: { revalidate: 60 },
        params: { isDeleted: false },
    })
    const eventShow = processNewsUrl(pageEvent.content)

    return <PageHome newsShow={newsShow} eventsShow={eventShow} productsShow={productsShow} />
    // return <PageHome />
}

export default Home
