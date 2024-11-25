import NewsCategoryPage from '@/app/[locale]/news/[slug]/page'

export * from '@/app/[locale]/news/[slug]/page'

export default function NewsCategoryPageVi(props: { params: { slug: string } }) {
    return <NewsCategoryPage {...props} />
}
