import { createRealmContext } from '@realm/react';

import { Historic_advanced_piece } from './schema/historic_advanced_piece';

export const { RealmProvider, useQuery, useObject, useRealm } =
  createRealmContext({
    deleteRealmIfMigrationNeeded: true,
    schema: [Historic_advanced_piece],
  });
