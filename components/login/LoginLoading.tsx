import { Dispatch, SetStateAction, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native"

import { collectData } from "../../utils/collectData";

type LoginProps = {
  navigateRoot: () => void,
  setLoading: Dispatch<SetStateAction<boolean>>,
  loading: boolean
}

export const LoginLoading = ({ navigateRoot, setLoading, loading }: LoginProps) => {
  
  useEffect(() => {
    const load = async () => {
      if (await collectData()) {
        navigateRoot();
      } else {
        //setError("Användaren hittades inte. Har du bytat e-mail eller lösenord?");
        setLoading(false);
      }
    }
    
    if(loading) {
      load();
    }
  }, [loading]);

  return (
    <View style={styles.loading}>
      <ActivityIndicator color="#dd235f" size={'large'}/>
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 40,
  }
});