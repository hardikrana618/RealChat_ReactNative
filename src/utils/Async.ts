import {Variables} from '@/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * The function `clearAsyncValues` clear spacific stored items from AsyncStorage.
 */
export const clearAsyncValues = async (keys = []) => {
  AsyncStorage.multiRemove(keys);
};

/**
 * The function `setAsyncValue` set a spacific key value from AsyncStorage.
 */
export const setAsyncValue = async (key: string, value: any) => {
  let setVal = value;
  try {
    if (value) {
      if (typeof setVal === 'boolean') {
        setVal = setVal.toString();
      }
      await AsyncStorage.setItem(key, setVal);
    } else {
      AsyncStorage.removeItem(key);
    }
  } catch {
    return 'AsyncStorage set item issue';
  }
};

/**
 * The function `getAsyncValue` get spacific key value from AsyncStorage.
 */
export const getAsyncValue = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
};

/**
 * The function `clearStorage` clear all stored items from AsyncStorage.
 */
export const clearStorage = async (): Promise<void> => {
  try {
    const keys = [Variables.asyncKeys.USER_TOKEN];
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};
