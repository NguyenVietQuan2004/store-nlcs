import httpRequest from "@/lib/http";

export const messageAPI = {
  sendMessage(body: any) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ADMIN}/message`, {
      body,
    });
  },
  getMessagesChatUser(_id: any) {
    return httpRequest.get<any>(`${process.env.NEXT_PUBLIC_API_ADMIN}/message/${_id}`);
  },
};
