"use server";

import { cookies } from "next/headers";

export async function getReceiverIdFromCookie() {
  const cookieStore = await cookies();
  const dataRecebedor = cookieStore.get("dataRecebedor");

  if (!dataRecebedor ) {
    throw new Error("ID do recebedor não encontrado no cookie");
  }

  return dataRecebedor.value;
}