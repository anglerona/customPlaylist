"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { DownloadIcon, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const ImagePage = () => {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);

            const response = await axios.post("/api/image", values);

            const urls = response.data.map((image: { url: string }) => image.url);

            setImages(urls);
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
                title="Image Generation"
                description="Create images by giving prompts to this model "
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
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
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl className="m-0 p-0">
                                            <Input 
                                                className="border-0 outline-none focus-visible:ring-[FFF9F5] focus-visible:ring-0 bg-[#FFF9F5] text-[#714325] dark:bg-[#17264D] dark:text-white" 
                                                disabled={isLoading}
                                                placeholder="An egg-shaped white pomeranian with a strawberry"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )} 
                            />
                            <FormField
                                name="amount"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-[#FFF9F5] text-[#714325] border-[#E5C0A8] dark:bg-[#17264D] dark:text-white dark:border-[#113FAE]">
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-[#FFF9F5] text-[#714325] border-[#E5C0A8] dark:bg-[#17264D] dark:text-white dark:border-[#113FAE]">
                                                {amountOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )} 
                            />
                            <FormField
                                name="resolution"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-[#FFF9F5] text-[#714325] border-[#E5C0A8] dark:bg-[#17264D] dark:text-white dark:border-[#113FAE]">
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-[#FFF9F5] text-[#714325] border-[#E5C0A8] dark:bg-[#17264D] dark:text-white dark:border-[#113FAE]">
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                        <div className="p-20 bg-[#FFF1E8] dark:bg-[#3052A6]">
                            <Loader />
                        </div>
                    )}
                    {images.length === 0 && !isLoading && (
                        <Empty label="No images generated" />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((src) => (
                            <Card key={src} className="bg-[#FFF9F5] rounded-lg overflow-hidden border-[#E5C0A8] dark:bg-[#17264D] dark:border-[#113FAE]">
                                <div className="relative aspect-square">
                                    <Image alt="Image" fill src={src} />
                                </div>
                                <CardFooter className="p-2">
                                    <Button variant="secondary" className="w-full text-[#714325] bg-[#E5C0A8] hover:bg-[#E5C0A8] dark:text-white dark:bg-[#113FAE] dark:hover-bg-[#113FAE]" onClick={() => window.open(src)}>
                                        <DownloadIcon className="h-4 w-4 mr-2" />
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImagePage;