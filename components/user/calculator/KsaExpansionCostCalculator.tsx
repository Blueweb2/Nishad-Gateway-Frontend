"use client";

import { useMemo,  useRef,  useState   } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import FAQSection from "../shared/FAQSection";
import OTPModal from "./OTPModal";


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
type CostBreakdownItem = {
  label: string;
  min: number;
  max: number;
};


type ResultState = {
  min: number;
  max: number;
  timelineText: string;
  recommendedSetup: string;
  suggestedCity: string;
  includes: string[];
  extraAddons: string[];
  notes: string[];
  breakdown: CostBreakdownItem[];
  reportId: string;
  reportDate: string;
};



export default function KsaExpansionCostCalculator() {
  const [loading, setLoading] = useState(false);
const [showOtp, setShowOtp] = useState(false);
const [otp, setOtp] = useState("");
const [verifying, setVerifying] = useState(false);
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

  const [result, setResult] = useState<ResultState | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);


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
// breakdown array

  const breakdown = [
  { label: "Company registration & licensing", min: 12000, max: 18000 },
  { label: "Documentation & compliance support", min: 3000, max: 6000 },
  { label: "Visa processing (per visa)", min: 3500 * form.visas, max: 5500 * form.visas },
  { label: "Bank setup support", min: form.bankSupport ? 2500 : 0, max: form.bankSupport ? 4500 : 0 },
  { label: "Accounting package", min: form.accountingSupport ? 1500 : 0, max: form.accountingSupport ? 3500 : 0 },
  { label: "VRO support", min: form.vroSupport ? 4000 : 0, max: form.vroSupport ? 7000 : 0 },
];

  const cities: CityType[] = useMemo(
    () => ["Riyadh", "Jeddah", "Dammam", "Khobar"],
    []
  );

  const timelines: TimelineType[] = useMemo(
    () => ["Urgent (1-2 weeks)", "Normal (3-4 weeks)", "Flexible (1-2 months)"],
    []
  );

  // ---------- simple hybrid estimation (rules) ----------
function calculateEstimate(): ResultState {
  let baseMin = 18000;
  let baseMax = 28000;

  // activity multiplier
  const activityBoost: Record<ActivityType, number> = {
    "IT / Software": 1.15,
    Trading: 1.25,
    Consulting: 1.1,
    Restaurant: 1.35,
    Construction: 1.4,
    Logistics: 1.3,
    Healthcare: 1.5,
  };

  if (form.activity) {
    baseMin *= activityBoost[form.activity];
    baseMax *= activityBoost[form.activity];
  }

  // city adjustment
  const cityBoost: Record<CityType, number> = {
    Riyadh: 1.15,
    Jeddah: 1.1,
    Dammam: 1.05,
    Khobar: 1.05,
  };

  if (form.city) {
    baseMin *= cityBoost[form.city];
    baseMax *= cityBoost[form.city];
  }

  // timeline adjustment
  let timelineText = "3–4 weeks";
  if (form.timeline === "Urgent (1-2 weeks)") {
    baseMin *= 1.15;
    baseMax *= 1.25;
    timelineText = "7–14 working days";
  } else if (form.timeline === "Flexible (1-2 months)") {
    baseMin *= 0.95;
    baseMax *= 1.0;
    timelineText = "4–8 weeks";
  }

  // visas cost
  const visaCostPerVisaMin = 3500;
  const visaCostPerVisaMax = 5500;
  baseMin += form.visas * visaCostPerVisaMin;
  baseMax += form.visas * visaCostPerVisaMax;

  // add-ons
  if (form.bankSupport) {
    baseMin += 2500;
    baseMax += 4500;
  }
  if (form.accountingSupport) {
    baseMin += 1500;
    baseMax += 3500;
  }
  if (form.vroSupport) {
    baseMin += 4000;
    baseMax += 7000;
  }

  // recommended setup
  const recommendedSetup =
    form.investorType === "Startup"
      ? "LLC (Startup Friendly Setup)"
      : form.investorType === "Company"
      ? "LLC (Foreign Company Expansion)"
      : "LLC (Standard Business Setup)";

  // AI notes
  const notes: string[] = [];

  if (form.activity) {
    notes.push(
      `Because you selected “${form.activity}”, your licensing and compliance requirements may affect the final cost.`
    );
  }

  if (form.city) {
    notes.push(
      `Your preferred city “${form.city}” influences operational and setup support cost based on local requirements.`
    );
  }

  if (form.visas > 0) {
    notes.push(
      `You selected ${form.visas} visa(s) for Year 1, which adds visa & residency processing cost.`
    );
  }

  if (form.timeline) {
    notes.push(`Your timeline preference is “${form.timeline}”.`);
  }

  notes.push(
    "This estimate is an approximate range. Final cost may vary based on approvals and documentation."
  );

  // includes + addons
  const includes = [
    "Company registration",
    "Documentation support",
    "Initial compliance guidance",
  ];

  const extraAddons: string[] = [];
  if (form.vroSupport) extraAddons.push("VRO support");
  if (form.accountingSupport) extraAddons.push("Accounting package");
  if (form.bankSupport) extraAddons.push("Bank setup support");


  const now = new Date();
const reportDate = now.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const reportId = `NG-${now.getFullYear()}-${Math.floor(
  100000 + Math.random() * 900000
)}`;

  // final return
  return {
  min: Math.round(baseMin),
  max: Math.round(baseMax),
  timelineText,
  recommendedSetup,
  suggestedCity: form.city || "Riyadh",
  includes,
  extraAddons,
  notes,
  breakdown,
  reportId,
  reportDate,
};

}


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
     <div className="bg-gradient-to-b from-[#f7faf7] to-white border-b border-neutral-200">

        <div className="max-w-7xl mx-auto px-4 py-12">
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
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-3xl border border-neutral-200 shadow-sm p-6 md:p-10 bg-white">
          <div className="flex items-start justify-between gap-4">
            <div>
            
              <h4 className="text-neutral-600 mt-1">
                Fill the details below to get your estimated cost range.
              </h4>
            </div>

            <button
              className="p-2 rounded-full hover:bg-neutral-100 transition"
              onClick={() => {
                setForm({
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
                setResult(null);
              }}
              aria-label="Reset form"
              title="Reset"
            >
             
            </button>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8 border-neutral-200">
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
)}    </div>

       <FAQSection
  title="Frequently Asked Questions"
  imageUrl="/faqimg.jpg"
  ctaTitle="Need clarity on your entity type?"
  ctaButtonText="Talk to an Advisor"
  onCtaClick={() => window.location.href = "/contact"}
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
      <select
        className="h-12 rounded-full border px-4 outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 bg-white"
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
}

function StatCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <p className="text-xs text-neutral-500">{title}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-5 bg-white">
      <p className="font-semibold text-neutral-900">{q}</p>
      <p className="text-neutral-600 mt-2">{a}</p>
    </div>
  );
}
