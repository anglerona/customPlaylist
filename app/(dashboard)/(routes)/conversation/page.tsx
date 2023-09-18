"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OpenAI from "openai";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

const ConversationPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<OpenAI.Chat.ChatCompletionMessageParam[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: OpenAI.Chat.ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/conversation", { messages: newMessages });

            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();
        } catch (error: any) {
            console.log(error);
        } finally {
            router.refresh();
        }
    };

    return (
        <div className="bg-[#FFF9F5] dark:bg-[#17264D]">
            <Heading
                title="Conversation"
                description="Ask the conversation model anything"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(onSubmit)} 
                            className="transition-all shadow-md rounded-lg border-none w-full p-4 px-3 md:px-6 focus-within:shadow-lg focus-within:-translate-y-1 focus-within:shadow-[#E5C0A8] dark:focus-within:shadow-[#113FAE] grid grid-cols-12 gap-2 shadow-[#E5C0A8] dark:shadow-[#113FAE]"
                        >
                            <FormField 
                                name="prompt" 
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input 
                                                className="border-0 outline-none focus-visible:ring-[FFF9F5] focus-visible:ring-0 bg-[#FFF9F5] text-[#714325] dark:bg-[#17264D] dark:text-white" 
                                                disabled={isLoading}
                                                placeholder="How many episodes are there in One Piece?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )} 
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full dark:text-white" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-[#FFF1E8] dark:bg-[#3052A6]">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label="No conversation started" />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div 
                                key={message.content} 
                                className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", 
                                            message.role === "user" ? "bg-[#FFF9F5] border border-[#E5C0A8] dark:bg-[#17264D] dark:border-[#113FAE]" : "bg-[#FFF1E8] dark:bg-[#3052A6]")}
                            >
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <p className="text-sm">
                                    {message.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConversationPage;