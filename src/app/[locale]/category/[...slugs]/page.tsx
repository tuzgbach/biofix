import PageProductCategory from '../../product/PageProductCategory'

export default function CategoryPage({ params: { slugs } }: { params: { slugs: string[] } }) {
    return <PageProductCategory slug={slugs[slugs.length - 1]} />
}
