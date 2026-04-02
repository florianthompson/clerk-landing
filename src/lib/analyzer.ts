import { StoreData, Analysis, Issue } from "./types";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function analyzeStore(data: StoreData): Analysis {
  const issues: Issue[] = [];

  // Thin descriptions (under 50 words)
  const thinDescriptions = data.products.filter((p) => {
    const text = stripHtml(p.body_html || "");
    return text.split(/\s+/).filter(Boolean).length < 50;
  });
  if (thinDescriptions.length > 0) {
    issues.push({
      type: "thin_descriptions",
      count: thinDescriptions.length,
      severity: "high",
      detail: `${thinDescriptions.length} of ${data.products.length} products have descriptions under 50 words`,
    });
  }

  // Missing images
  const noImages = data.products.filter(
    (p) => !p.images || p.images.length === 0
  );
  if (noImages.length > 0) {
    issues.push({
      type: "missing_images",
      count: noImages.length,
      severity: "high",
      detail: `${noImages.length} products have no images`,
    });
  }

  // Empty collections (no description)
  const emptyCollections = data.collections.filter(
    (c) => !c.body_html || stripHtml(c.body_html).length === 0
  );
  if (emptyCollections.length > 0) {
    issues.push({
      type: "empty_collections",
      count: emptyCollections.length,
      severity: "medium",
      detail: `${emptyCollections.length} collections have no description`,
    });
  }

  // Missing homepage meta description
  if (!data.meta.description || data.meta.description.length < 20) {
    issues.push({
      type: "missing_meta_description",
      count: 1,
      severity: "medium",
      detail: "Homepage has no meta description or it is too short",
    });
  }

  // Missing alt text on product images
  const missingAlt = data.products.reduce((count, p) => {
    return (
      count +
      (p.images || []).filter((img) => !img.alt || img.alt.trim() === "")
        .length
    );
  }, 0);
  if (missingAlt > 0) {
    issues.push({
      type: "missing_alt_text",
      count: missingAlt,
      severity: "low",
      detail: `${missingAlt} product images have no alt text`,
    });
  }

  return {
    totalProducts: data.products.length,
    totalCollections: data.collections.length,
    issues,
    totalIssues: issues.reduce((sum, i) => sum + i.count, 0),
  };
}
