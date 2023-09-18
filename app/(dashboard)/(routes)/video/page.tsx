"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";

const VideoPage = () => {
    const router = useRouter();
    const [video, setVideo] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);

            const response = await axios.post("/api/video", values);

            setVideo(response.data[0]);
            form.reset();
        } catch (error: any) {
            console.log(error);
        } finally {
            router.refresh();
        }
    };

    return (
        <div className="dark:bg-[#17264D]">
            <Heading
                title="Video Generation"
                description="Create a video by giving a prompt"
                icon={VideoIcon}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10"
            />
            <div className="px-4 lg:px-8 bg-[#FFF9F5] dark:bg-[#17264D]">
                <div>
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(onSubmit)} 
                            className="transition-all shadow-md rounded-lg border-none w-full p-4 px-3 md:px-6 focus-within:shadow-lg focus-within:-translate-y-1 focus-within:shadow-[#E5C0A8] dark:focus-within:shadow-[#113FAE] shadow-[#E5C0A8] dark:shadow-[#113FAE] grid grid-cols-12 gap-2"
                        >
                            <FormField 
                                name="prompt" 
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input 
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-[FFF9F5] bg-[#FFF9F5] text-[#714325] dark:bg-[#17264D] dark:text-white" 
                                                disabled={isLoading}
                                                placeholder="Man tap dancing on the moon"
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
                    {!video && !isLoading && (
                        <Empty label="No video created" />
                    )}
                    {video && (
                        <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls loop autoPlay>
                            <source src={video} />
                        </video>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoPage;