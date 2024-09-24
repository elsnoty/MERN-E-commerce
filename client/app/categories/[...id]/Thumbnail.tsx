import Image from 'next/image';

interface ThumbnailProps {
  src: string;
  alt: string;
  onHover: () => void;
}

const Thumbnail = ({src, alt, onHover}:ThumbnailProps) => (
  <Image
    src={src}
    alt={alt}
    width={70}
    height={70}
    onMouseEnter={onHover}
    className="cursor-pointer"
  />
);

export default Thumbnail;
