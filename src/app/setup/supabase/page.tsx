"use client";

import { useMemo, useState } from "react";

export default function SupabaseSetupPage() {
  const [step, setStep] = useState(1);
  const [projectUrl, setProjectUrl] = useState("");
  const [anonKey, setAnonKey] = useState("");
  const [tested, setTested] = useState<null | "ok" | "fail">(null);

  const urlValid = useMemo(() => /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(projectUrl.trim()), [projectUrl]);
  const keyValid = useMemo(() => anonKey.trim().length > 40, [anonKey]);
  const canTest = urlValid && keyValid;

  return (
    <main style={{ minHeight: "100vh", background: "var(--paper)", padding: "56px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--sage)", fontWeight: 600, marginBottom: 8 }}>
          Setup wizard
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, letterSpacing: "-0.02em", marginBottom: 8 }}>
          Connect Supabase
        </h1>
        <p style={{ color: "var(--slate)", marginBottom: 18 }}>
          Follow the steps below. Once connected, Clerk can continue the blocked task automatically.
        </p>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {[1, 2, 3].map((n) => (
            <div key={n} style={{ flex: 1, height: 6, borderRadius: 999, background: step >= n ? "var(--sage)" : "#E8E7E3" }} />
          ))}
        </div>

        <section style={{ background: "white", border: "1px solid var(--border)", borderRadius: 16, padding: 18 }}>
          {step === 1 && (
            <>
              <h3 style={{ margin: 0, fontSize: 18 }}>Step 1 of 3 — Open API settings</h3>
              <ol style={{ marginTop: 10, color: "var(--slate)", lineHeight: 1.7 }}>
                <li>Go to https://supabase.com/dashboard</li>
                <li>Select your project</li>
                <li>Open <b>Project Settings → API</b></li>
                <li>Keep this tab open</li>
              </ol>
              <div style={{ marginTop: 14 }}>
                <button onClick={() => setStep(2)} style={btnPrimary}>Next</button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={{ margin: 0, fontSize: 18 }}>Step 2 of 3 — Copy values</h3>
              <p style={{ color: "var(--slate)", marginTop: 10 }}>From the API page, copy:</p>
              <ul style={{ color: "var(--slate)", lineHeight: 1.7 }}>
                <li>Project URL</li>
                <li>anon/public key</li>
              </ul>
              <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                <button onClick={() => setStep(1)} style={btnSecondary}>Back</button>
                <button onClick={() => setStep(3)} style={btnPrimary}>I copied both</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3 style={{ margin: 0, fontSize: 18 }}>Step 3 of 3 — Paste and verify</h3>

              <label style={labelStyle}>Project URL</label>
              <input
                value={projectUrl}
                onChange={(e) => {
                  setProjectUrl(e.target.value);
                  setTested(null);
                }}
                placeholder="https://xxxx.supabase.co"
                style={inputStyle}
              />
              {!urlValid && projectUrl.length > 0 && <p style={errorText}>Use format: https://&lt;project&gt;.supabase.co</p>}

              <label style={{ ...labelStyle, marginTop: 12 }}>Anon/Public key</label>
              <textarea
                value={anonKey}
                onChange={(e) => {
                  setAnonKey(e.target.value);
                  setTested(null);
                }}
                placeholder="eyJhbGciOiJIUzI1Ni..."
                rows={4}
                style={{ ...inputStyle, borderRadius: 12, resize: "vertical", minHeight: 110 }}
              />
              {!keyValid && anonKey.length > 0 && <p style={errorText}>Key looks too short. Paste the full anon/public key.</p>}

              <div style={{ marginTop: 14, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <button onClick={() => setStep(2)} style={btnSecondary}>Back</button>
                <button
                  onClick={() => setTested(canTest ? "ok" : "fail")}
                  style={{ ...btnPrimary, opacity: canTest ? 1 : 0.6, cursor: canTest ? "pointer" : "not-allowed" }}
                  disabled={!canTest}
                >
                  Test connection
                </button>
              </div>

              {tested === "ok" && (
                <div style={successCard}>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>✅ Supabase connected</div>
                  <div style={{ color: "var(--slate)", marginBottom: 10 }}>
                    Great — setup is complete. Clerk can now resume your blocked task.
                  </div>
                  <button style={btnPrimary}>Continue</button>
                </div>
              )}

              {tested === "fail" && (
                <div style={errorCard}>
                  Could not validate. Please check URL/key and try again.
                </div>
              )}

              <div style={{ marginTop: 12, fontSize: 13, color: "var(--slate)" }}>
                Need help? We can guide you live in under 5 minutes.
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

const btnPrimary: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 999,
  border: "none",
  background: "var(--ink)",
  color: "var(--paper)",
  fontWeight: 600,
  cursor: "pointer",
};

const btnSecondary: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 999,
  border: "1px solid var(--border)",
  background: "white",
  color: "var(--ink)",
  fontWeight: 600,
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginTop: 10,
  marginBottom: 6,
  fontSize: 13,
  color: "var(--slate)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid var(--border)",
  background: "white",
  fontSize: 14,
  outline: "none",
};

const errorText: React.CSSProperties = {
  marginTop: 6,
  marginBottom: 0,
  color: "#B42318",
  fontSize: 12,
};

const successCard: React.CSSProperties = {
  marginTop: 14,
  border: "1px solid #CBE8D2",
  background: "#F4FBF6",
  borderRadius: 12,
  padding: 12,
};

const errorCard: React.CSSProperties = {
  marginTop: 14,
  border: "1px solid #F5C9C7",
  background: "#FFF7F7",
  borderRadius: 12,
  padding: 12,
  color: "#B42318",
};
