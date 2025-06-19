"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState, useEffect } from "react";
import { WagmiProvider } from "wagmi";
import { ConnectButton, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import config from "./rainbowKitConfig";
import "@rainbow-me/rainbowkit/styles.css";

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  //WagmiProvider：区块链交互的全局状态（如钱包、链等）。
  //QueryClientProvider：数据请求和缓存的全局状态。
  //RainbowKitProvider：钱包连接 UI 和体验的全局状态。
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={lightTheme({ borderRadius: "medium" })}>
          <ConnectButton />
          {props.children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
