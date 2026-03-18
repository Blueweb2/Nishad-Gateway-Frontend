"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getServicesMenu } from "@/lib/api/public/services.api";
import Select from "../ui/Select";
import toast from "react-hot-toast";
import Link from "next/link";

type SubServiceItem = {
  _id: string;
  title: string;
  slug: string;
};

type ServiceItem = {
  _id: string;
  title: string;
  slug: string;
  subServices: SubServiceItem[];
};

export default function ContactPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [render, setRender] = useState(open);

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [sending, setSending] = useState(false);
  //const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [agreed, setAgreed] = useState(false);

  const serviceOptions = services.map((service) => ({
    label: service.title,
    options:
      service.subServices?.map((sub) => ({
        label: sub.title,
        value: sub._id,
      })) || [],
  }));
  const cityOptions = [
    {
      label: "Cities",
      options: [
        { label: "Dammam | Al Khobar | KSA", value: "ksa" },
        { label: "United Arab Emirates", value: "uae" },
        { label: "Qatar", value: "qatar" },
        { label: "Oman", value: "oman" },
        { label: "United Kingdom", value: "uk" },
        { label: "India", value: "india" },
        { label: "China", value: "china" },
        { label: "USA", value: "usa" },
      ],
    },
  ];
  useEffect(() => {
    if (open) setRender(true);
    else {
      const t = setTimeout(() => setRender(false), 500);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const loadData = async () => {
      try {
        //setLoading(true);


        const servicesRes = await getServicesMenu();
        console.log("servicesRes", servicesRes);


        setServices(servicesRes?.data || []);

      } catch (err) {
        console.error("Failed loading contact data");
      } 
    };

    loadData();
  }, [open]);

  // SUBMIT FORM
  const handleSubmit = async (e?: React.MouseEvent) => {

    e?.preventDefault();

if (!name || !phone || !email || !serviceName || !city) {
  toast.error("Please fill all required fields");
  return;
}

if (!agreed) {
  toast.error("Please accept the Privacy Policy");
  return;
}

    try {
      setSending(true);
      console.log("Submitting:", { name, phone, email, service, city });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            email,
            service,
            serviceName,
            city,
          }),
        }
      );


      // console.log("Response status:", res.status);

      if (!res.ok) throw new Error();

      toast.success("Message sent successfully");

    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };


  // ESC close
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  if (!render) return null;


  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm transition-opacity duration-500"
        style={{ opacity: open ? 1 : 0 }}
      />

      {/* POPUP */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          fixed z-[9999]

          /* MOBILE — center */
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[92%] max-w-[360px]

          /* DESKTOP — right side */
          md:top-28 md:right-10 md:left-auto md:translate-x-0 md:translate-y-0 md:w-[420px]
          ${open ? "animate-sheetReveal" : "animate-sheetHide"}
        `}
      >
        <div className="bg-white rounded-[28px] shadow-2xl border border-black/10 max-h-[85vh] overflow-y-auto hide-scrollbar  pb-6">
          {/* Header */}
          <div className="flex items-center justify-between px-7 pt-6 pb-4">
            <h2 className="text-[22px] font-semibold text-gray-900">
              Get in Touch
            </h2>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <div className="px-7 pb-7">
            {/* Name */}
            <label className="block text-xs text-gray-700 mb-2">
              <span className="text-red-500">*</span> Name
            </label>
            <input
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b border-gray-200 focus:border-gray-500 outline-none py-2 mb-5 text-sm"
            />

            {/* Phone */}
            <label className="block text-xs text-gray-700 mb-2">
              <span className="text-red-500">*</span> Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e => (setPhone(e.target.value)))}
              className="w-full border-b border-gray-200 focus:border-gray-500 outline-none py-2 mb-5 text-sm"
            />

            {/* Email */}
            <label className="block text-xs text-gray-700 mb-2">
              <span className="text-red-500">*</span> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e => (setEmail(e.target.value)))}
              className="w-full border-b border-gray-200 focus:border-gray-500 outline-none py-2 mb-5 text-sm"
            />

            {/* Select a Service */}



            <div className="relative mb-5">
              <label className="block text-xs text-gray-700 mb-2">
                Select a Service
              </label>

              <Select
                options={serviceOptions}
                placeholder="Select a service"
                onChange={(value) => {
                  setService(value);

                  const selected = services
                    .flatMap((s) => s.subServices)
                    .find((s) => s._id === value);

                  setServiceName(selected?.title || "");
                }}
              />

            </div>



            {/* Country of Interest */}
            <div className="relative mb-6">


              <label className="block text-xs text-gray-700 mb-2">
                Country of Interest
              </label>

              <Select
                options={cityOptions}
                placeholder="Select city"
                className="mb-6"
                onChange={(value) => (setCity(value))}
              />


            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3 mb-8">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 rounded"
              />           <p className="text-xs text-gray-600">
                I agree with the{" "}
                <Link
                  href="/privacy-policy"
                  className="text-gray-900 underline hover:text-green-700"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button onClick={handleSubmit} disabled={sending} className="px-8 py-3 rounded-full bg-green-700 text-white text-sm font-medium hover:bg-green-600 transition">
                {sending ? "Sending..." : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
