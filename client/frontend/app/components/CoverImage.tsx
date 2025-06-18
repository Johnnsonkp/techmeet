import { Image } from "next-sanity/image";
import { getImageDimensions } from "@sanity/asset-utils";
import { stegaClean } from "@sanity/client/stega";
import { urlForImage } from "@/sanity/lib/utils";

interface CoverImageProps {
  image: any;
  priority?: boolean;
}

interface CoverImageCustomProps {
  image: any;
  priority?: boolean;
  height: number;
  width: number;
}

export default function CoverImage(props: CoverImageProps) {
  const { image: source, priority } = props;
  const image = source?.asset?._ref ? (
    <Image
      className="object-cover"
      width={getImageDimensions(source).width}
      height={getImageDimensions(source).height}
      alt={stegaClean(source?.alt) || ""}
      src={urlForImage(source)?.url() as string}
      priority={priority}
    />
  ) : null;

  return <div className="relative">{image}</div>;
}

export function CoverImageCustom(props: CoverImageCustomProps) {
  const { image: source, priority, height, width } = props;
  const image = source?.asset?._ref ? (
    <Image
      className="object-cover"
      width={width}
      height={height}
      alt={stegaClean(source?.alt) || ""}
      src={urlForImage(source)?.url() as string}
      priority={priority}
    />
  ) : null;

  return <div className="relative">{image}</div>;
}
