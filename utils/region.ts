export const newRegion = (lat: number = 1, long: number = 1, delta: number = 0.1) => ({
  latitude: lat,
  longitude: long,
  latitudeDelta: delta,
  longitudeDelta: delta
})