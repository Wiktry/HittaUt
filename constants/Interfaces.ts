import { ImageURISource } from "react-native";

export interface IProject {
  contract_finish_date?: string,
  contract_start_date?: string,
  finish_date?: string,
  id?: number,
  start_date?: string
}

export interface ICity {
  email?: string,
  external_id?: number,
  id?: number,
  latitude?: number,
  longitude?: number,
  name?: string,
  projects?: Array<IProject>,
  slug?: string,
  type?: string,
  url?: string
}

export interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface IUser {
  _state?: string,
  _user_cache?: string,
  alias?: string,
  allow_email?: boolean,
  allow_third_party_email?: boolean,
  allow_toplist?: boolean,
  city?: string,
  created?: string,
  email?: string,
  external_id?: number,
  id?: number,
  is_sponsor_admin?: boolean,
  location_id?: number,
  organisation_id?: number,
  sponsor_id?: number,
  street?: string,
  team_id?: number, 
  updated?: string,
  user_id?: string,
  zip?: string,
}

export interface ICredentials {
  username: string,
  password: string
}

export interface IXml {
  attributes?: object,
  children?: Array<IXml>,
  name: string,
  value?: string,
  getElementsByTagName?: string
}

export interface ITileMatrix {
  id: string,
  scale: number,
  coords: Array<number>,
  width: number,
  height: number,
  rows: number,
  columns: number,
  size: number
}

export interface IMatrixContainer {
  id: number,
  epsg?: string,
  boundingBox: BoundingBox,
  matrix: Array<ITileMatrix>
}

export type Coordinate = [number, number];
export type BoundingBox = [Coordinate, Coordinate];
export type ZoomLevel = [number, number, number, number]

export interface ITileBox {
  id: number,
  uri: ImageURISource,
  zoom: ZoomLevel,
  boundingBox: BoundingBox,
}

export interface ITileBoxContainer {
  zoom: number,
  tile: Array<ITileBox>
}