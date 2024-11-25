import News from "../page";

export default function NewsCategoryPage({ params }: { params: { slug: string } }) {
    return <News categorySlug={params.slug} />
}