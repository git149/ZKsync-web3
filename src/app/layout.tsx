/**
 * Root Layout Component
 * @author git149
 * @description Main layout wrapper for TSender UI application
 */

import "./globals.css"
import type { Metadata } from "next"
import { type ReactNode } from "react"
import Header from "@/components/Header"
import { Providers } from "./providers"

export const metadata: Metadata = {
    title: "TSender by git149",
    description: "Hyper gas-optimized bulk ERC20 token transfer - Built by git149",
}

export default function RootLayout(props: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/T-Sender.svg" sizes="any" />
            </head>
            <body className="bg-zinc-50">
                <Providers>
                    <Header />
                    {props.children}
                </Providers>
            </body>
        </html>
    )
}
