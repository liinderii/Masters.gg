import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

type Props = {
  name: string;
  tagline?: string;
  imageSrc: string;
  imageAlt?: string;
  onClick?: () => void;
};

export const SponsorCard = ({
  name,
  tagline,
  imageSrc,
  imageAlt,
  onClick,
}: Props) => {
  return (
    <Card className="overflow-hidden rounded-xl bg-white/5 border border-white/10 ring-1 ring-emerald-400/20 hover:ring-emerald-400/35 transition">
      <button type="button" onClick={onClick} className="w-full text-left">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold pl-3 border-l-2 border-emerald-400">
            {name}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0">
          <img
            src={imageSrc}
            alt={imageAlt ?? name}
            className="h-28 w-full object-cover"
            loading="lazy"
          />
          <p className="text-sm font-medium">{tagline ?? "Visit sponsor"}</p>
          <p className="text-xs opacity-70">Sponsored</p>
        </CardContent>
      </button>
    </Card>
  );
};
