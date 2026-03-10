"use client";

import { useRef } from "react";

type Props = {
  otp: string[];
  setOtp: (v: string[]) => void;
};

export default function OTPInput({ otp, setOtp }: Props) {

  const inputs = useRef<(HTMLInputElement | null)[]>([]);



  function handleChange(value: string, index: number) {

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pasted)) return;

    const newOtp = pasted.split("").slice(0, 6);

    setOtp(newOtp);

    inputs.current[5]?.focus();
  }
  return (
    <div className="flex gap-3 justify-center">

      {otp.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputs.current[i] = el;
          }}
          value={digit}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          maxLength={1}
          className="w-12 h-12 text-center border rounded-lg text-lg font-semibold focus:ring-2 focus:ring-green-700/30"
        />
      ))}

    </div>
  );
}