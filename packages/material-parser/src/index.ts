import fs from 'fs-extra';
import { MaterialParseOptions, MaterialSchema } from './types/parse';
import parseReact from './parse-react';
import { parseMeta } from './scan';
import localize from './localize';

export async function parse(options: MaterialParseOptions): Promise<MaterialSchema> {
  const { workDir, moduleDir } = await localize(options);
  const scanMeta = await parseMeta(moduleDir);

  scanMeta.workDir = workDir;
  scanMeta.moduleDir = moduleDir;

  let result;
  if (scanMeta.framework === 'react') {
    result = await parseReact(scanMeta);
  }

  await fs.remove(workDir);
  return result || {} as any;
};
