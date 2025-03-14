import {
  LoginResType,
  LoginBodyType,
  RegisterResType,
  RegisterBodyType,
  SendCookieToServerResType,
  SendCookieToServerBodyType,
} from "@/Type/AuthTypes";
import httpRequest from "@/lib/http";

export const authApi = {
  login(body: LoginBodyType) {
    return httpRequest.post<LoginResType>(`${process.env.NEXT_PUBLIC_API_ADMIN}/store/login`, {
      body,
    });
  },

  register(body: RegisterBodyType) {
    return httpRequest.post<RegisterResType>(`${process.env.NEXT_PUBLIC_API_ADMIN}/store/register`, {
      body,
    });
  },

  sendCookieToServer(body: SendCookieToServerBodyType) {
    return httpRequest.post<SendCookieToServerResType>(`/api/auth/login`, {
      body,
    });
  },

  signOut(accessToken: string) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};
