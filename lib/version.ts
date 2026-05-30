// App version — resolved from deployment/build metadata when available.
// v0 bumps APP_VERSION on each deployment/update. If no version can be
// resolved at build time, a safe placeholder ("—") is shown instead.
// Format: MAJOR.MINOR.PATCH

const FALLBACK_VERSION = "1.0.1"

function resolveVersion(): string {
  // Prefer an explicitly provided version, then fall back to a short
  // git commit SHA from the deployment, then the bundled fallback.
  const explicit = process.env.NEXT_PUBLIC_APP_VERSION
  if (explicit && explicit.trim().length > 0) return explicit.trim()

  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
  if (sha && sha.trim().length > 0) return sha.trim().slice(0, 7)

  if (FALLBACK_VERSION && FALLBACK_VERSION.trim().length > 0) {
    return FALLBACK_VERSION.trim()
  }

  // Safe placeholder if nothing can be resolved.
  return "—"
}

export const APP_VERSION = resolveVersion()
