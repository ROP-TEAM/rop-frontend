"use client";

import Link from "next/link";
import React, { useEffect, useState, memo } from "react";

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

type Processed = { inner: string; attrs: Record<string, string> };

const svgCache = new Map<string, Processed>();
const inFlight = new Map<string, Promise<Processed>>(); // ✅ dedupe fetch ซ้ำ

function processSvg(
  raw: string,
  {
    color,
    fixColor,
    size,
    width,
    height,
  }: Pick<Props, "color" | "fixColor" | "size" | "width" | "height">,
): Processed {
  let s = raw.replace(/<\?xml.*?\?>\s*/g, "");
  const finalColor = color ?? "currentColor";
  if (!fixColor) {
    s = s.replace(/fill="(?!none)[^"]*"/gi, `fill="${finalColor}"`);
    s = s.replace(/stroke="(?!none)[^"]*"/gi, `stroke="${finalColor}"`);
  }

  const m = s.match(/<svg([^>]*)>([\s\S]*?)<\/svg>/i);
  const attrsText = m?.[1] ?? "";
  const inner = m?.[2] ?? s;

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

async function loadSvg(
  cacheKey: string,
  svg: string | undefined,
  src: string | undefined,
  opts: Pick<Props, "color" | "fixColor" | "size" | "width" | "height">,
): Promise<Processed | null> {
  if (svgCache.has(cacheKey)) return svgCache.get(cacheKey)!;
  if (inFlight.has(cacheKey)) return inFlight.get(cacheKey)!;

  const p = (async () => {
    let raw: string | null = null;
    if (svg) {
      raw = svg;
    } else if (src) {
      const res = await fetch(src);
      if (!res.ok) {
        console.warn("Failed to fetch svg:", src, res.status);
        return null as unknown as Processed;
      }
      raw = await res.text();
    }
    if (raw == null) return null as unknown as Processed;

    const processed = processSvg(raw, opts);
    svgCache.set(cacheKey, processed);
    return processed;
  })();

  inFlight.set(cacheKey, p);
  try {
    return await p;
  } finally {
    inFlight.delete(cacheKey);
  }
}

function IconSvgMonoBase({
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
  const [data, setData] = useState<Processed | null>(cached ?? null);

  useEffect(() => {
    if (svgCache.has(cacheKey)) {
      setData(svgCache.get(cacheKey)!);
      return;
    }

    let cancelled = false;
    loadSvg(cacheKey, svg, src, { color, fixColor, size, width, height }).then(
      (res) => {
        if (!cancelled && res) setData(res);
      },
    );

    return () => {
      cancelled = true;
    };
  }, [cacheKey, svg, src, width, height, size, color, fixColor]);

  if (!data) return null;

  const svgProps: React.SVGProps<SVGSVGElement> = {};
  for (const k in data.attrs) {
    const propName = k === "viewbox" ? "viewBox" : k;
    (svgProps as unknown as Record<string, string>)[propName] = data.attrs[k];
  }

  svgProps.role = "img";
  if (alt) svgProps["aria-label"] = alt;

  return (
    <svg
      className={className}
      {...svgProps}
      dangerouslySetInnerHTML={{ __html: data.inner }}
    />
  );
}

const IconSvgMono = memo(IconSvgMonoBase);
export default IconSvgMono;
