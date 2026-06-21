import { productKit } from "@/data/siteContent";

type Variant = "men" | "women";
type Size = "sm" | "md" | "lg";

interface ProductKitProps {
  variant: Variant;
  size?: Size;
  className?: string;
}

export default function ProductKit({ variant, size = "md", className = "" }: ProductKitProps) {
  const isMen = variant === "men";
  const accent = isMen ? "#1b6f9b" : "#8f3d63";
  const bg = isMen ? "#eaf4f8" : "#f7edf2";
  const copy = isMen ? productKit.men : productKit.women;
  const scale = size === "sm" ? 0.72 : size === "lg" ? 1.12 : 1;

  const lines = copy.productLine.split(" ");

  return (
    <div className={`inline-flex items-end gap-1.5 ${className}`} aria-hidden="true">
      <div
        className="flex flex-col justify-between rounded-[3px]"
        style={{
          width: 96 * scale,
          height: 62 * scale,
          background: bg,
          border: `1px solid ${accent}35`,
          padding: `${8 * scale}px`,
        }}
      >
        <span
          style={{
            fontSize: 7 * scale,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: accent,
            textTransform: "uppercase",
          }}
        >
          HRT.org
        </span>
        <span
          style={{
            fontSize: 6 * scale,
            color: "#1f2a33",
            lineHeight: 1.25,
            fontWeight: 500,
          }}
        >
          {lines.slice(0, 2).join(" ")}
          {lines.length > 2 && (
            <>
              <br />
              {lines.slice(2).join(" ")}
            </>
          )}
        </span>
        <span style={{ fontSize: 5.5 * scale, color: accent }}>{copy.formula}</span>
      </div>
      <div
        className="relative rounded-full"
        style={{
          width: 24 * scale,
          height: 78 * scale,
          background: bg,
          border: `1px solid ${accent}45`,
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-[2px]"
          style={{
            top: 5 * scale,
            width: 14 * scale,
            height: 9 * scale,
            background: accent,
          }}
        />
      </div>
    </div>
  );
}
