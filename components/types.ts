import type { ReactNode } from 'react'
import type {
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native'

export type ScreenWrapperProps = {
  children: React.ReactNode
  scrollable?: boolean
  style?: ViewStyle
}

export type ModalWrapperProps = {
  style?: ViewStyle
  children: React.ReactNode
  bg?: string
}

export type TypoProps = {
  size?: number
  color?: string
  fontWeight?: TextStyle['fontWeight']
  children: any | null
  style?: TextStyle
  textProps?: TextProps
}

export type IconComponent = React.ComponentType<{
  height?: number
  width?: number
  strokeWidth?: number
  color?: string
  fill?: string
}>

export type IconProps = {
  name: string
  color?: string
  size?: number
  strokeWidth?: number
  fill?: string
}

export type HeaderProps = {
  title?: string
  style?: ViewStyle
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export type BackButtonProps = {
  style?: ViewStyle
  iconSize?: number
}

export interface InputProps extends TextInputProps {
  icon?: React.ReactNode
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
  inputRef?: React.RefObject<TextInput>
}

export interface CustomButtonProps extends TouchableOpacityProps {
  style?: ViewStyle
  onPress?: () => void
  loading?: boolean
  children: React.ReactNode
}

export type ImageUploadProps = {
  file?: any
  onSelect: (file: any) => void
  onClear: () => void
  containerStyle?: ViewStyle
  imageStyle?: ViewStyle
  placeholder?: string
}

export type CategoryCode =
  | "ADVENTURE"
  | "BEACH"
  | "CULTURE"
  | "GASTRONOMY"
  | "HISTORY"
  | "LUXURY"
  | "NATURE"
  | "SHOPPING"
  | "URBAN"
  | "FAVORITE";

export type Category = {
  id: string;
  name: string;
  description: string | null;
  code: CategoryCode;
};


export type TouristAttraction = {
  id: string;
  name: string;
  description: string;
  cityId: string;
};

export type City = {
  id: string;
  name: string;
  country: string;
  coverImage: number | string;
  description: string;
  touristAttractions: TouristAttraction[];
  location: {
    latitude: number;
    longitude: number;
  };
  categories: Category[];
  isFavorite: boolean;
};

export type CityPreview = Pick<
  City,
  "id" | "name" | "country" | "coverImage" | "isFavorite"
>;