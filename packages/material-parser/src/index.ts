import * as fs from 'fs-extra';
import { MaterialParseOptions, MaterialScanMeta, MaterialSchema } from './types/parse';
import parseReact, { resolveReactSchema } from './parse-react';
import { parseMeta } from './scan';
import localize from './localize';

export function resolveSchema(components: any[], scanMeta: MaterialScanMeta): MaterialSchema {
  const schema: MaterialSchema = {
    name: scanMeta.pkgName,
    version: scanMeta.pkgVersion,
    description: scanMeta.description || '',
    framework: scanMeta.framework,
    frameworkVersion: scanMeta.frameworkVersion,
    components: [],
  }

  schema.components = components.map((c) => {
    if (scanMeta.framework === 'react') {
      return resolveReactSchema(c);
    }

    return c;
  })

  return schema;
}

export async function parse(options: MaterialParseOptions): Promise<MaterialSchema> {
  const { workDir, moduleDir } = await localize(options);
  try {
    const scanMeta = await parseMeta(moduleDir);

    scanMeta.workDir = workDir;
    scanMeta.moduleDir = moduleDir;
    scanMeta.npmClient = options.npmClient;

    let parseResult;
    if (scanMeta.framework === 'react') {
      parseResult = await parseReact(scanMeta);
    }

    return resolveSchema(parseResult || [], scanMeta);
  } catch(e) {
    throw e;
  } finally {
    await fs.remove(workDir);
  }
};
