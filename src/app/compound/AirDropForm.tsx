"use client";

import { InputForm } from "./UI/inputField";
import { useState } from "react";

export default function AirDropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  return (
    <div className="flex flex-col gap-4">
      <InputForm
        label="Token Address"
        placeholder="0x..."
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
    </div>
  );
}
