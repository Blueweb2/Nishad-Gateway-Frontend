"use client";

interface Props {
  title: string;
  description: string;
}

export default function SectorIntro({
  title,
  description,
}: Props) {
  return (
    <section className="bg-[#f4f4f4] py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h2 className="text-[40px] leading-[52px] font-semibold tracking-tight text-black">
          The Capital Built{" "}
          <span className="text-black">for</span>{" "}
          <span className="text-green-700">
            Investors,
          </span>
          <br />
          <span className="text-green-700">
            Founders & Explorers
          </span>
        </h2>

        {/* Paragraph */}
        <div className="mt-8 text-gray-600 text-[15px] leading-[28px] space-y-6">
          <p>
            Today, as one of the most powerful economic capitals in the Middle East is Riyadh. 
            Once a City clad in desert trade routes, it has been transformed into a{" "}
            <span className="text-green-700 font-medium">
              Global Investment Powerhouse
            </span>{" "}
            through national transformation agendas, developing infrastructure and entrepreneurship.
            <span className="text-green-700 font-medium">
              {" "}Foreign investors, founders of businesses, and corporate decision-makers
            </span>{" "}
            are able to find valuable{" "}
            <span className="text-green-700 font-medium">
              opportunities in Riyadh
            </span>.
          </p>

          <p>
            Through this guide, we provide an in-depth overview in terms of its Business,
            Quality of Life, Natural Escapes, Experiences, Activities, Mobility,
            and Future Growth. As a result, we present Riyadh to potential{" "}
            <span className="text-green-700 font-medium">
              international investors
            </span>{" "}
            with a clear understanding of what they may encounter prior to doing{" "}
            <span className="text-green-700 font-medium">
              business in Saudi Arabia.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}