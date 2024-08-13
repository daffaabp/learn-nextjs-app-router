export const getData = async (url: string) => {
  // ini api dari luar
  // const res = await fetch("https://fakestoreapi.com/products", {
  //   cache: "no-store",
  // })

  // ini api lokal
  // const res = await fetch("https://fakestoreapi.com/products");
  const res = await fetch(url, {
    cache: "no-store",
    next: {
      tags: ["product"],
      revalidate: 30
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

