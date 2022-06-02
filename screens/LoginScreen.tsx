import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Image } from 'react-native';

import { LoginForm } from '../components/login/LoginForm';
import { LoginLoading } from '../components/login/LoginLoading';
import { Text, View } from '../components/Themed';
import { checkCredentials, getData, removeCredentials, removeData } from '../storage';
import { RootStackScreenProps } from '../types';

export function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const [loading, setLoading] = useState(true);

  const navigateRoot = () => {
    navigation.replace('Root');
  }

  removeData('user');
  removeCredentials();

  useEffect(() => {
    getData('user')
    .then((user) => {
      if (user)
        setLoading(true);
    })
  }, []);

  return (
    <View style={styles.container}>

      <Image style={styles.image} source={require('../assets/images/soft_hittaut.png')} />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      { 
        loading ?
        <LoginLoading navigateRoot={ navigateRoot } setLoading={setLoading} loading={loading} /> :
        <LoginForm setParentLoading={ setLoading } />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '30%',
    height: undefined,
    aspectRatio: 1/2,
    resizeMode: 'center'
  }
});