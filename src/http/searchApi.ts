import http, { Page, Params } from './http'
import { News } from './newsApi'
import { Product } from './productApi'

export type Search = {
    products: Page<Product>
    news: Page<News>
}

const searchApi = {
    search: async (params: Params) => http.get<Search>('v1/search', { params }),
}
export default searchApi
