export interface IEvent {
  name: string;
  payload: object;

  [others: string]: any;
}

export interface IStreamIdentifier {
  streamId: () => string | string;
}

export interface IStreamData {
  streamId: string;
  data: any;
}

export interface IVersionedData {
  version: number;
  data: any;
}

export interface IEventStream {
  version: number;
  events: IEvent[];
}

export interface IAppendOnlyStore {
  append(streamId: string, data: any, expectedVersion: number): Promise<void>;

  readRecords(
    streamId: string,
    afterVersion?: number,
    maxCount?: number
  ): Promise<IVersionedData[]>;

  readAllRecords(
    afterVersion: number,
    maxCount: number
  ): Promise<IStreamData[]>;
}

export interface IEventStore {
  loadEvents(
    id: IStreamIdentifier,
    skipEvents?: number,
    maxCount?: number
  ): Promise<IEventStream>;

  appendToStream(
    id: IStreamIdentifier,
    expectedVersion: number,
    events: IEvent[]
  ): Promise<void>;
}
