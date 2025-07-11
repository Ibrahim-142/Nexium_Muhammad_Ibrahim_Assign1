export default async function ProductDetails({ params }: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  return <h1>Details about product {productId}</h1>;
}
