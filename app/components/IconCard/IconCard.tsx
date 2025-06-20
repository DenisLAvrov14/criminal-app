export interface IconCardProps {
  href: string;
  src: string;
  label: string;
  size?: number;
}
export const IconCard: React.FC<IconCardProps> = ({ href, src, label, size = 5 }) => (
  <a
    href={href}
    className="bg-[#3f2c1a] rounded-lg text-center border-2 border-[#f5e8c7] hover:border-opacity-50 hover:bg-opacity-80 p-6"
  >
    <span
      className="icon-mask mx-auto mb-3"
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        backgroundColor: '#f5e8c7',
      }}
    />
    <h3 className="mt-1 text-lg font-semibold uppercase">{label}</h3>
  </a>
);
