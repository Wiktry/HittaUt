import { ImageURISource } from "react-native";
import { Overlay } from "react-native-maps";
import { BoundingBox } from "../../constants/Interfaces";

type Props = {
  uri: ImageURISource,
  bounds: BoundingBox
}

export const CustomOverlay = ({ uri, bounds }: Props ) => {

  return (
    <Overlay
      image={uri}
      bounds={bounds}
    />
  )
}