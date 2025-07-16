// ExampleComponent.tsx

import { useGetData } from "../../hooks/useGetData";

export default function Feed() {
  const fakeStore = useGetData({
    queryKey: "fakestore",
    url: "https://fakestoreapi.com/products",
  });

  if (fakeStore.isLoading) return <p>Loading...</p>;
  if (fakeStore.error) return <p>Error occurred!</p>;

  return (
    <div>
      <h2>🛒 Fake Store Products</h2>
      <ul>
        {fakeStore.data.map((product: any) => (
          <>
            <li key={product.id}>
              {product.title} - ${product.price}
            </li>
            <img src={product.image} alt={product.title} />
          </>
        ))}
      </ul>
    </div>
  );
}
