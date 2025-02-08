import { MaterialComponent } from '../../types/parse';
import { parseFile } from './parse';

/**
 * js语法解析
 * @param filePath 入口文件路径
 * @returns MaterialComponent[]
 */
export default async function(filePath: string): Promise<MaterialComponent[]> {
	const docs = await parseFile({
    filePath,
    lang: 'js',
    validExtends: () => true,
  });

  return docs.map((doc) => {
    return doc.toObject() as any;
  });
}
