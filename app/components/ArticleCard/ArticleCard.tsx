export interface ArticleCardProps {
  img: string;
  alt: string;
  title: string;
  desc: string;
}
export const ArticleCard: React.FC<ArticleCardProps> = ({ img, alt, title, desc }) => (
  <article className="bg-[#2a1910] rounded-lg overflow-hidden">
    <img src={img} alt={alt} width={600} height={400} className="object-cover w-full h-48" />
    <div className="p-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm">{desc}</p>
    </div>
  </article>
);
