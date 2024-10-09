import { expect, test } from 'vitest';
import { filterNull, parseString2Moment, asyncExecuteTask } from './index';

test('test logic filterNull', () => {
  const list = [1, 2, 3, null, 5];

  expect(filterNull(list)).toEqual([1, 2, 3, 5]);
});


test('test logic asyncExecuteTask', async () => {
  const results = await asyncExecuteTask(2, () => Promise.resolve(1), () => Promise.resolve(2), () => Promise.resolve(3), () => Promise.resolve(4));

  expect(results).toEqual([1, 2, 3, 4]);
});

test('test logic parseString2Moment', () => {
  expect(parseString2Moment('')).toEqual({
    date: '2023-12-24',
    time: '12:00',
    timeOfDay: 23,
  });
});
