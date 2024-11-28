import PageDetailProduct from '@/app/[locale]/product/[slug]/page'

export default function ProductDetailPageVi({ params }: { params: { slug: string } }) {
    return <PageDetailProduct params={params} />
}
