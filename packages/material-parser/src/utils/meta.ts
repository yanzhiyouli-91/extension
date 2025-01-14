import semver from 'semver';
import { FrameworkType } from '../types/parse';
import { loadFile } from './fs';

function isReact(pkg: Record<string, any>) {
  return (pkg.peerDependencies && pkg.peerDependencies['react'])
   || (pkg.devDependencies && pkg.devDependencies['react']);
}

function isVue3(pkg: Record<string, any>) {
  const version = (pkg.peerDependencies && pkg.peerDependencies['vue'])
  || (pkg.devDependencies && pkg.devDependencies['vue']);
  return version && semver.major(version) === 3;
}

function isVue2(pkg: Record<string, any>) {
  const version = (pkg.peerDependencies && pkg.peerDependencies['vue'])
  || (pkg.devDependencies && pkg.devDependencies['vue']);
  return version && semver.major(version) === 2;
}

export async function resolvePkgJSON(pkgJsonPath: string): Promise<{ [k: string]: any }> {
  const content = await loadFile(pkgJsonPath);
  const json = JSON.parse(content);
  return json;
}

export function resolveFramework(pkg: Record<string, any>): FrameworkType | 'unknow' {
  if (isReact(pkg)) {
    return 'react';
  }

  if (isVue3(pkg)) {
    return 'vue3';
  }

  if (isVue2(pkg)) {
    return 'vue2';
  }

  return 'unknow';
}
