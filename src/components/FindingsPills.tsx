import { Analysis } from "@/lib/types";

interface FindingsPillsProps {
  analysis: Analysis;
}

export default function FindingsPills({ analysis }: FindingsPillsProps) {
  return (
    <div className="flex gap-3 justify-center flex-wrap mb-6">
      <div className={`finding-pill ${analysis.totalIssues > 0 ? "warn" : ""}`}>
        <div className="count">{analysis.totalIssues}</div>
        Issues
      </div>
      <div className="finding-pill">
        <div className="count">{analysis.totalProducts}</div>
        Products
      </div>
      <div className="finding-pill">
        <div className="count">{analysis.totalCollections}</div>
        Collections
      </div>
      <div className="finding-pill">
        <div className="count">0</div>
        Keywords
      </div>
    </div>
  );
}
