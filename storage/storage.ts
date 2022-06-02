import AsyncStorage from "@react-native-async-storage/async-storage"
import { ImageURISource } from "react-native";

export const storeData = async (key: string, value: Object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
}

export const getData = async <T,>(key: string): Promise<T | undefined> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value)
      return JSON.parse(value);
  } catch (e) {
    console.error(e);
  }
}

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
}