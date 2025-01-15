import * as fs from 'fs-extra';
import { MaterialParseOptions, MaterialSchema } from './types/parse';
import parseReact from './parse-react';
import { parseMeta } from './scan';
import localize from './localize';

export async function parse(options: MaterialParseOptions): Promise<MaterialSchema> {
  const { workDir, moduleDir } = await localize(options);
  let result;
  try {
    const scanMeta = await parseMeta(moduleDir);

    scanMeta.workDir = workDir;
    scanMeta.moduleDir = moduleDir;

    if (scanMeta.framework === 'react') {
      result = await parseReact(scanMeta);
    }
  } catch(e) {
    throw e;
  } finally {
    await fs.remove(workDir);
  }
  return result || {} as any;
};
