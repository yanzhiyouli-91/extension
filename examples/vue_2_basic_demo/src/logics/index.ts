import '@nasl/types';

/**
 * @NaslLogic
 * @title 过滤列表
 * @desc 泛型示例-过滤列表中的 null 数据
 * @param list 列表
 * @returns 列表
 */
export function filterNull<T>(list: nasl.collection.List<T>): nasl.collection.List<T> {
  return list.filter(n => !!n);
}

/**
 * @NaslLogic
 * @title 并发执行异步任务
 * @description 高阶函数示例-并发执行异步任务
 * @param count 一次并发支持任务数量
 * @param task  并发任务列表
 */
export async function asyncExecuteTask<T>(count: nasl.core.Integer, ...taskList: nasl.collection.List<() => Promise<T>>): Promise<nasl.collection.List<T>> {
  const asyncTaskCount = count || 5;
  let waitExecuteTasks = [...taskList];
  const results: nasl.collection.List<T> = [];
  while (waitExecuteTasks.length > 0) {
    let executeTasks;
    if (taskList.length > asyncTaskCount) {
      executeTasks = waitExecuteTasks.slice(0, asyncTaskCount);
    } else {
      executeTasks = waitExecuteTasks;
    }

    results.push(...(await Promise.all(executeTasks.map((fn) => Promise.resolve(fn())))));
    waitExecuteTasks = waitExecuteTasks.slice(executeTasks.length);
  }

  return results;
}

/**
 * @NaslLogic
 * @title 解析时间
 * @desc 匿名数据结构示例-解析时间返回匿名数据结构
 * @param str 时间
 * @returns moment 对象
 */
export function parseString2Moment(str: nasl.core.String = '2024-12-12', endCallback?: () => Promise<void>): Promise<{ date: nasl.core.String; time: nasl.core.String; timeOfDay: nasl.core.Integer }> {
  return {
    date: '2023-12-24',
    time: '12:00',
    timeOfDay: 23,
  };
}
