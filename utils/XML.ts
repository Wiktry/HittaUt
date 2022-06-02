import { Coordinate } from "react-native-maps";
import { BoundingBox, IMatrixContainer, ITileMatrix, IXml } from "../constants/Interfaces";
import { convertToWGS84 } from "./convertCoords";

export const cleanXML = (xml: IXml) => {
  if (xml.children) {
    xml.children.forEach(el => cleanXML(el))
  } 

  if (xml.attributes && Object.keys(xml.attributes).length === 0)
    delete xml.attributes;

  if (xml.value !== undefined && xml.value.length === 0)
    delete xml.value;

  if (xml.children?.length === 0)
    delete xml.children;

  delete xml.getElementsByTagName;
  return xml;
}

const findNode = (xml: IXml, name: string, hasChild?: boolean): IXml | undefined => {
  if (xml.name === name && hasChild === undefined) {
    return xml;
  } else if (hasChild !== undefined && hasChild && xml.children !== undefined && xml.name === name) {
    return xml;
  }else if (xml.children) {
    for (let i = 0; i < xml.children.length; i++) {
      const node = findNode(xml.children[i], name, hasChild);
      if (node) {
        return node;
      }
    }
  }

  return undefined;
}

const createCoords = (str: string): Coordinate => {
  const array = str.split(' ');
  const ints = array.map(el => parseFloat(el));

  return ints;
}

const createMatrix = (xml: IXml): ITileMatrix => {
  const tile = {
    id: xml.children?.find(el => el.name === 'ows:Identifier')!.value!,
    coords: createCoords(xml.children?.find(el => el.name === 'TopLeftCorner')!.value!),
    scale: parseFloat(xml.children!.find(el => el.name === 'ScaleDenominator')!.value!),
    width: parseFloat(xml.children!.find(el => el.name === 'TileWidth')!.value!),
    height: parseFloat(xml.children!.find(el => el.name === 'TileHeight')!.value!),
    rows: parseFloat(xml.children!.find(el => el.name === 'MatrixWidth')!.value!),
    columns: parseFloat(xml.children!.find(el => el.name === 'MatrixHeight')!.value!),
    size: 0
  }

  tile.size = tile.rows * tile.columns;

  return tile;
}

const createBoundingBox = (s1: string, s2: string): BoundingBox => {
  const t1 = createCoords(s1);
  const t2 = createCoords(s2);

  return [t1, t2];
}

const createMatrixContainer = (xml: Array<IXml>, id: number): IMatrixContainer => {
  console.log('XMLXMLXMLXXMLXLXMLXMLXMXMXMLXMLXM');
  console.log(xml);
  const container = {
    id: id,
    epsg: xml.find(el => el.name === 'ows:SupportedCRS')?.value,
    boundingBox: createBoundingBox(
      findNode(xml.find(el => el.name === 'ows:BoundingBox')!, 'ows:LowerCorner')!.value!,
      findNode(xml.find(el => el.name === 'ows:BoundingBox')!, 'ows:UpperCorner')!.value!
    ),
    matrix: xml.filter(el => el.name === 'TileMatrix').map(tile => createMatrix(tile))
  }

  return container;
}

export const matrixXML = (xml: IXml, id: number) => {
  const TileMatrixSet = [
    findNode(xml, 'TileMatrixSet', true)?.children!,
  ].flat();

  const matrix = createMatrixContainer(TileMatrixSet, id);

  return matrix;
}