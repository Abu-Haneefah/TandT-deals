import React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
export const CARD_WIDTH = width - 80;
export const GAP = 16;

interface Props {
  onPress?: () => void;
  // Change string to ImageSourcePropType to support both URLs and require()
  image: ImageSourcePropType | string;
}

const ImageCard = ({ image, onPress }: Props) => {
  // 1. Move logic INSIDE the component
  // 2. Check if it's a string (URL) or a required module (number/object)
  const source = typeof image === "string" ? { uri: image } : image;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{ width: CARD_WIDTH }}
      className="mt-4 rounded-2xl bg-white shadow-lg shadow-black/20 overflow-hidden"
    >
      <View>
        <Image
          source={source} // Use the calculated source here
          className="w-full h-52"
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

export default ImageCard;
