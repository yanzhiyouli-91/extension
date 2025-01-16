import semver from 'semver';
import { FrameworkType } from '../types/parse';
import { loadFile } from './fs';

type FrameworkResult = { name: FrameworkType | 'unknow'; version?: string; };

function resolveReact(pkg: Record<string, any>): FrameworkResult | undefined {
  const v = (pkg.peerDependencies && pkg.peerDependencies['react']) || (pkg.devDependencies && pkg.devDependencies['react']);
  if (v) {
    return {
      name: 'react',
      version: semver.minVersion(v)?.version,
    }
  }
}

function resolveVue3(pkg: Record<string, any>): FrameworkResult | undefined {
  const version = (pkg.peerDependencies && pkg.peerDependencies['vue'])
  || (pkg.devDependencies && pkg.devDependencies['vue']);
  if (version && semver.major(version) === 3) {
    return {
      name: 'vue3',
      version: semver.minVersion(version)?.version,
    }
  }
}

function resolveVue2(pkg: Record<string, any>): FrameworkResult | undefined {
  const version = (pkg.peerDependencies && pkg.peerDependencies['vue'])
  || (pkg.devDependencies && pkg.devDependencies['vue']);
  if (version && semver.major(version) === 2) {
    return {
      name: 'vue2',
      version: semver.minVersion(version)?.version,
    }
  }
}

export async function resolvePkgJSON(pkgJsonPath: string): Promise<{ [k: string]: any }> {
  const content = await loadFile(pkgJsonPath);
  const json = JSON.parse(content);
  return json;
}

export function resolveFramework(pkg: Record<string, any>): FrameworkResult {
  const resolves = [
    resolveReact,
    resolveVue2,
    resolveVue3
  ];

  let result: FrameworkResult = {
    name: 'unknow'
  };

  while (resolves.length > 0) {
    const rs = resolves.shift()?.(pkg);
    if (rs) {
      result = rs;
      break;
    }
  }

  return result;
}
