import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { apiLogin } from "../../api/hittautApi";
import { storeData, saveCredentials, removeToken } from "../../storage";
import { View, Text } from "../Themed"
import { credentialsReducer } from "../../reducers/credentials";
import { CredentialsActionType } from "../../constants/Enums";

type LoginProps = {
  setParentLoading: Dispatch<SetStateAction<boolean>>,
}

export const LoginForm = ({ setParentLoading }: LoginProps) => {
  const [credentials, dispatch] = credentialsReducer();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onLoginButtonPress = async () => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    dispatch({ type: CredentialsActionType.email, payload: credentials.username.trim()})

    console.log(credentials);

    if (isLoading) {
      setError('Var vänlig vänta');
      return
    } else if (credentials.username === '') {
      setError('E-mail måste ges');
      return
    } else if (!credentials.username.match(regexEmail)) {
      setError('Du måste ange en giltig e-mail address');
      return
    } else if (credentials.password === '') {
      setError('Lösenord måste ges');
      return
    }

    setIsLoading(true);
    setError('');

    const user = await apiLogin(credentials);
    console.log(user);
    if (user instanceof Error) {
      setError('E-mail/Lösenord hittades inte');
      setIsLoading(false);
      return
    }

    await saveCredentials(credentials);
    await removeToken();
    

    setIsLoading(false);
    setParentLoading(true);
  }

  return (
    <>
      <View style={styles.errorView}>
        {error ? <Text style={styles.errorText}>{error}</Text> : <></>}
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="E-mail"
          placeholderTextColor="#000"
          keyboardType='email-address'
          onChangeText={(email) => dispatch({ type: CredentialsActionType.email, payload: email})}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Lösenord"
          placeholderTextColor="#000"
          secureTextEntry={true}
          onChangeText={(password) => dispatch({ type: CredentialsActionType.password, payload: password})}
        />
      </View>

      <View>
        <TouchableOpacity 
          style={styles.button}
          onPress={onLoginButtonPress}
        >
          {
            !isLoading ? 
            <Text style={{ color: 'white', fontSize: 16 }}>Logga in</Text> :
            <ActivityIndicator />
          }
        </TouchableOpacity>
      </View>
    </>
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
  },
  errorView: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  inputView: {
    borderStyle: 'solid',
    borderColor: '#dd235f',
    borderWidth: 2,
    borderRadius: 5,
    width: '70%',
    height: 45,
    marginBottom: 20,
  },
  TextInput: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    fontSize: 16
  },
  button: {
    height: 40,
    width: 100,
    alignItems: 'center',
    backgroundColor: '#dd235f',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  }
});