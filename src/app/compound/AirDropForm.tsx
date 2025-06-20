"use client";

import { InputForm } from "./UI/inputField";
import { useMemo, useState } from "react";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constant";
import { useChainId, useConfig, useAccount, useWriteContract } from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { Console } from "console";
import { calculateTotal } from "@/utils/calculateTotal/calculateTotal";

export default function AirDropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");
  const total: number = useMemo(() => calculateTotal(amounts), [amounts]);
  const { data: hash, isPending, writeContractAsync } = useWriteContract();

  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();

  async function handleSubmit() {
    const tSenderAddress = chainsToTSender[chainId].tsender;
    const approveAmount = await getApprovedAmount(tSenderAddress);

    if (approveAmount < total) {
      const approvalHash = await writeContractAsync({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "approve",
        args: [tSenderAddress as `0x${string}`, BigInt(total)],
      });
      const approveReceipt = await waitForTransactionReceipt(config, {
        hash: approvalHash,
      });
    } else {
      await writeContractAsync({
        abi: tsenderAbi,
        address: tSenderAddress as `0x${string}`,
        functionName: "airdropERC20",
        args: [
          tokenAddress,
          // Comma or new line separated
          recipients
            .split(/[,\n]+/)
            .map((addr) => addr.trim())
            .filter((addr) => addr !== ""),
          amounts
            .split(/[,\n]+/)
            .map((amt) => amt.trim())
            .filter((amt) => amt !== ""),
          BigInt(total),
        ],
      });
    }
  }
  async function getApprovedAmount(
    tSenderAddress: string | null
  ): Promise<number> {
    if (!tSenderAddress) {
      alert("This chain only has the safer version!");
      return 0;
    }
    console.log();
    const response = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
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
        value={amounts}
        onChange={(e) => setAmounts(e.target.value)}
        large={true}
      />
      <button onClick={handleSubmit}>send token </button>
    </div>
  );
}
