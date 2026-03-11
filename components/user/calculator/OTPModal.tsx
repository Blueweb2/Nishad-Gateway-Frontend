import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import OTPInput from "./OTPInput";

type Props = {
  email: string;
  onVerify: (otp: string) => void;
  onClose: () => void;
  verifying?: boolean;
};

export default function OTPModal({
  email,
  onVerify,
  onClose,
  verifying = false,
}: Props) {

  const [otpDigits, setOtpDigits] = useState(["","","","","",""]);


  const otp = otpDigits.join("");

    useEffect(() => {
  setOtpDigits(["","","","","",""]);
}, []);
useEffect(() => {
  if (otp.length === 6) {
    onVerify(otp);
  }
}, [otp]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-8 w-[420px] relative shadow-lg">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-black"
        >
          <X size={18} />
        </button>

        <h3 className="text-xl font-semibold mb-3">
          Verify your email
        </h3>

        <p className="text-sm text-neutral-600 mb-6">
          Enter the OTP sent to <span className="font-medium">{email}</span>
        </p>

        <OTPInput otp={otpDigits} setOtp={setOtpDigits} />

        <button
          onClick={() => otp.length === 6 && onVerify(otp)}
          disabled={otp.length !== 6 || verifying}
          className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-medium transition disabled:opacity-60"
        >
          {verifying ? "Generating AI Report..." : "Verify & Generate Report"}
        </button>

      </div>
    </div>
  );
}