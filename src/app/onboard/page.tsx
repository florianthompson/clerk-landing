"use client";

import { useState } from "react";
import StepIndicator from "@/components/onboard/StepIndicator";
import StepProfile from "@/components/onboard/StepProfile";
import StepSkills from "@/components/onboard/StepSkills";
import StepTelegram from "@/components/onboard/StepTelegram";
import StepSuccess from "@/components/onboard/StepSuccess";
import { WizardState, ProfileType } from "@/lib/types";
import { getDefaultSkills } from "@/lib/skills";

export default function OnboardPage() {
  const [state, setState] = useState<WizardState>({
    step: 0,
    name: "",
    profileType: null,
    skills: [],
    botToken: "",
    botUsername: "",
    botName: "",
    tenantId: null,
  });

  const [provisioning, setProvisioning] = useState(false);
  const [error, setError] = useState("");

  function update(partial: Partial<WizardState>) {
    setState((s) => ({ ...s, ...partial }));
  }

  function handleProfileChange(profileType: ProfileType) {
    update({ profileType, skills: getDefaultSkills(profileType) });
  }

  function toggleSkill(id: string) {
    setState((s) => ({
      ...s,
      skills: s.skills.includes(id)
        ? s.skills.filter((x) => x !== id)
        : [...s.skills, id],
    }));
  }

  async function handleProvision() {
    setProvisioning(true);
    setError("");

    try {
      const res = await fetch("/api/provision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name,
          botToken: state.botToken,
          botUsername: state.botUsername,
          profileType: state.profileType,
          skills: state.skills,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        update({ tenantId: data.tenantId, step: 3 });
      } else {
        setError(data.error || "Provisioning failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setProvisioning(false);
    }
  }

  return (
    <div style={{ width: "100%", maxWidth: 560 }}>
      <StepIndicator current={state.step} />

      {error && (
        <div
          style={{
            background: "var(--coral-light)",
            color: "var(--coral)",
            padding: "12px 16px",
            borderRadius: "var(--radius-sm)",
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      {state.step === 0 && (
        <StepProfile
          name={state.name}
          profileType={state.profileType}
          onNameChange={(name) => update({ name })}
          onProfileChange={handleProfileChange}
          onNext={() => update({ step: 1 })}
        />
      )}

      {state.step === 1 && (
        <StepSkills
          skills={state.skills}
          onToggle={toggleSkill}
          onNext={() => update({ step: 2 })}
          onBack={() => update({ step: 0 })}
        />
      )}

      {state.step === 2 && (
        <StepTelegram
          botToken={state.botToken}
          botUsername={state.botUsername}
          onTokenChange={(botToken) => update({ botToken })}
          onValidated={(botUsername, botName) => update({ botUsername, botName })}
          onNext={handleProvision}
          onBack={() => update({ step: 1 })}
        />
      )}

      {state.step === 3 && state.tenantId && (
        <StepSuccess
          botUsername={state.botUsername}
          tenantId={state.tenantId}
        />
      )}

      {provisioning && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(250,250,247,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 40,
                height: 40,
                border: "3px solid var(--border)",
                borderTopColor: "var(--sage)",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <p style={{ fontSize: 14, color: "var(--slate)" }}>Setting up your Clerk...</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
