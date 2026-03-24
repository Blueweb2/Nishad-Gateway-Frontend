"use client";

import dynamic from "next/dynamic";
import { useMemo, useState   } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import ContactPopup from "../shared/ContactPopup";

const FAQSection = dynamic(() => import("../shared/FAQSection"), {
  loading: () => <p>Loading FAQ...</p>,
});

const OTPModal = dynamic(() => import("./OTPModal"), {
  loading: () => <p>Loading...</p>,
});


type InvestorType = "Individual" | "Company" | "Startup" | "Investor";
type ActivityType =
  | "IT / Software"
  | "Trading"
  | "Consulting"
  | "Restaurant"
  | "Construction"
  | "Logistics"
  | "Healthcare";
type CityType = "Riyadh" | "Jeddah" | "Dammam" | "Khobar";
type TimelineType = "Urgent (1-2 weeks)" | "Normal (3-4 weeks)" | "Flexible (1-2 months)";

type FormState = {
  fullName: string;
  email: string;
  mobile: string;
  investorType: InvestorType | "";
  activity: ActivityType | "";
  city: CityType | "";
  timeline: TimelineType | "";
  visas: number;
  bankSupport: boolean;
  accountingSupport: boolean;
  vroSupport: boolean;
};

export default function KsaExpansionCostCalculator() {

  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    mobile: "",
    investorType: "",
    activity: "",
    city: "",
    timeline: "",
    visas: 0,
    bankSupport: false,
    accountingSupport: true,
    vroSupport: true,
  });


  const investorTypes: InvestorType[] = useMemo(
    () => ["Individual", "Company", "Startup", "Investor"],
    []
  );

  const activities: ActivityType[] = useMemo(
    () => [
      "IT / Software",
      "Trading",
      "Consulting",
      "Restaurant",
      "Construction",
      "Logistics",
      "Healthcare",
    ],
    []
  );

  const cities: CityType[] = useMemo(
    () => ["Riyadh", "Jeddah", "Dammam", "Khobar"],
    []
  );

  const timelines: TimelineType[] = useMemo(
    () => ["Urgent (1-2 weeks)", "Normal (3-4 weeks)", "Flexible (1-2 months)"],
    []
  );

  function validateForm() {
    if (!form.fullName.trim()) return "Please enter your full name";
    if (!form.email.trim()) return "Please enter your email";
    if (!form.mobile.trim()) return "Please enter your mobile number";
    if (!form.investorType) return "Please select investor type";
    if (!form.activity) return "Please select business activity";
    if (!form.city) return "Please select preferred city";
    if (!form.timeline) return "Please select timeline preference";
    return null;
  }

  async function onCalculate() {
    console.log("Calculate clicked");
    const err = validateForm();

    if (err) {
      toast.error(err);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/calculator/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
      body: JSON.stringify({
            email: form.email,
          }),
        }
      );

      if (!res.ok) throw new Error("OTP failed");

      setShowOtp(true);

      toast.success("OTP sent to your email");
    } catch (err) {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(code: string) {
    try {

      setVerifying(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/calculator/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            otp: code,
          }),
        }
      );

      const data = await res.json();

      if (!data.verified) {
        toast.error("Invalid OTP");
        return;
      }

      toast.success("OTP verified");

      await generateReport();

    } catch {
      toast.error("OTP verification failed");
    } finally {
      setVerifying(false);
    }
  }

  async function generateReport() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/calculator/generate-report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      toast.success("Your AI expansion report has been sent to your email!");

      setShowOtp(false);

    } catch (err: any) {
      toast.error(err.message || "Report generation failed");
    }
  }

  return (
    <section className="w-full mt-20" data-navbar="light">
      {/* HERO */}
     <div className="bg-gradient-to-b from-[#f7faf7] to-white">

        <div className="max-w-7xl mx-auto px-4 py-5">
          <p className="text-sm text-neutral-600">Nishad Gateway • Saudi Arabia</p>

          <h1 className="text-3xl md:text-5xl font-semibold mt-2 text-neutral-900">
            Calculate Your KSA Expansion Cost
          </h1>

          <p className="text-neutral-600 mt-3 max-w-2xl">
            Answer a few quick questions to estimate your Saudi business setup and operating costs.
            Get an instant AI-style recommendation with timeline and services.
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl border border-neutral-200 shadow-sm p-6 md:p-10 pt-0 bg-white">

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8 md:mt-0 border-neutral-200">
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={form.fullName}
              onChange={(v) => setForm((p) => ({ ...p, fullName: v }))}
            />

            <Input
              label="Email Address"
              placeholder="john@example.com"
              value={form.email}
              onChange={(v) => setForm((p) => ({ ...p, email: v }))}
            />

            <Input
              label="Mobile Number"
              placeholder="+966 50 000 0000"
              value={form.mobile}
              onChange={(v) => setForm((p) => ({ ...p, mobile: v }))}
            />

            <Select
              label="Investor Type"
              value={form.investorType}
              onChange={(v) => setForm((p) => ({ ...p, investorType: v as InvestorType }))}
              options={investorTypes}
              placeholder="Select Type..."
            />

            <Select
              label="Business Activity"
              value={form.activity}
              onChange={(v) => setForm((p) => ({ ...p, activity: v as ActivityType }))}
              options={activities}
              placeholder="Select Activity..."
            />

            <Select
              label="Preferred City"
              value={form.city}
              onChange={(v) => setForm((p) => ({ ...p, city: v as CityType }))}
              options={cities}
              placeholder="Select City..."
            />

            <Select
              label="Timeline Preference"
              value={form.timeline}
              onChange={(v) => setForm((p) => ({ ...p, timeline: v as TimelineType }))}
              options={timelines}
              placeholder="Select Timeline..."
            />

            <Input
              label="Number of Visas (Year 1)"
              placeholder="0"
              type="number"
              value={String(form.visas)}
              onChange={(v) => setForm((p) => ({ ...p, visas: Number(v || 0) }))}
            />
          </div>

          {/* Add-ons */}
          <div className="mt-7 rounded-2xl border border-neutral-200 p-4 md:p-5">
            <p className="text-sm font-medium text-neutral-900 mb-3">Optional Support</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <CheckItem
                checked={form.bankSupport}
                onChange={(v) => setForm((p) => ({ ...p, bankSupport: v }))}
                label="KSA Bank Setup Support"
              />
              <CheckItem
                checked={form.accountingSupport}
                onChange={(v) => setForm((p) => ({ ...p, accountingSupport: v }))}
                label="Accounting & transaction support"
              />
              <CheckItem
                checked={form.vroSupport}
                onChange={(v) => setForm((p) => ({ ...p, vroSupport: v }))}
                label="Visa & residency (VRO) support"
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={onCalculate}
            disabled={loading}
            className="mt-8 w-full rounded-full bg-green-700 hover:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed transition text-white font-medium py-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Sparkles className="w-5 h-5 animate-pulse" />
                Calculating...
              </>
            ) : (
              <>
             
                Calculate <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          {showOtp && (
          <OTPModal
            email={form.email}
            onVerify={verifyOtp}
            onClose={() => setShowOtp(false)}
            verifying={verifying}
          />
          )}    
        </div>

       <FAQSection
        title="Frequently Asked Questions"
        imageUrl="/faqimg.jpg"
        ctaTitle="Need clarity on your entity type?"
        ctaButtonText="Talk to an Advisor"
        onCtaClick={() => setOpenContact(true)}
        items={[
          {
            question: "Can a foreigner own 100% of a company in Saudi Arabia?",
            answer:
              "Yes, foreign investors can own 100% in many sectors depending on activity and approvals.",
          },
          {
            question: "Do I need to be in Saudi Arabia to register a company?",
            answer:
              "No. Company formation can usually be completed remotely through authorized representatives.",
          },
          {
            question: "How long does company setup take?",
            answer:
              "Typically 2–4 weeks depending on activity and documentation.",
          },
          {
            question: "Is a Saudi partner mandatory?",
            answer:
              "Not in most sectors. 100% foreign ownership is allowed in many activities.",
          },
        ]}
      />
 
      <ContactPopup
        open={openContact}
        onClose={() => setOpenContact(false)}
      />
      </div>
    </section>
  );
}

/* ---------- Small UI components ---------- */

function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-neutral-700">{label}</label>
      <input
        type={type}
        className="h-12 rounded-full border px-4 outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-neutral-700">{label}</label>
        <div className="relative">
          <select
            className="appearance-none h-12 w-full rounded-full border px-4 outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 bg-white"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">{placeholder}</option>
            {options.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>

           {/* Custom Arrow */}
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            ▼
          </div>
        </div> 
    </div>
  );
}

function CheckItem({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer hover:bg-neutral-50 transition">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-green-700"
      />
      <span className="text-sm text-neutral-800">{label}</span>
    </label>
  );
};