import ServiceForm from "@/components/admin/services/ServiceForm";

export default function CreateServicePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1200px] mx-auto">
        <ServiceForm mode="create" />
      </div>
    </div>
  );
}
