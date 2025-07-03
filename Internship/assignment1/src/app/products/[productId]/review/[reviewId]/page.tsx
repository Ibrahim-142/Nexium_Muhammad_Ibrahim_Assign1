export default async function ProductDetails({ params }: {
  params: Promise<{ productId: string; reviewId: string }>;
}) {
  const { productId, reviewId } = await params;
  return (
    <h1>
      Review {reviewId} about product {productId}, 
    </h1>
  );
}
