"use client"

/**
 * Providers Component
 * @author git149
 * @description Global providers for TSender UI (Wagmi, RainbowKit, React Query)
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode, useState, useEffect } from "react"
import { WagmiProvider } from "wagmi"
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import config from "@/rainbowKitConfig"
import "@rainbow-me/rainbowkit/styles.css"

export function Providers(props: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={lightTheme({ borderRadius: "medium" })}>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
