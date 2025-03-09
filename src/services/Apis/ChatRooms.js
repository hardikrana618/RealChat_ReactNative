import {APIEndPoints} from '@/constants/api.endpoints';
import {Request} from '../AxiosInstance';
import {ChatRoomsAction} from '@/reducers/actions';
import {Alert} from 'react-native';

export const getChatRoomsAPI = payload => async dispatch => {
  try {
    const response = await Request({
      url: APIEndPoints.chatRooms(),
      method: 'get',
    });
    if (Array.isArray(response)) {
      dispatch(ChatRoomsAction(response));
      return true;
    }
  } catch (e) {
    console.log('ChatRooms API Error: ', e);
    Alert.alert('Error', e);
  }
  return false;
};
export const postCreateRoomsAPI = payload => async dispatch => {
  try {
    const response = await Request({
      url: APIEndPoints.chatRooms(),
      method: 'post',
      data: payload,
    });
    console.log('create room response: ', response);
    if (response && response.id) {
      Alert.alert('', 'Chat room has been created successfully.');
      dispatch(getChatRoomsAPI());
      return true;
    } else {
      Alert.alert('', 'Failed to create the chat room. Please try again.');
    }
  } catch (e) {
    console.log('Create ChatRooms API Error: ', e);
    if (e.status && e.status == 422) {
      Alert.alert(
        'Error',
        'Invalid input. Please check the provided valid room name and try again.',
      );
    } else if (e.status && e.status == 400) {
      Alert.alert(
        'Error',
        'A chat room with this name already exists. Please choose a different name.',
      );
    } else {
      Alert.alert('Error', e);
    }
  }
  return false;
};
