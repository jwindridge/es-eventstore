import { IAppendOnlyStore, IStreamData, IVersionedData } from '../interfaces';

import { ConcurrencyError } from '../errors';

interface IDirectDataAccess {
  data: {
    streamsById: { [s: string]: any[] };
    allStreams: any[];
  };
}

export function createInMemoryDriver(): IAppendOnlyStore & IDirectDataAccess {
  const streamsById: { [s: string]: any[] } = {};
  const allStreams: any[] = [];

  const append = (
    streamId: string,
    data: any[],
    expectedVersion: number
  ): Promise<void> => {
    const existingEvents = streamsById[streamId] || [];

    const storedVersion = existingEvents.length;

    if (expectedVersion !== storedVersion) {
      throw new ConcurrencyError(streamId, expectedVersion, storedVersion);
    }

    streamsById[streamId] = [...existingEvents, data];
    allStreams.push({ streamId, data });

    return new Promise(r => r());
  };

  const readRecords = (
    streamId: string,
    afterVersion = 0,
    maxCount?: number
  ): Promise<IVersionedData[]> => {
    const streamData = streamsById[streamId] || [];

    const selectedData = streamData.slice(
      afterVersion,
      maxCount && afterVersion + maxCount
    );

    return new Promise(r =>
      r(selectedData.map((d, i) => ({ version: i, data: d })))
    );
  };

  const readAllRecords = (
    afterVersion = 0,
    maxCount: number
  ): Promise<IStreamData[]> => {
    const selectedData: IStreamData[] = allStreams.slice(
      afterVersion,
      maxCount && afterVersion + maxCount
    );
    return new Promise(r => r(selectedData));
  };

  return {
    append,
    readAllRecords,
    readRecords,
    data: {
      allStreams,
      streamsById
    }
  };
}
