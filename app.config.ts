// app.config.ts — not loaded by anything.
//
// Older TanStack Start versions (built on Vinxi) read their settings from this file.
// The version this project uses reads them from vite.config.ts instead, where the
// tanstackStart() and nitro() plugins are set up. This file only re-exports that
// config so anyone looking for app.config.ts lands in the right place.
// To change the app's configuration, edit vite.config.ts.
export { default } from './vite.config'
