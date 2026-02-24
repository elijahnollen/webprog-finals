interface SectionCardProps {
  title: string;
  description: string;
}

export function SectionCard({ title, description }: SectionCardProps) {
  return (
    <article className="rounded-xl border border-ink/30 bg-paperStrong p-4">
      <h3 className="mb-1 text-base font-semibold md:text-lg">{title}</h3>
      <p className="text-sm text-ink/85 md:text-base">{description}</p>
    </article>
  );
}
