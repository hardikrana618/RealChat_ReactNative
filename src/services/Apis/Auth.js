import {APIEndPoints} from '@/constants/api.endpoints';
import {Request} from '../AxiosInstance';
import {UserDetailsAction} from '@/reducers/actions';
import {Alert} from 'react-native';

export const postUserNameAPI = payload => async dispatch => {
  try {
    const response = await Request({
      url: APIEndPoints.userName(),
      method: 'post',
      data: payload,
    });
    if (response && response.id) {
      dispatch(UserDetailsAction(response));
      return true;
    }
  } catch (e) {
    console.log('UserName API Error: ', e);
    Alert.alert('Error', e);
  }
  return false;
};
