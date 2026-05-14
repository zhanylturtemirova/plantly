import { Image, useWindowDimensions } from "react-native";
type Props = {
  size?: number;
  imageUri?: string;
};

const PlantlyImage = ({ size, imageUri }: Props) => {
  const { width } = useWindowDimensions();
  const imageWidth = size ?? Math.min(width / 1.5, 300);
  return (
    <Image
      source={imageUri ? { uri: imageUri } : require("@/assets/plantly.png")}
      style={{ width: imageWidth, height: imageWidth, borderRadius: 6 }}
    />
  );
};

export default PlantlyImage;
