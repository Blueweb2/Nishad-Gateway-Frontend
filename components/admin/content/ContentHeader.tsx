export default function ContentHeader({ title, description }: any) {

  return (
    <div className="mb-8">

      <h1 className="text-2xl font-semibold text-white">
        {title}
      </h1>

      <p className="text-sm text-white/60 mt-1">
        {description}
      </p>

    </div>
  );
}