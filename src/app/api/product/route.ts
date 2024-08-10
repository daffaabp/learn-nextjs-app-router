import { NextRequest, NextResponse } from "next/server";
const data = [
  {
    id: 1,
    name: "Nike InfinityRN 4 Electric",
    price: 1000000,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/86991b52-33a2-4e41-aace-c05510832f84/air-jordan-1-low-shoes-6Q1tFM.png",
  },
  {
    id: 2,
    name: "Nike Air VaporMax 2023 Flyknit Electric",
    price: 1900000,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8c73dd3a-cfa4-49ca-b66c-065c233802dc/air-jordan-1-low-se-shoes-FTrFvs.png",
  },
  {
    id: 3,
    name: "Nike InfinityRN 4 Electric",
    price: 1500000,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/66b1a0a7-2277-4ab5-8f94-03e52d4fcd45/AIR+JORDAN+1+LOW.png",
  },
  {
    id: 4,
    name: "Nike InfinityRN 4 Electric",
    price: 1500000,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/66b1a0a7-2277-4ab5-8f94-03e52d4fcd45/AIR+JORDAN+1+LOW.png",
  },
  {
    id: 5,
    name: "Nike InfinityRN 5 Electric",
    price: 1500000,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/66b1a0a7-2277-4ab5-8f94-03e52d4fcd45/AIR+JORDAN+1+LOW.png",
  }
];

export async function GET(request: NextRequest) {
  // mengambil search Para, dari request URL
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // jika ada id, dan jika id yang dikirimkan tidak ada di data
  if (id) {
    const detailProduct = data.find((item) => item.id === Number(id));
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

  return NextResponse.json({ 
    status: 200, 
    message: "Success", 
    data 
  });
}

