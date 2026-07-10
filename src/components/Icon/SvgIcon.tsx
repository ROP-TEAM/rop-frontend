"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  svg?: string;
  src?: string;
  width?: number;
  height?: number;
  size?: number;
  color?: string;
  className?: string;
  alt?: string;
  fixColor?: boolean;
};

const svgCache = new Map<
  string,
  { inner: string; attrs: Record<string, string> }
>();

function processSvg(
  raw: string,
  {
    color,
    fixColor,
    size,
    width,
    height,
  }: Pick<Props, "color" | "fixColor" | "size" | "width" | "height">,
) {
  let s = raw.replace(/<\?xml.*?\?>\s*/g, "");
  const finalColor = color ?? "currentColor";
  if (!fixColor) {
    s = s.replace(/fill="(?!none)[^"]*"/gi, `fill="${finalColor}"`);
    s = s.replace(/stroke="(?!none)[^"]*"/gi, `stroke="${finalColor}"`);
  }

  const m = s.match(/<svg([^>]*)>([\s\S]*?)<\/svg>/i);
  let attrsText = "";
  let inner = s;
  if (m) {
    attrsText = m[1] || "";
    inner = m[2] || "";
  }

  const attrs: Record<string, string> = {};
  attrsText.replace(/([^\s=]+)\s*=\s*"([^"]*)"/g, (_, k, v) => {
    attrs[k] = v;
    return "";
  });

  const finalSize = size ?? undefined;
  if (finalSize) {
    attrs.width = String(finalSize);
    attrs.height = String(finalSize);
  } else {
    attrs.width = String(width);
    attrs.height = String(height);
  }

  return { inner, attrs };
}

export default function IconSvgMono({
  svg,
  src,
  width = 24,
  height = 24,
  size,
  color,
  className,
  alt,
  fixColor = false,
}: Props) {
  const cacheKey = `${src ?? svg ?? ""}|${size ?? width}x${size ?? height}|${color ?? ""}|${fixColor}`;

  const cached = svgCache.get(cacheKey);
  const [svgInner, setSvgInner] = useState<string | null>(
    cached?.inner ?? null,
  );
  const [svgAttrs, setSvgAttrs] = useState<Record<string, string>>(
    cached?.attrs ?? {},
  );

  useEffect(() => {
    if (svgCache.has(cacheKey)) {
      const c = svgCache.get(cacheKey)!;
      setSvgInner(c.inner);
      setSvgAttrs(c.attrs);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        let raw: string | null = null;
        if (svg) {
          raw = svg;
        } else if (src) {
          const res = await fetch(src);
          if (!res.ok) {
            console.warn("Failed to fetch svg:", src, res.status);
            return;
          }
          raw = await res.text();
        }

        if (raw == null) {
          if (!cancelled) {
            setSvgInner(null);
            setSvgAttrs({});
          }
          return;
        }

        const { inner, attrs } = processSvg(raw, {
          color,
          fixColor,
          size,
          width,
          height,
        });
        svgCache.set(cacheKey, { inner, attrs }); // ✅ เก็บ cache

        if (!cancelled) {
          setSvgInner(inner);
          setSvgAttrs(attrs);
        }
      } catch (e) {
        console.warn("Error processing svg:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [cacheKey, svg, src, width, height, size, color, fixColor]);

  if (!svgInner) return null;

  const svgProps: React.SVGProps<SVGSVGElement> = {};
  for (const k in svgAttrs) {
    const propName = k === "viewbox" ? "viewBox" : k;
    (svgProps as unknown as Record<string, string>)[propName] = svgAttrs[k];
  }

  svgProps.role = "img";
  if (alt) svgProps["aria-label"] = alt;

  return (
    <svg
      className={className}
      {...svgProps}
      dangerouslySetInnerHTML={{ __html: svgInner }}
    />
  );
}
