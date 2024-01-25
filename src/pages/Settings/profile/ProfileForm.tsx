"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {Button} from "../../../registry/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../registry/ui/form"
import {Input} from "../../../registry/ui/input"
import {toast} from "react-toastify";
import Api from "../../../utils/Api";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {ExternalLink} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "../../../registry/ui/avatar";

const profileFormSchema = z.object({
    username: z
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
        .union([z.string().nullish(), z.literal("")]),
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


export function ProfileForm(...props: any) {
    const [userId, setUserId] = React.useState<any>(props[0].userId)

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
    })

    const [githubData, setGithubData] = React.useState<any>([])

    useEffect(() => {
        if(userId == 'self') {
            Api.get('/auth/self').then((res) => {
                form.setValue("username", res.username)
                form.setValue("email", res.email)
                form.setValue("capitalLetters", res.capitalLetters)
                form.setValue("githubToken", res.githubInfo.github_token)
                if (res.githubInfo.github_token != '') {
                    setGithubData(res.githubInfo)
                }
                form.setValue("color", res.color)
            }).catch((err) => {
            })
        }
        else {
            Api.get('/users/uuid/'+userId).then((res) => {
                form.setValue("username", res.username)
                form.setValue("email", res.email)
                form.setValue("capitalLetters", res.capitalLetters)
                form.setValue("githubToken", res.githubInfo.github_token)
                if (res.githubInfo.github_token != '') {
                    setGithubData(res.githubInfo)
                }
                form.setValue("color", res.color)
            }).catch((err) => {
            })
        }
    }, []);

    function onSubmit(data: ProfileFormValues) {

        var requestBody = {
            username: data.username,
            capitalLetters: data.capitalLetters,
            githubToken: (data.githubToken == '') ? null : data.githubToken,
            color: data.color
        }

        if(userId == 'self') {
            Api.patch('/users', requestBody).then((res) => {
                window.location.reload();
                toast.success('Tasca actualitzada correctament', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }).catch((err) => {})
        }
        else {
            Api.patch('/users/'+userId, requestBody).then((res) => {
                window.location.reload();
            }).catch((err) => {
            })
        }

    }

    // @ts-ignore
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField control={form.control} name="username" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nom d'usuari</FormLabel>
                        <FormControl><Input placeholder="username" {...field} disabled={userId == 'self'}/></FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Correu Electronic</FormLabel>
                        <FormControl><Input placeholder="email@domain.com" {...field}  disabled={userId == 'self'}/></FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="capitalLetters" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Acronim</FormLabel>
                        <FormControl><Input placeholder="NC" {...field}/></FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="githubToken" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Token de Github</FormLabel>
                        <FormControl>
                            <Input
                                type={(userId != 'self') ? 'password' : 'text'}
                                placeholder="githubToken"
                                disabled={userId != 'self'}
                            />
                        </FormControl>
                        <FormDescription className="flex items-center">
                            { ( githubData != '' ) ? (
                                <div className="flex items-center mr-10 mt-2">
                                    <Link to={githubData.html_url} target="_blank" >
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={githubData.avatar_url} alt="Avatar" />
                                            <AvatarFallback>MG</AvatarFallback>
                                        </Avatar>
                                    </Link>
                                    <Link to={githubData.html_url} target="_blank" >
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{githubData.login}</p>
                                        </div>
                                    </Link>
                                </div>
                            ) : null }
                            <ExternalLink className="mr-2 h-4 w-4 mt-2" />
                            <Link to="https://github.com/settings/tokens/new?description=TrackDev%20GitHub%20integration&scopes=repo%2Cgist%2Cread%3Aorg%2Cworkflow" target="_blank" className="mt-2" >
                                Generar Token
                            </Link>
                        </FormDescription>
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
                <Button type="submit">Actualitzar</Button>
            </form>
        </Form>
    )
}
