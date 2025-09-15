"use client"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function TeamBlock() {
    return (
        <div className=""style={{backgroundColor: "#7ECF1C"}}>
            <Card>
                <CardHeader>
                    <CardTitle style = {{color: "#002D2A"}}>Card Title</CardTitle>
                    <CardDescription style = {{color: "#002D2A"}}>Card Description</CardDescription>
                    <CardAction style = {{color: "#002D2A"}}>Card Action</CardAction>
                </CardHeader>
                <CardContent>
                    <p style = {{color: "#002D2A"}}>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p style = {{color: "#002D2A"}}>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    )
}