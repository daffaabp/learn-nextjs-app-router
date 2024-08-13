import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
const data = [
  {
    id: 1,
    name: "Nike Free Metcon 6",
    price: 1000000,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e167d5cd-9b20-4935-a0fa-2a93c4b136f4/metcon-9-workout-shoes-ldMsxB.png",
  },
  {
    id: 2,
    name: "Nike Legend Essential 3 Next Nature",
    price: 1900000,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fba4b0f7-3fbf-4361-8281-e4dcd98e850c/legend-essential-3-next-nature-workout-shoes-6JkQMw.png",
  },
  {
    id: 3,
    name: "Nike Metcon 1 OG",
    price: 1500000,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/de62b6c2-a453-454b-8934-4ffd2f8eb34d/metcon-1-og-workout-shoes-tz6pbf.png",
  },
  {
    id: 4,
    name: "Nike InfinityRN 4 Electric",
    price: 1500000,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2690f275-f811-4967-8da4-872e6b6d6229/mc-trainer-2-workout-shoes-WFVXbk.png",
  },
];

export async function GET(request: NextRequest) {
  // mengambil search Para, dari request URL
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // jika ada id, dan jika id yang dikirimkan tidak ada di data
  if (id) {
    const detailProduct = await retrieveDataById("products", id);
    if (detailProduct) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: detailProduct
      });
    }

    return NextResponse.json({
      status: 404,
      message: "Not Found",
      data: {}
    });
  }

  const products = await retrieveData("products");

  return NextResponse.json({
    status: 200,
    message: "Success",
    data: products,
  });
}

