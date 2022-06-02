import * as SecureStore from 'expo-secure-store';
import { ICredentials } from '../constants/Interfaces';

const saveSecureItem = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value).catch((e) => {console.error(e); console.log(key)});
}

const getSecureItem = async (key: string): Promise<string | undefined> => {
  const item = await SecureStore.getItemAsync(key).catch((e) => {console.error(e); console.log(key)});
  if (item) {
    return item;
  }
  
  console.error("secureStore.ts -> getSecureItem: Item (" + key + ") was undefined");
  return undefined;
}

const removeSecureItem = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
}

export const saveCredentials = async ({username, password}: ICredentials) => {
  await saveSecureItem('username', username);
  await saveSecureItem('password', password);
}

export const getCredentials = async (): Promise<ICredentials> => {
  const username = await getSecureItem('username');
  const password = await getSecureItem('password');

  const obj = {
    username: username!,
    password: password!
  }

  return obj;
}

export const removeCredentials = async () => {
  removeSecureItem('username');
  removeSecureItem('password');
}

export const checkCredentials = async (): Promise<Boolean> => {
  const username = await getSecureItem('username');
  const password = await getSecureItem('password');

  if (typeof username === 'string' && typeof password === 'string') {
    return true;
  }

  return false;
}

export const saveToken = async (token: string) => {
  await saveSecureItem('token', token);
}

export const getToken = async (): Promise<string> => {
  const token = await getSecureItem('token');

  return token!;
}

export const removeToken = async () => {
  await removeSecureItem('token');
}

export const checkToken = async (): Promise<boolean> => {
  const token = await getSecureItem('token');

  if (typeof token === 'string') {
    return true;
  }

  return false;
}