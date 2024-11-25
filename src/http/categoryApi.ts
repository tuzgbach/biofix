import { http } from '.'
import { User } from './authApi'

export type Category = {
    id: string
    name: { en: string; vi: string }
    description: { en: string; vi: string }
    slug: string
    parentId: string | null
    parentName: { en: string; vi: string } | null
    level: number
    icon: string
    image: string
    video: string
    createdBy: User
    updatedBy: User
    createdAt: any
    updatedAt: any
    isDeleted: boolean
    children: Category[] | []
}

// build category tree
const buildCategoryTree = (categories: Category[], parentId: string | null = null) => {
    const filteredCategories = categories.filter((category) => category.parentId === parentId)

    const tree: Category[] = filteredCategories.map((category) => {
        const children = buildCategoryTree(categories, category.id)
        return children.length > 0
            ? { ...category, children, key: category.id }
            : { ...category, key: category.id }
    })

    return tree
}

// filter category isDeleted = false
function filterIsDeleteFalseInCategory(data: Category[]): Category[] {
    if (data)
        return data.filter((item: Category) => {
            // Loại bỏ item nếu isDelete là true
            if (item.isDeleted) return false
            // Nếu item có children, lọc children
            if (item.children) {
                // Tạo một bản sao của item
                item = { ...item }
                item.children = filterIsDeleteFalseInCategory(item.children) || []
            }
            return true
        })
    return []
}

const categoryApi = {
    getCategories: async () => buildCategoryTree(await http.get<Category[]>('/v1/category')),
}

export default categoryApi
export { filterIsDeleteFalseInCategory }
