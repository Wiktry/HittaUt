import { useEffect, useReducer, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { apiLocations } from '../api/hittautApi';
import { CustomMapView } from '../components/map/CustomMapView';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { ICity, IMatrixContainer, IRegion, IUser } from '../constants/Interfaces';
import { getData } from '../storage/storage';
import { RootTabScreenProps } from '../types';
import { newRegion } from '../utils/region';





export function MapScreen({ navigation }: RootTabScreenProps<'MapScreen'>) {
  const [city, setCity] = useState<ICity | undefined>(undefined);
  const [region, setRegion] = useState<IRegion>({latitude: 1, longitude: 1, latitudeDelta: 0.1, longitudeDelta: 0.1});
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [test, setTest] = useState<Boolean>(false);
  const [matrix, setMatrix] = useState<Array<IMatrixContainer>>();

  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const gatherData = async () => {

      const tmpUser = await getData<IUser>('user');
      console.log(tmpUser);
      setUser(tmpUser);

      const locations = await apiLocations();
      const tmpCity = locations.find(element => element.id === tmpUser!.location_id);
      setCity(tmpCity);

      setRegion(newRegion(tmpCity!.latitude, tmpCity!.longitude));
      
      const matrix = await getData<Array<IMatrixContainer>>('omapsInfo');
      setMatrix(matrix);
      console.log('??????');
      console.log(matrix);

      setIsLoading(false);
    }

    gatherData();
    //console.log(user);
    //console.log(city);
  }, []);

  return (
    <View style={styles.container}>
      { 
        !isLoading ? 
        <CustomMapView region={region} setRegion={setRegion} matrix={matrix!} /> : 
        <ActivityIndicator />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});