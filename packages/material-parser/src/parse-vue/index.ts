import { MaterialComponent, MaterialScanMeta } from '../types/parse';
import { installPeerAndDeps } from '../utils/install';
import parseConfig from './config';
import parseJS from './js';
import parseDynamic from './dynamic';

export default async function (args: MaterialScanMeta): Promise<MaterialComponent[]> {
  const {
    mainFileAbsolutePath,
    moduleFileAbsolutePath,
    webTypeFileAbsolutePath,
    veturAttributesFileAbsolutePath,
    veturTagFileAbsolutePath,
  } = args;
  const hasConfig = webTypeFileAbsolutePath || (veturAttributesFileAbsolutePath && veturTagFileAbsolutePath);

  if (hasConfig) {
    return parseConfig(args);
  }

  try {
    await installPeerAndDeps(args);
    return parseJS(moduleFileAbsolutePath || mainFileAbsolutePath);
  } catch(e) {
    return parseDynamic(mainFileAbsolutePath);
  }
}
