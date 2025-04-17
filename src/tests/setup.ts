import { spawn, ChildProcess } from 'child_process';

declare global {
  interface GlobalThis {
    __VITE_DEV_SERVER__: ChildProcess;
  }
}

// Spin up dev server
globalThis.__VITE_DEV_SERVER__ = spawn('npm', ['run', 'dev'], {
  cwd: process.cwd(),
  shell: true,
  stdio: ['ignore', 'pipe', 'pipe'],
});

// Wait for server readiness
await new Promise<void>((resolve, reject) => {
  const timeout = setTimeout(
    () => reject(new Error('Server did not start in time')),
    60000
  );
  const onData = (data: Buffer) => {
    const msg = data.toString();
    if (/localhost:3000/i.test(msg)) {
      clearTimeout(timeout);
      globalThis.__VITE_DEV_SERVER__.stdout.off('data', onData);
      globalThis.__VITE_DEV_SERVER__.stderr.off('data', onData);
      resolve();
    }
  };
  globalThis.__VITE_DEV_SERVER__.stdout.on('data', onData);
  globalThis.__VITE_DEV_SERVER__.stderr.on('data', onData);
});

// Teardown on process exit
process.on('exit', () => {
  globalThis.__VITE_DEV_SERVER__.kill();
});
