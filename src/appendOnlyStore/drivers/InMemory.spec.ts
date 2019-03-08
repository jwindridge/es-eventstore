import test from 'ava';

import { createInMemoryDriver } from './InMemory';

test.beforeEach((t: any) => {
  t.context.driver = createInMemoryDriver();
});

test('append', (t: any) => {
  const streamId = 'dummy';

  t.context.driver.append(streamId, [{ foo: 'bar' }], 0);

  t.deepEqual(t.context.driver.data.streamsById[streamId], [[{ foo: 'bar' }]]);
});
