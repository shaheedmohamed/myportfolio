/**
 * Boot the workbox-generated service worker.
 * - autoUpdate: new SW takes over silently after refresh.
 * - In dev mode this is a no-op because `devOptions.enabled = false` in vite.config.
 *
 * Note: the import is dynamic so the dev server never has to resolve
 * the `virtual:pwa-register` module that only exists at production build time.
 */
export async function registerSW() {
  if (typeof window === 'undefined') return
  if (import.meta.env.DEV) return

  try {
    const { registerSW: register } = await import('virtual:pwa-register')
    register({
      immediate: true,
      onRegisteredSW(swUrl) {
        // eslint-disable-next-line no-console
        console.log('[PWA] service worker registered:', swUrl)
      },
      onOfflineReady() {
        // eslint-disable-next-line no-console
        console.log('[PWA] ready to work offline.')
      },
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[PWA] register skipped:', err)
  }
}
