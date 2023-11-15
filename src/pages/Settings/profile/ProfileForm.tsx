"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "../../../registry/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../registry/ui/form"
import { Input } from "../../../registry/ui/input"
import { Textarea } from "../../../registry/ui/textarea"
import { toast } from "../../../registry/ui/use-toast"
import Api from "../../../utils/Api";
import React from "react";
import {subjectSchema} from "../../../components/data/subjects/schema";

const profileFormSchema = z.object({
    nicename: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    capitalLetters: z
        .string()
        .min(2, {
            message: "Must be 2 characters.",
        })
        .max(2, {
            message: "Must be 2 characters.",
        }),
    githubToken: z
        .string(),
    color: z
        .string()
        .min(7, {
            message: "Must be 7 characters.",
        })
        .max(7, {
            message: "Must be 7 characters.",
        }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>


export function ProfileForm() {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
    })

    const [istasksloaded, setIsTasksLoaded] = React.useState<boolean>(false)

    if(!istasksloaded) {
        getUserData()
    }
    async function getUserData() {
        setIsTasksLoaded(true)
        Api.get('/auth/self').then((res) => {
            console.log(res)
            form.setValue("nicename", res.nicename)
            form.setValue("email", res.email)
            form.setValue("capitalLetters", res.capitalLetters)
            form.setValue("githubToken", res.githubToken)
            form.setValue("color", res.color)
        }).catch((err) => {})
        return;
    }

    function onSubmit(data: ProfileFormValues) {
        console.log(data)

        var requestBody = {
            nicename: data.nicename,
            email: data.email
        }

        Api.patch('/users', requestBody).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })


        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField control={form.control} name="nicename" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nicename</FormLabel>
                        <FormControl><Input placeholder="nicename" {...field} /></FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Correu Electronic</FormLabel>
                        <FormControl><Input placeholder="email@domain.com" {...field} /></FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="capitalLetters" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Acronym</FormLabel>
                        <FormControl><Input placeholder="NC" {...field} /></FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="githubToken" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Github Token</FormLabel>
                        <FormControl><Input placeholder="githubToken" {...field} /></FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="color" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl><Input type="color" placeholder="#000000" {...field} /></FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    )
}
