import FadeUpScroll from "../ui/FadeUpScroll";
import MinistriesSlider from "@/components/user/home/ministries/MinistriesSlider";
import { getMinistries } from "@/lib/api/public/ministries.api";
import { Ministry } from "@/lib/types/ministry";

export const revalidate = 60;

export default async function MinistriesSection() {
let ministries: Ministry[] = [];
  try {
    ministries = await getMinistries();
  } catch (error) {
    console.error("Failed to fetch ministries", error);
  }

  if (!ministries?.length) return null;

  return (
    <section  id="ministries" className="w-full bg-black text-white py-28 mx-auto px-6 flex items-center justify-end" data-navbar="light">
      <div className="max-w-[1320px] px-6">

        {/* HEADER */}
        <div className="text-center mb-20">

          <FadeUpScroll delay={0.1}>
            <h2 className="mb-3 text-2xl sm:text-3xl lg:text-[38px] font-bold leading-tight">
              Ministries & Authorities
            </h2>
          </FadeUpScroll>

          <FadeUpScroll delay={0.2}>
            <p className="text-white/60 max-w-xl mx-auto">
              Clear decisions rely on understanding the institutions that shape
              policy, regulation, and execution in Saudi Arabia.
            </p>
          </FadeUpScroll>

        </div>

        {/* SLIDER */}
        <MinistriesSlider ministries={ministries} />

      </div>
    </section>
  );
}