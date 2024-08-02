'use server';

async function sha256(s: string): Promise<string> {
  const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createSession(s: string): Promise<string> {
  return await sha256(s);
};

export async function isValidSession(s: string): Promise<boolean> {
  return s === await sha256(process.env.SECRET || '');
}