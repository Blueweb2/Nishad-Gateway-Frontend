"use client";

import { useMemo,  useRef,  useState   } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

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
  const err = validateForm();
  if (err) {
    toast.error(err, {
      style: {
        backgroundColor: "#842029",
        color: "#f8d7da",
        border: "1px solid #f1aeb5",
        borderRadius: "8px",
      },
    });
    return;
  }

  setLoading(true);
  setResult(null);

  setTimeout(() => {
    const r = calculateEstimate();
    setResult(r);

    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    setLoading(false);

    toast.success("Estimate generated successfully!", {
      style: {
        backgroundColor: "#0f5132",
        color: "#d1e7dd",
        border: "1px solid #2f9e44",
        borderRadius: "8px",
      },
    });
  }, 900);
}

// add logo inside pdf
async function getBase64FromUrl(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function addWatermarkBehind(doc: any) {
  doc.setTextColor(235); // very light gray
  doc.setFontSize(55);
  doc.text("NISHAD GATEWAY", 20, 170, { angle: 30 });

  // reset color for normal content
  doc.setTextColor(0);
}



async function downloadPDF() {
  if (!result) {
    toast.error("Please calculate estimate first.");
    return;
  }

  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF();



  // Logo
  try {
    const logoBase64 = await getBase64FromUrl(
  `${window.location.origin}/coloredlogo.png`
);
    doc.addImage(logoBase64, "PNG", 14, 10, 55, 14);

    doc.setFontSize(16);
doc.text("KSA Expansion Cost Estimate", 14, 35);
  } catch (error) {
    console.log("Logo load failed:", error);
  }

  addWatermarkBehind(doc);
  // Header
  doc.setFontSize(16);
  doc.text("KSA Expansion Cost Estimate", 14, 35);

  doc.setFontSize(10);
  doc.text(`Report ID: ${result.reportId}`, 14, 42);
  doc.text(`Date: ${result.reportDate}`, 150, 42);

  // Client details
  doc.setFontSize(12);
  doc.text("Client Details", 14, 55);

  doc.setFontSize(10);
  doc.text(`Full Name: ${form.fullName}`, 14, 63);
  doc.text(`Email: ${form.email}`, 14, 70);
  doc.text(`Mobile: ${form.mobile}`, 14, 77);

  // Business inputs
  doc.setFontSize(12);
  doc.text("Business Inputs", 14, 90);

  doc.setFontSize(10);
  doc.text(`Investor Type: ${form.investorType}`, 14, 98);
  doc.text(`Business Activity: ${form.activity}`, 14, 105);
  doc.text(`Preferred City: ${form.city}`, 14, 112);
  doc.text(`Timeline Preference: ${form.timeline}`, 14, 119);
  doc.text(`Visas (Year 1): ${form.visas}`, 14, 126);

  // Estimated result summary
  doc.setFontSize(12);
  doc.text("Estimated Summary", 14, 140);

  doc.setFontSize(10);
  doc.text(
    `Estimated Cost Range: SAR ${result.min.toLocaleString()} – ${result.max.toLocaleString()}`,
    14,
    148
  );
  doc.text(`Expected Timeline: ${result.timelineText}`, 14, 155);
  doc.text(`Recommended Setup: ${result.recommendedSetup}`, 14, 162);
  doc.text(`Suggested City: ${result.suggestedCity}`, 14, 169);

  // Cost Breakdown Table
  doc.setFontSize(12);
  doc.text("Cost Breakdown (Approximate)", 14, 182);

  const tableRows = result.breakdown
    .filter((item) => item.min !== 0 || item.max !== 0)
    .map((item) => [
      item.label,
      `SAR ${item.min.toLocaleString()}`,
      `SAR ${item.max.toLocaleString()}`,
    ]);

  autoTable(doc, {
    startY: 188,
    head: [["Item", "Min", "Max"]],
    body: tableRows,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [11, 106, 103] }, // Nishad theme color
    margin: { left: 14, right: 14 },
  });

  // After table position
  const finalY = (doc as any).lastAutoTable?.finalY || 240;

  // AI Explanation
  doc.setFontSize(12);
  doc.text("AI Explanation", 14, finalY + 10);

  doc.setFontSize(10);
  let y = finalY + 18;

  result.notes.slice(0, 4).forEach((note) => {
    const lines = doc.splitTextToSize(`• ${note}`, 180);
    doc.text(lines, 16, y);
    y += lines.length * 6;
  });

  // Footer
  doc.setFontSize(9);
  doc.text(
    "Note: This estimate is approximate. Final pricing may vary based on approvals and documentation.",
    14,
    285
  );

  doc.save(`KSA_Expansion_Report_${result.reportId}.pdf`);

  toast.success("PDF downloaded successfully ", {
    style: {
      backgroundColor: "#0f5132",
      color: "#d1e7dd",
      border: "1px solid #2f9e44",
      borderRadius: "8px",
    },
  });
}



  

  return (
    <section className="w-full" data-navbar="white">
      {/* HERO */}
     <div className="bg-gradient-to-b from-[#f7faf7] to-white border-b border-neutral-200">

        <div className="max-w-6xl mx-auto px-4 py-12">
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
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-3xl border border-neutral-200 shadow-sm p-6 md:p-10 bg-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">
                Expansion Cost Calculator
              </h2>
              <p className="text-neutral-600 mt-1">
                Fill the details below to get your estimated cost range.
              </p>
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
              <X className="w-5 h-5 text-neutral-500" />
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
                Calculate Estimated Cost <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Result */}
       {result && (
  <div
    ref={resultRef}
    className="mt-10 rounded-3xl border border-neutral-200 bg-[#f7faf7] p-6 md:p-8"
  >

    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-neutral-900">
          Instant AI Estimate ✨
        </h3>
        <p className="text-sm text-neutral-600 mt-1">
          Based on your inputs, here’s an instant expansion estimate.
        </p>
      </div>

      <span className="text-xs px-3 py-1 rounded-full bg-white border text-neutral-700">
        AI Generated
      </span>
    </div>

    {/* Main Summary */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-2xl bg-white border border-neutral-200 p-5">
        <p className="text-xs text-neutral-500">Estimated Cost</p>
        <p className="text-2xl font-semibold text-neutral-900 mt-1">
          SAR {result.min.toLocaleString()} – {result.max.toLocaleString()}
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-neutral-200 p-5">
        <p className="text-xs text-neutral-500">Timeline</p>
        <p className="text-xl font-semibold text-neutral-900 mt-1">
          {result.timelineText}
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-neutral-200 p-5">
        <p className="text-xs text-neutral-500">Recommended Setup</p>
        <p className="text-base font-semibold text-neutral-900 mt-1">
          {result.recommendedSetup}
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-neutral-200 p-5">
        <p className="text-xs text-neutral-500">Suggested City</p>
        <p className="text-base font-semibold text-neutral-900 mt-1">
          {result.suggestedCity}{" "}
          <span className="text-neutral-500 font-normal text-sm">
            (best based on your selection)
          </span>
        </p>
      </div>
    </div>

    {/* Includes + Addons */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-2xl bg-white border border-neutral-200 p-5">
        <p className="text-sm font-semibold text-neutral-900">Includes</p>
        <ul className="mt-3 space-y-2 text-sm text-neutral-700 list-disc pl-5">
          {result.includes.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white border border-neutral-200 p-5">
        <p className="text-sm font-semibold text-neutral-900">Extra Add-ons</p>
        {result.extraAddons.length > 0 ? (
          <ul className="mt-3 space-y-2 text-sm text-neutral-700 list-disc pl-5">
            {result.extraAddons.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-neutral-600">
            No add-ons selected.
          </p>
        )}
      </div>
    </div>

    {/* AI Notes */}
    <div className="mt-6">
      <p className="text-sm font-semibold text-neutral-900">AI Explanation</p>
      <ul className="mt-2 space-y-2 text-sm text-neutral-700 list-disc pl-5">
        {result.notes.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>

    {/* Buttons */}
    <div className="mt-7 flex flex-col md:flex-row gap-3">
      <button
        className="w-full md:w-auto px-6 py-3 rounded-full bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition"
      onClick={downloadPDF}
      >
        Get PDF Report
      </button>

      <a
        href="/contact"
        className="w-full md:w-auto px-6 py-3 rounded-full border border-neutral-300 bg-white font-medium text-center hover:bg-neutral-50 transition"
      >
        Book Free Consultation
      </a>

      <a
        href="https://wa.me/966551234567"
        target="_blank"
        rel="noreferrer"
        className="w-full md:w-auto px-6 py-3 rounded-full bg-green-700 text-white font-medium text-center hover:bg-green-800 transition"
      >
        WhatsApp Now
      </a>
    </div>
  </div>
)}

        </div>

        {/* SEO Content */}
        <div className="mt-12 max-w-4xl">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Saudi Arabia Business Setup Cost – What Affects the Price?
          </h2>
          <p className="text-neutral-600 mt-3 leading-relaxed">
            The cost of expanding to Saudi Arabia depends on your business activity, preferred city,
            visa requirements, and support services such as accounting, bank setup, and residency (VRO).
            This calculator gives an approximate cost range to help you plan faster.
          </p>

          <h3 className="text-xl font-semibold text-neutral-900 mt-8">
            Frequently Asked Questions
          </h3>

          <div className="mt-4 space-y-4">
            <FAQ
              q="Is this calculator 100% accurate?"
              a="It provides an estimated cost range based on common setup requirements. Final cost may vary depending on approvals, documents, and government fees."
            />
            <FAQ
              q="Which city is best for business expansion?"
              a="Riyadh is ideal for corporate expansion, Jeddah for trade/logistics, and Dammam/Khobar for industrial and regional business."
            />
            <FAQ
              q="How many visas should I plan for in Year 1?"
              a="It depends on your activity and operations. Most businesses start with 1–5 visas and expand based on hiring needs."
            />
          </div>
        </div>
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
