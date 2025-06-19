"use client";

import { InputForm } from "./UI/inputField";
import { useState } from "react";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constant";
import { useChainId, useConfig, useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import { Console } from "console";

export default function AirDropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amount, setAmount] = useState("");
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();

  async function handleSubmit() {
    const tSenderAddress = chainsToTSender[chainId].tsender;
    const approveAmount = await getApproveAmount(tSenderAddress);
    console.log(approveAmount);
  }
  async function getApproveAmount(
    tSenderAddress: string | null
  ): Promise<number> {
    if (!tSenderAddress) {
      alert("please connect right chain");
      return 0;
    }
    //read contract about chain  if approve
    const response = await readContract(config, {
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi,
      functionName: "allowance",
      args: [account.address, tSenderAddress as `0x${string}`],
    });
    return response as number;
  }

  return (
    <div className="flex flex-col gap-4">
      <InputForm
        label="Token Address"
        placeholder="0x..."
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      {/* //large属性允许InputForm组件渲染一个<textarea>元素，而不是默认的单行<input>。
      // <textarea>元素支持多行文本输入，用户可以在其中输入多行内容，每一行可以视为一个独立的值。 */}
      <InputForm
        label="Recipients"
        placeholder="0x123..."
        value={recipients}
        onChange={(e) => setRecipients(e.target.value)}
        large={true}
      />
      <InputForm
        label="Amount"
        placeholder="100,200,300,..."
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        large={true}
      />
      <button onClick={handleSubmit}>send token </button>
    </div>
  );
}
