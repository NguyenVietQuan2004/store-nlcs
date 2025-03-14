import {
  LoginResType,
  LoginBodyType,
  RegisterResType,
  RegisterBodyType,
  SendCookieToServerResType,
  SendCookieToServerBodyType,
} from "@/Type/AuthTypes";
import { ListOrderResType } from "@/Type/OrderTypes";
import httpRequest from "@/lib/http";

export const orderApi = {
  order(body: { user_id: string }) {
    return httpRequest.get<ListOrderResType>(`${process.env.NEXT_PUBLIC_API_ADMIN}/order?user_id=${body.user_id}`, {
      cache: "no-store",
    });
  },
};
