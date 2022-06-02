import { apiLocations, apiLogin, apiOmapsId, apiOmapsInfo, apiToken } from "../api/hittautApi";
import { ICredentials, IMatrixContainer, IUser } from "../constants/Interfaces";
import { checkCredentials, checkToken, getCredentials, getData, getToken, removeCredentials, removeData, saveToken, storeData } from "../storage";
import { newRegion } from "./region";

const testToken = async (credentials: ICredentials) => {
  if (await checkToken()) {
    return await getToken();
  }

  const token = await apiToken(credentials);
  if (token instanceof Error) {
    return token;
  }
  await saveToken(token);
  return token;
}

export const collectData = async (): Promise<boolean> => {

  /*removeData('user');
  removeCredentials();

  return false;*/


  if (!await checkCredentials()) {
    return false;
  }

  const credentials = await getCredentials();
  console.log(credentials);

  const user = await apiLogin(credentials);
  console.log(user);
  if (user instanceof Error) {
    return false;
  }
  await storeData('user', user);

  const token = await testToken(credentials);
  if (token instanceof Error) {
    return false;
  }
  console.log(token);

  // Api section
  
  const locations = await apiLocations();
  console.log(locations);
  await storeData('locations', locations);

  const city = locations.find(element => element.id === user!.location_id);
  console.log(city);
  await storeData('city', city!);

  const region = newRegion(city!.latitude, city!.longitude);
  await storeData('initialRegion', region);

  const omapsId = await apiOmapsId(city!.id, token);
  console.log(omapsId);
  
  const omapsInfo: Array<IMatrixContainer | void> = [];
  for (let i of omapsId) {
    omapsInfo.push(await apiOmapsInfo(i));
  }
  console.log(omapsInfo);
  await storeData('omapsInfo', omapsInfo);

  return true;  
}