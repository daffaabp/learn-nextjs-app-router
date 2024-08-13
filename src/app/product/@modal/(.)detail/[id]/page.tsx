import Modal from "@/components/core/Modal";
import { getData } from "@/services/products";

export default async function DetailProductPage(props: any) {
  const { params } = props;
  // penamaan paramater ini harus sama dengan foldernya, misalnya di bawah ini adalah folder id. maka penulisannya menjadi params.id
  const product = await getData("http://localhost:3000/api/product/?id=" + params.id,);

  console.log(product);

  return (
    <Modal>
      <img src={product.data.image} alt="" className="w-full object-cover aspect-square col-span-2" />
      <div className="bg-white p-4 px-6">
        <h3>{product.data.name}</h3>
        <p>Price : ${product.data.price}</p>
      </div>
    </Modal>
  )
}