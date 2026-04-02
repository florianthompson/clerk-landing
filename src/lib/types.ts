export interface Product {
  id: number;
  title: string;
  body_html: string | null;
  vendor: string;
  product_type: string;
  handle: string;
  published_at: string | null;
  variants: Variant[];
  images: ProductImage[];
  tags: string[];
}

export interface Variant {
  id: number;
  title: string;
  price: string;
  compare_at_price: string | null;
  sku: string | null;
  inventory_quantity?: number;
}

export interface ProductImage {
  id: number;
  src: string;
  alt: string | null;
  width: number;
  height: number;
}

export interface Collection {
  id: number;
  handle: string;
  title: string;
  body_html: string | null;
  published_at: string | null;
  image?: {
    src: string;
    alt: string | null;
  };
  products_count?: number;
}

export interface StoreMeta {
  title: string | null;
  description: string | null;
  ogImage: string | null;
  ogTitle: string | null;
}

export interface StoreData {
  url: string;
  name: string;
  products: Product[];
  collections: Collection[];
  meta: StoreMeta;
}

export interface Issue {
  type: string;
  count: number;
  severity: "high" | "medium" | "low";
  detail: string;
}

export interface Analysis {
  totalProducts: number;
  totalCollections: number;
  issues: Issue[];
  totalIssues: number;
}

export interface ScanResult {
  sessionId: string;
  storeName: string;
  storeUrl: string;
  summary: Analysis;
}

export type GoalType = "traffic" | "fix" | "conversion" | "idk";

export interface ScanRecord {
  id: string;
  store_url: string;
  store_name: string;
  raw_products: Product[];
  raw_collections: Collection[];
  raw_meta: StoreMeta;
  analysis: Analysis;
  selected_goal: GoalType | null;
  created_at: string;
}
