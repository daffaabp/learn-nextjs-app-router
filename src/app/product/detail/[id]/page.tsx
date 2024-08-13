import { getData } from "@/services/products";

export default async function DetailProductPage(props: any) {
  const { params } = props;
  // penamaan paramater ini harus sama dengan foldernya, misalnya di bawah ini adalah folder id. maka penulisannya menjadi params.id
  const product = await getData("http://localhost:3000/api/product/?id=" + params.id,);

  console.log(product);
  
  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto border border-gray-700">
        <img src={product.data.image} alt="" className="w-full object-cover aspect-square col-span-2" />

        <div className="bg-white p-4 px-6">
          <h3>{product.data.name}</h3>
          <p>Price : ${product.data.price}</p>
        </div>
      </div>
    </div>
  )
}