import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, Dimensions, Text, ImageURISource } from "react-native"
import MapView, { Overlay } from "react-native-maps"
import { BoundingBox, IMatrixContainer, IRegion, ITileBox, ITileBoxContainer } from "../../constants/Interfaces";
import { convertToWGS84 } from "../../utils/convertCoords";
import { CustomOverlay } from "./CustomOverlay";

type Props = {
  region: IRegion,
  setRegion: Dispatch<SetStateAction<IRegion>>,
  matrix: Array<IMatrixContainer>
}

const createUri = (id: number) => {

}

const zoomDelta = (t1: number, t2: number) => (
  (t1 + t2) / 2
)

const decideZoom = (n1: number, n2: number) => {
  const zoomLevels = [0.02, 0.06, 0.09, 0.12];
  const zoom = zoomDelta(n1, n2);

  if (zoom < zoomLevels[0]) {
    return 0;
  } else if (zoom < zoomLevels[1]) {
    return 1;
  } else if (zoom < zoomLevels[2]) {
    return 2;
  } else {
    return 3;
  }
}

const setBoundingBox = (id: number, maxRow: number, maxColumn: number, boundingBox: BoundingBox ) => {

}

/*export interface ITileBox {
  id: number,
  uri: ImageURISource,
  boundingBox: BoundingBox,
} */

const createTiles = (matrix: Array<IMatrixContainer>, zoom: number) => {
  const tiles: Array<ITileBoxContainer> = [];
  const zoomLevels = [0.03, 0.06, 0.09, 0.12];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].matrix.length; j++) {
      const array: Array<ITileBox> = [];
      for (let k = 0; k < matrix[i].matrix[j].size; k++) {
        array.push({id: k, uri: createUri(), boundingBox: setBoundingBox(k, matrix[i].matrix[j].rows, matrix[i].matrix[j].columns)});
      }
      tiles.push({zoom: zoomLevels[j], tile: array});
    }
  }
}


export function CustomMapView ({ region, setRegion, matrix }: Props) {
  const [zoom, setZoom] = useState<number>(0);
  const [tiles, setTiles] = useState<Array<ITileBox>>();

  console.log("matrix");
  console.log(matrix);

  useEffect(() => {
    const tmpZoom = decideZoom(region.latitudeDelta, region.longitudeDelta);
  }, [region]);

  useEffect(() => {
    createTiles(matrix);

  }, [zoom])

  const test = { uri: encodeURI("https://api.omaps.net/maps/62341/wmts/tiles/8cc1840332b04f4983e68c950edbd2ee/0/0")};

  const scale = 18138;
  const size = 1024;

  const lowerCorn = [419058.669612851, 6221546.01513422];
  const UpperCorn = [423336.384551535, 6226781.19799397];

  const t1 = 419058 + scale;
  const t2 = 6226781 + scale;

  const c1 = convertToWGS84(lowerCorn);
  const c2 = convertToWGS84(UpperCorn);

  const bounds: BoundingBox = [c1, c2];

  //scale: 18138

  const onRegionChange = (reg: IRegion) => {
    setRegion(reg);
  }

  return (
    <>
      <MapView 
        style={styles.map}
        initialRegion={region}
        onRegionChange={onRegionChange}
      >
        {tiles?.map(item => (
          <CustomOverlay 
            key={item.id}
            uri={item.uri}
            bounds={item.boundingBox}
          />
        ))}
      </MapView>
      <Text style={styles.text}>{region?.latitudeDelta}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text: {
    position: 'absolute',
    bottom: 50,
    fontSize: 20,
    fontWeight: 'bold'
  }
});