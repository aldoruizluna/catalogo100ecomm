export default async function globalTeardown() {
  if (typeof global !== 'undefined' && (global as any).__VITE_SERVER__) {
    (global as any).__VITE_SERVER__.kill();
  }
}
