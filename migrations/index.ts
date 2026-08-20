import * as migration_20260820_205220 from './20260820_205220';

export const migrations = [
  {
    up: migration_20260820_205220.up,
    down: migration_20260820_205220.down,
    name: '20260820_205220'
  },
];
