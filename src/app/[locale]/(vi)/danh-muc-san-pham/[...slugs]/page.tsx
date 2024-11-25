import PageProductCategory from '@/app/[locale]/product/PageProductCategory'

export * from '@/app/[locale]/category/[...slugs]/page'

export default function CategoryProductPageVi({
    params: { slugs },
}: {
    params: { slugs: string[] }
}) {
    return <PageProductCategory slug={slugs[slugs.length - 1]} />
}
