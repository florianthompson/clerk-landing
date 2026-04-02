import { StoreData, StoreMeta, Product, Collection } from "./types";

export function normalizeUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .trim()
    .toLowerCase();
}

function parseMetaTags(html: string): StoreMeta {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const descMatch = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
  ) || html.match(
    /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i
  );
  const ogImageMatch = html.match(
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i
  ) || html.match(
    /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:image["']/i
  );
  const ogTitleMatch = html.match(
    /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i
  ) || html.match(
    /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:title["']/i
  );

  return {
    title: titleMatch?.[1]?.trim() || null,
    description: descMatch?.[1]?.trim() || null,
    ogImage: ogImageMatch?.[1]?.trim() || null,
    ogTitle: ogTitleMatch?.[1]?.trim() || null,
  };
}

export async function scrapeStore(url: string): Promise<StoreData> {
  const normalized = normalizeUrl(url);

  const [productsRes, collectionsRes, homepageRes] = await Promise.all([
    fetch(`https://${normalized}/products.json?limit=250`, {
      headers: { "User-Agent": "Clerk/1.0" },
    }).catch(() => null),
    fetch(`https://${normalized}/collections.json`, {
      headers: { "User-Agent": "Clerk/1.0" },
    }).catch(() => null),
    fetch(`https://${normalized}`, {
      headers: { "User-Agent": "Clerk/1.0" },
    }).catch(() => null),
  ]);

  let products: Product[] = [];
  let collections: Collection[] = [];
  let meta: StoreMeta = { title: null, description: null, ogImage: null, ogTitle: null };

  if (productsRes && productsRes.ok) {
    const data = await productsRes.json();
    products = data.products || [];
  }

  if (collectionsRes && collectionsRes.ok) {
    const data = await collectionsRes.json();
    collections = data.collections || [];
  }

  if (homepageRes && homepageRes.ok) {
    const html = await homepageRes.text();
    meta = parseMetaTags(html);
  }

  const storeName = meta.ogTitle || meta.title || normalized;
  // Clean up store name (remove trailing " – ..." or " | ...")
  const cleanName = storeName.replace(/\s*[–|—-]\s*.*$/, "").trim();

  return {
    url: normalized,
    name: cleanName || normalized,
    products,
    collections,
    meta,
  };
}
