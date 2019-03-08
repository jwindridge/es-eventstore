# @authentik8/es-eventstore

This package provides my take on an event store, with a number of configured back-ends

## Installation

```bash
npm install @authentik8/es-eventstore
```

## Usage
```javascript

import { 
  getEventStore, 
  createInMemoryDriver, 
  createFilesystemDriver 
} from '@authentik8/es-eventstore';

const inMemoryStorage = createInMemoryDriver();
const fileStorage = createFilesystemDriver();

const inMemoryEventStore = getEventStore(inMemoryStorage)
const filesystemEventStore = getEventStore(fileStorage);
```
