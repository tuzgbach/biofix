import { Category } from '@/http/categoryApi'
import { CategoryNews } from '@/http/categoryNewsApi'
import { Info } from '@/http/infoApi'
import { News } from '@/http/newsApi'
import { Product } from '@/http/productApi'
import { Locale } from '@/i18n'

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
    return path.startsWith('/') ? path.slice(1) : path
}

interface ProcessedCategory extends Category {
    key: string
    title: string
    label: string
    value: string
    children: ProcessedCategory[] | []
}

export const processCatesUseInAntd = (cates: Category[], locale: Locale): ProcessedCategory[] => {
    return cates.map((cate: Category) => ({
        ...cate,
        key: cate.id,
        title: cate.name[locale],
        label: cate.name[locale],
        value: cate.id,
        children: cate.children ? processCatesUseInAntd(cate.children, locale) : [],
    }))
}

export function parseDateTime(dateTimeStr: string): Date | undefined {
    try {
        const [day, month, year, hours, minutes, seconds] = dateTimeStr.split(/[- :]/).map(Number)
        return new Date(year, month - 1, day, hours, minutes, seconds)
    } catch (error) {
        return undefined
    }
}

// find category by slug
export const findCateBySlug = (cates: Category[], slug: string): Category | null => {
    const found = cates.find((cate) => cate.slug === slug)
    if (found) return found

    for (let cate of cates) {
        if (cate.children) {
            const childFound = findCateBySlug(cate.children, slug)
            if (childFound) return childFound
        }
    }
    return null
}
// find category by id
export const findCateById = (cates: Category[], id: string): Category | null => {
    for (let cate of cates) {
        if (cate.id === id) return cate

        if (cate.children) {
            const found = findCateById(cate.children, id)
            if (found) return found
        }
    }
    return null
}

export const findAllParentCategories = (categories: Category[], id: string): string[] => {
    let path: string[] = []

    function traverse(node: Category, currentPath: string[]) {
        if (node.id === id) {
            path = [...currentPath, node.id]
            return true
        }
        if (node.children) {
            for (let child of node.children) {
                if (traverse(child, [...currentPath, node.id])) {
                    return true
                }
            }
        }
        return false
    }

    for (let node of categories) {
        if (traverse(node, [])) {
            break
        }
    }

    return path
}

export const findRootCategory = (
    categories: Category[],
    current: string | Category
): Category | null => {
    const currentCategory =
        typeof current === 'string'
            ? categories.find((category) => category.id === current)
            : current

    if (!currentCategory) return null // Không tìm thấy danh mục hiện tại

    if (!currentCategory.parentId) return currentCategory // Đã tìm thấy danh mục gốc

    const parentCategory = categories.find((category) => category.id === currentCategory.parentId)
    if (parentCategory) return findRootCategory(categories, parentCategory) // Đệ quy tìm danh mục gốc

    return null // Không tìm thấy danh mục cha
}

// lam phang category
export const flattenCategories = (cates: Category[]): Category[] => {
    let result: Category[] = []
    cates.forEach((v) => {
        result.push(v)
        if (v.children) {
            result = [...result, ...flattenCategories(v.children)]
        }
    })
    return result
}

export const processUrl = (source: string): string => {
    const base = process.env.NEXT_PUBLIC_API_URL || ''
    if (!source) {
        return ''
    } else if (source && source.startsWith('http')) {
        return source
    } else return `${base}${source}`
}

export const processInfoUrl = (info: Info): Info => ({
    ...info,
    logo: processUrl(info.logo),
    banner: processUrl(info.banner),
    banners: info.banners.map((b) => processUrl(b)),
    brandsInProduct: info.brandsInProduct.map((b) => ({
        ...b,
        image: processUrl(b.image),
    })),
    brands: info.brands.map((b) => ({
        ...b,
        image: processUrl(b.image),
    })),
    meta: { ...info.meta, metaImage: info.meta.metaImage ? processUrl(info?.meta?.metaImage) : '' },
    metaProduct: {
        ...info.metaProduct,
        metaImage: info.metaProduct.metaImage ? processUrl(info?.metaProduct?.metaImage) : '',
    },
    metaNews: {
        ...info.metaNews,
        metaImage: info.metaNews.metaImage ? processUrl(info?.metaNews?.metaImage) : '',
    },
    metaAbout: {
        ...info.metaAbout,
        metaImage: info.metaAbout.metaImage ? processUrl(info?.metaAbout?.metaImage) : '',
    },
    images: info.images.map((b) => processUrl(b)),
    linkChannels: info.linkChannels.map((l) => ({ ...l, icon: processUrl(l.icon) })),
    linkShops: info.linkShops.map((l) => ({ ...l, icon: processUrl(l.icon) })),
})

export const processCategoriesUrl = (categories: Category[]): Category[] =>
    categories.map((c) => ({
        ...c,
        icon: processUrl(c.icon),
        image: processUrl(c.image),
        video: processUrl(c.video),
        children: c.children ? processCategoriesUrl(c.children) : [],
    }))

export const processCategoriesNewsUrl = (categories: CategoryNews[]): CategoryNews[] =>
    categories.map((c) => ({ ...c, image: processUrl(c.image) }))

export const processProductsUrl = (products: Product[]): Product[] =>
    products.map((p) => ({
        ...p,
        image: processUrl(p.image),
        video: processUrl(p.video),
        meta: { ...p.meta, metaImage: p.meta.metaImage ? processUrl(p.meta.metaImage) : null },
    }))

export const processNewsUrl = (news: News[]): News[] =>
    news.map((n) => ({
        ...n,
        thumb: processUrl(n.thumb),
        images: n.images ? n.images.map((i) => processUrl(i)) : [],
        meta: { ...n.meta, metaImage: n.meta.metaImage ? processUrl(n.meta.metaImage) : null },
    }))
