import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

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

