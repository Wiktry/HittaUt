import * as FileSystem from 'expo-file-system';
import { ICity, ICredentials, IMatrixContainer, IUser } from "../constants/Interfaces";
import { cleanXML, matrixXML } from '../utils/XML';
const XMLparser = require('react-xml-parser');

const postFetch = (url: string, body: object) => (
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      credentials: 'include',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
)

export const apiLogin = ({ username, password }: ICredentials): Promise<IUser | Error> => (
  postFetch('https://www.orientering.se/api/v1/hittaut/user/login/', {
    "username": username,
    "password": password
  })
  .then((response) => {console.log(response); return response.json()})
  .then((json) => {console.log(JSON); return JSON.parse(json.user)})
  .catch((e) => {console.error(e); return e})
)

export const apiToken = ({ username, password }: ICredentials): Promise<string | Error> => (
  postFetch('https://www.orientering.se/api-token-auth/', {
    "username": username,
    "password": password
  })
  .then((response) => response.json())
  .then((json) => json.token)
  .catch((e) => {console.error(e); return e})
)

export const apiLocations = (): Promise<Array<ICity>> => (
  fetch('https://www.orientering.se/api/v1/locations/')
  .then((response) => response.json())
  .catch((e) => {console.error(e)})
)

export const apiOmapsId = async (location?: number, token?: string): Promise<Array<number>> => {
  await FileSystem.downloadAsync('https://www.orientering.se/hittaut_static/?location_id=' + location + '&token=' + token, FileSystem.documentDirectory + 'hittaUt_static.html').catch((e) => {console.error(e)});
  const res = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'hittaUt_static.html').catch((e) => {console.error(e)});
  const str = res!.substring(res!.indexOf('omapsId') + 11, res!.indexOf("'", res!.indexOf('omapsId') + 11));

  const map = str.split(';').map(s => {
    if (s.includes('|'))
      return s.slice(s.indexOf('|') + 1);
    else if (s.includes('-'))
      return undefined;
    else
      return s;
  }).filter(el => el !== undefined).join().split(',');

  const array = map.map(el => parseInt(el));

  return array;
}

export const apiOmapsInfo = async (id: number): Promise<IMatrixContainer | void> => (
  fetch('https://www.orientering.se/api/v1/omaps/' + id)
  .then(response => response.text())
  .then(text => new XMLparser().parseFromString(text, "text/xml"))
  .then(data => cleanXML(data))
  .then(xml => matrixXML(xml, id))
  .catch((e) => {console.error(e)})
)