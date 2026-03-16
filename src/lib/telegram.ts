export async function validateBotToken(
  token: string
): Promise<{ valid: boolean; botUsername?: string; botName?: string; error?: string }> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    const data = await res.json();

    if (data.ok && data.result) {
      return {
        valid: true,
        botUsername: data.result.username,
        botName: data.result.first_name,
      };
    }

    return { valid: false, error: data.description || "Invalid token" };
  } catch {
    return { valid: false, error: "Failed to connect to Telegram API" };
  }
}

export async function setWebhook(
  token: string,
  tenantId: string
): Promise<{ ok: boolean; error?: string }> {
  const baseUrl = process.env.WEBHOOK_BASE_URL || "https://api.heyclerk.app/webhook";
  const webhookUrl = `${baseUrl}/${tenantId}`;

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`
    );
    const data = await res.json();

    if (data.ok) {
      return { ok: true };
    }
    return { ok: false, error: data.description || "Failed to set webhook" };
  } catch {
    return { ok: false, error: "Failed to connect to Telegram API" };
  }
}
