import type { Config } from '@react-router/dev/config';
import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const copyPublicToClientBuild = (buildDirectory: string) => {
  const publicDir = resolve(process.cwd(), 'public');
  if (!existsSync(publicDir)) return;

  const clientDir = resolve(buildDirectory, 'client');
  mkdirSync(clientDir, { recursive: true });

  for (const entry of readdirSync(publicDir)) {
    const source = resolve(publicDir, entry);
    const destination = resolve(clientDir, entry);
    cpSync(source, destination, { recursive: true, force: true });
  }
};

export default {
  // Server-side render by default; set to false for SPA mode.
  ssr: true,
  buildEnd: ({ reactRouterConfig }) => {
    copyPublicToClientBuild(reactRouterConfig.buildDirectory);
  },
} satisfies Config;
