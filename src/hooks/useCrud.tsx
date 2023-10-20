import { Alert } from 'react-native';

import { BSON } from 'realm';
import { useRealm, useQuery } from 'util/realm';

type GenerateFunction<T> = (data: any) => T;

const handleError = (error: Error) => {
  Alert.alert(
    'Erro',
    `Informe o erro ao administrador do sistema:\n\n${error}`
  );
};

const useRealmCrud = <T extends Partial<Realm.Object>>(
  tableName: string,
  generate: GenerateFunction<T>
) => {
  const realm = useRealm();
  const query = useQuery(tableName);

  const createRecord = (data: any) => {
    try {
      realm.write(() => {
        realm.create(tableName, generate(data));
      });
    } catch (error: any) {
      handleError(error);
    }
  };

  const deleteRecord = (id: string) => {
    try {
      const itemToDelete = realm.objectForPrimaryKey(tableName, id);
      if (itemToDelete) {
        realm.write(() => {
          realm.delete(itemToDelete);
        });
      }
    } catch (error: any) {
      handleError(error);
    }
  };

  const deleteAll = () => {
    try {
      realm.write(() => {
        const allRecords = realm.objects(tableName);
        realm.delete(allRecords);
      });
    } catch (error: any) {
      handleError(error);
    }
  };

  const findById = (id: string) => {
    try {
      return realm.objectForPrimaryKey(tableName, new BSON.UUID(id));
    } catch (error: any) {
      handleError(error);
    }
  };

  const queryRealm = () => {
    try {
      return query;
    } catch (error: any) {
      handleError(error);
    }
  };

  return {
    createRecord,
    deleteAll,
    deleteRecord,
    findById,
    queryRealm,
  };
};

export default useRealmCrud;
