export default function BusinessVerticals() {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-12 text-center">
          Our Global Business Verticals
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-xl">Business Consultation</div>
          <div className="p-6 border rounded-xl">Investment Advisory</div>
          <div className="p-6 border rounded-xl">Strategic Partnerships</div>
        </div>
      </div>
    </section>
  );
}