import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { requireDevMode } from "@/lib/admin-guard";
import fs from "fs/promises";
import path from "path";

const THEME_PATH = path.join(process.cwd(), "data", "theme.json");
const CSS_PATH = path.join(process.cwd(), "app", "globals.css");

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  try {
    const data = await fs.readFile(THEME_PATH, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: "Datei nicht gefunden" }, { status: 404 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const blocked = requireDevMode();
  if (blocked) return blocked;

  try {
    const data = await req.json();

    await fs.writeFile(THEME_PATH, JSON.stringify(data, null, 2), "utf-8");

    const cssContent = `@import "tailwindcss";

@theme {
  --color-primary: ${data.colors.primary};
  --color-primary-dark: ${data.colors.primaryDark};
  --color-primary-light: ${data.colors.primaryLight};
  --color-accent: ${data.colors.accent};

  --font-heading: "var(--font-heading)", "system-ui", "sans-serif";
  --font-body: "var(--font-body)", "system-ui", "sans-serif";
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-body);
    color: var(--color-stone-900);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
  }
}

@utility container {
  margin-left: auto;
  margin-right: auto;
  max-width: 80rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
`;

    await fs.writeFile(CSS_PATH, cssContent, "utf-8");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Theme save error:", error);
    return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
  }
}
