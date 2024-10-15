"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { messageAPI } from "@/apiRequest/messageAPI";
import { v4 as uuidv4 } from "uuid";
import { socket } from "@/socket.js";
import { handlError } from "@/components/handle-error";
import { SendMessageIcon } from "../../../../../public/icons";
import { SidebarCloseIcon } from "lucide-react";
import { MessageType } from "@/Type/messageTypes";

const formSchema = z.object({
  text: z.string().min(1, { message: "" }),
});

function Chat() {
  const receiver = "admin"; //admin này chính là id user đăng nhập bên trang admin
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const ref = useRef<HTMLDivElement>(null);
  const [uuid, setUuid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [ref, messages]);

  useEffect(() => {
    if (!uuid || !socket.connected) return;
    socket.emit("addNewUser", uuid);
    socket.on("getMessage", (data) => {
      setMessages((pre: any) => [
        ...pre,
        {
          senderId: data.senderId,
          text: data.text,
          _id: uuidv4(),
          createdAt: new Date(),
        },
      ]);
    });
    return () => {
      socket.off("getMessage");
    };
  }, [socket, uuid]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let uuidFromLocalStorage = localStorage.getItem("uuid");
      if (!uuidFromLocalStorage) {
        uuidFromLocalStorage = uuidv4();
        localStorage.setItem("uuid", uuidFromLocalStorage);
      }
      setUuid(uuidFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (!uuid) return;
    const fetchAPI = async () => {
      const data = await messageAPI.getMessagesChatUser(uuid);
      setMessages(data.data);
    };
    fetchAPI();
  }, [uuid]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!socket?.connected || !data.text || isLoading) return;
    // thứ tự của mấy thằng này quan trọng làm sao để tôi ưu, nếu gọi api lõio thì sao
    try {
      setIsLoading(true);
      form.setValue("text", "");
      setMessages((pre: any) => [
        ...pre,
        {
          senderId: uuid,
          text: data.text,
          _id: uuidv4(),
          createdAt: new Date(),
        },
      ]);

      socket.emit("sendMessage", {
        senderId: uuid,
        receiverId: receiver,
        text: data.text,
      });
      await messageAPI.sendMessage({
        senderId: uuid,
        receiverId: receiver,
        text: data.text,
      });
    } catch (error) {
      handlError({ consoleError: "Create message error", error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[360px] flex flex-col h-[500px] z-50  border rounded-sm bg-red-200 fixed bottom-[100px] right-[100px] ">
      <div className="flex justify-between h-[72px] items-center py-6 px-4 bg-blue-300 shadow-xl">
        <div></div>
        <span className="text-white font-semibold select-none">Rirchar</span>
        <SidebarCloseIcon />
      </div>

      <div className="flex flex-col p-4 gap-4 flex-1 overflow-auto" ref={ref}>
        {messages.map((item: MessageType) => {
          return (
            <div
              key={item._id}
              className={`${
                item.senderId === uuid ? "self-end bg-blue-400 text-white" : "self-start bg-white"
              } max-w-[260px]  px-3 py-2 rounded-xl break-words`}
            >
              {item.text}
            </div>
          );
        })}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full  h-[56px] p-4 bg-white flex items-center justify-between "
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => {
              return (
                <FormItem className="w-full space-y-0">
                  <FormControl>
                    <input
                      {...field}
                      autoComplete="off"
                      className=" w-full   pr-2  placeholder:align-middle  outline-none bg-transparent"
                      placeholder="Type a message"
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              );
            }}
          />
          <button type="submit">
            <SendMessageIcon fill={form.getValues("text") ? "#353535" : "#acaaaa"} />
          </button>
        </form>
      </Form>
    </div>
  );
}

export default Chat;
