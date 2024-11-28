import PageProductCategory from '@/app/[locale]/product/PageProductCategory'

export default function CategoryProductPageVi({
    params: { slugs },
}: {
    params: { slugs: string[] }
}) {
    return <PageProductCategory slug={slugs[slugs.length - 1]} />
}
