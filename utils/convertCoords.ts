import proj4 from 'proj4';

type Coordinate = [number, number];

export const convertToWGS84 = (coords: Array<number>): Coordinate => {
  proj4.defs('SWEREF99', "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  const [y, x] = proj4('SWEREF99', 'WGS84', coords);

  //console.log([x, y]);
  return [x, y];
}