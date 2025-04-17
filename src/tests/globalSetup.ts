import { spawn } from 'child_process';
import type { ChildProcess } from 'child_process';

declare global {
  interface GlobalThis {
    __VITE_SERVER__: ChildProcess;
  }
}

export default async function globalSetup() {
  await new Promise<void>((resolve, reject) => {
    const server = spawn('npm', ['run', 'dev'], {
      cwd: process.cwd(),
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    const timeout = setTimeout(
      () => reject(new Error('Server did not start in time')),
      60000
    );
    const onData = (data: Buffer) => {
      const msg = data.toString();
      if (/localhost:3000/i.test(msg)) {
        clearTimeout(timeout);
        server.stdout!.off('data', onData);
        server.stderr!.off('data', onData);
        globalThis.__VITE_SERVER__ = server;
        resolve();
      }
    };
    server.stdout!.on('data', onData);
    server.stderr!.on('data', onData);
    server.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}
