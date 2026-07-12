const HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  quot: '"',
  apos: "'",
  "#39": "'",
  lt: "<",
  gt: ">",
};

export function decodeHtmlEntities(text: string): string {
  return text.replace(
    /&(#39|amp|quot|apos|lt|gt);/g,
    (match, entity) => HTML_ENTITIES[entity] ?? match
  );
}

function extractMetaContent(
  html: string,
  key: string,
  attr: "property" | "name" = "property"
): string | null {
  const patterns = [
    new RegExp(
      `<meta[^>]*${attr}=["']${key}["'][^>]*content=["']([^"']*)["'][^>]*>`,
      "i"
    ),
    new RegExp(
      `<meta[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${key}["'][^>]*>`,
      "i"
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decodeHtmlEntities(match[1]).trim();
  }

  return null;
}

function extractTitleTag(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? decodeHtmlEntities(match[1]).trim() : null;
}

function resolveUrl(possiblyRelative: string, base: URL): string {
  try {
    return new URL(possiblyRelative, base).toString();
  } catch {
    return "";
  }
}

export function extractOpenGraph(html: string, pageUrl: URL) {
  const title =
    extractMetaContent(html, "og:title") ??
    extractTitleTag(html) ??
    pageUrl.hostname;
  const description =
    extractMetaContent(html, "og:description") ??
    extractMetaContent(html, "description", "name") ??
    "";
  const rawImage = extractMetaContent(html, "og:image");
  const thumbnail = rawImage ? resolveUrl(rawImage, pageUrl) : "";

  return { title, description, thumbnail };
}

export function isPrivateHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (lower === "localhost" || lower.endsWith(".localhost")) return true;
  if (lower === "0.0.0.0" || lower === "::1") return true;

  const ipv4 = lower.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const [a, b] = ipv4.slice(1).map(Number);
    if (a === 127) return true;
    if (a === 10) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
  }

  return false;
}
