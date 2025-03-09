import {Variables} from '@/config';
import {getAsyncValue} from '@/utils';

export const generateApiHeader = async () => {
  const token = await getAsyncValue(Variables.asyncKeys.USER_TOKEN);
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  } else {
    return {};
  }
};
