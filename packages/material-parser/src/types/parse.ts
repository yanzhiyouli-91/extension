
export type FrameworkType = 'vue2' | 'vue3' | 'react';

export interface MaterialParseOptions {
  /** npm 包名 */
  name: string;
  /** npm 版本 */
  version?: string;
  /** 临时目录 */
  tempDir?: string;
  /** NPM client */
  npmClient?: string;
}

export interface MaterialScanMeta {
  /** 当前包名 */
  pkgName: string;
  /** 当前包版本 */
  pkgVersion: string;
  /** 框架 */
  framework: FrameworkType | 'unknow';
  // /** 在ts场景下，使用entry */
  // useEntry?: boolean;
  /** cwd 目录 */
  workDir: string;
  /** npm 包目录 */
  moduleDir: string;
  /** main文件相对路径 */
  mainFilePath: string;
  /** module文件相对路径 */
  moduleFilePath?: string;
  /** typings文件相对路径 */
  typingsFilePath?: string;
  /** main文件绝对路径 */
  mainFileAbsolutePath: string;
  /** module文件绝对路径 */
  moduleFileAbsolutePath?: string;
  /** typings文件绝对路径 */
  typingsFileAbsolutePath?: string;
}

export interface MaterialComponentAttr {
  name: string;
  description: string;
  type: Array<'string' | 'number' | 'boolean' | 'object' | 'array' | 'any'>,
  options?: [{ value: any, label: string }]
  sync?: boolean;
}

export interface MaterialComponentEvent {
  name: string; // 事件 onClick
  description: string; //
  params: Array<{ name: string, type: any }>;
}

export interface MaterialComponentSlot {
  name: string; // 事件 onClick
  description: string; //
  params: Array<{ name: string, type: any }>;
}

export interface MaterialComponentMethod {
  name: string; // 事件 onClick
  description: string; //
  params: Array<{ name: string, type: any }>;
  returnType: any;
}

export interface MaterialComponent {
  importPath?: string;
  name: string;
  exportName?: string;
  subName?: string;
  description: string;
  attrs: MaterialComponentAttr[];
  events: MaterialComponentEvent[];
  slots: MaterialComponentSlot[];
  methods: MaterialComponentMethod[];
}

export interface MaterialSchema {
  name: string;
  version: string;
  description: string;
  framework: FrameworkType;
  components: MaterialComponent[];
};
