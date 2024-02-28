'use client'
import { Button } from '@/components/ui/button'
import { ICategory } from '@/types'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UploadButton, UploadDropzone } from '@/lib/uploadthing'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Cart from '@/components/Cart'
const formSchema = z.object({
    name: z.string().min(2).max(50),
})

const fetcher: Fetcher<ICategory[]> = (url: string) => axios.get(url).then(res => res.data)

const CategoryPage = () => {
    const [image, setImage] = useState("")
    const router = useRouter()

    const { data: categories, error, } = useSWR('/api/category', fetcher)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const updateValues = { ...values, image }
        console.log(updateValues)

        const res = await axios.post("/api/category", updateValues)
        if (res.status == 200) {
            form.reset()
            router.refresh()

        }
    }
    if (error) {
        return <div className="w-full h-screen flex justify-center items-center">

            {error.message}
        </div>
    }

    return (
        <div className='container py-5 md:py-8'>
            <section>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl lg:text-2xl font-bold capitalize text-primary'>All Categories</h2>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                New Category
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Create a New Category</DialogTitle>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="t-shirt" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {
                                        !image ? <UploadDropzone
                                            endpoint="imageCategory"
                                            onClientUploadComplete={(res) => {
                                                // Do something with the response
                                                console.log("Files: ", res);
                                                setImage(res[0].url)
                                            }}
                                            onUploadError={(error: Error) => {
                                                // Do something with the error.
                                                alert(`ERROR! ${error.message}`);
                                            }}
                                        /> : <div className=' aspect-video w-56 overflow-hidden '>
                                            <Image src={image} alt='image product' className='w-full h-full' width={255} height={162} />

                                        </div>
                                    }


                                    <Button disabled={!image} type="submit">Submit</Button>
                                </form>
                            </Form>

                        </DialogContent>
                    </Dialog>

                </div>
            </section>
            <section className='grid py-10 gap-3 grid-cols1 md:grid-cols-2 lg:grid-cols-3'>
                {categories?.map((c, idx) => {
                    return <div key={idx}>
                        <Card className='p-0'>
                            <CardContent className='p-1 relative'>
                                <Image src={c.image!} alt='image product' className='w-full aspect-video object-cover h-full' width={300} height={200} />
                                <div className='absolute bottom-0 left-0 w-full p-3 bg-black/50'>
                                    <h2 className="text-lg font-bold text-primary capitalize">
                                        {c.name}
                                    </h2>
                                </div>


                            </CardContent>
                        </Card>
                    </div>
                })}
            </section>

        </div>
    )
}

export default CategoryPage