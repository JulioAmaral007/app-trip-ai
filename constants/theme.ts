const palette = {
  fieryRed: "#FF4B4B",
  midnightBlack: "#1B1B1B",
  charcoalGrey: "#302E2D",
  stoneGrey: "#5C5C5C",
  pureWhite: "#FFFFFF",
  sandBeige: "#FDF5E2",
  transparent: "transparent",


  fbErrorBg: "#3A1B1B",
  fbErrorSurface: "#D32F2F",

  fbSuccessBg: "#1E3320",
  fbSuccessSurface: "#4CAF50",

  fbWarningBg: "#1A2B3A",
  fbWarningSurface: "#FFC107",

  fbInfoBg: "#332B1A",
  fbInfoSurface: "#42A5F5",
};

export const theme = {
  // // Semantic Colors
  // semantic: {
  //   cheap: '#00CC66',
  //   moderate: '#FFB800',
  //   luxury: {theme.colors.primary},
  //   selected: {theme.colors.primary},
  //   unselected: '#2a2a2a',
  // },

  // // Interest Category Colors
  // interests: {
  //   food: {theme.colors.primary},
  //   urban: '#4A9EFF',
  //   adventure: {theme.colors.primary},
  //   educational: '#FFB800',
  //   beach: '#00BFFF',
  //   wildlife: '#32CD32',
  //   pool: '#00CED1',
  //   relax: '#DDA0DD',
  //   camp: {theme.colors.primary},
  // },

  // // Transport Colors
  // transport: {
  //   flights: {theme.colors.primary},
  //   hotels: '#4A9EFF',
  //   trains: '#32CD32',
  //   ferry: '#00CED1',
  //   bus: '#FFB800',
  // },

  colors: {
    background: palette.midnightBlack,
    primary: palette.fieryRed,
    text: palette.pureWhite,
    gray1: palette.charcoalGrey,
    gray2: palette.stoneGrey,
    ...palette,
  },
  textVariants: {
    defaults: {
      color: "text",
      fontFamily: "PoppinsRegular",
      fontSize: 16,
      lineHeight: 24,
    },
    title28: {
      fontSize: 28,
      fontFamily: "PoppinsSemiBold",
      lineHeight: 36,
    },
    title22: {
      fontSize: 22,
      fontFamily: "PoppinsSemiBold",
      lineHeight: 30,
    },
    title16: {
      fontSize: 16,
      fontFamily: "PoppinsSemiBold",
      lineHeight: 24,
    },
    title14: {
      fontSize: 14,
      fontFamily: "PoppinsSemiBold",
      lineHeight: 22,
    },
    text18: {
      fontSize: 18,
      lineHeight: 26,
    },
    text16: {
      fontSize: 16,
      lineHeight: 24,
    },
    text14: {
      fontSize: 14,
      lineHeight: 22,
    },
    text12: {
      fontSize: 12,
      lineHeight: 20,
    },
  },
  borderRadius: {
    default: 16,
    rounded: 500,
  },
  boxShadows: {
    primary: "3px 3px 10px 3px rgba(255, 75, 75, 0.4)",
  },
}

// export const font = {
//   bold: 'Exo2_700Bold',
//   medium: 'Exo2_500Medium',
//   regular: 'Exo2_400Regular',
//   semiBold: 'Exo2_600SemiBold',
// }

// export const boxShadows = {
//   primary: "3px 3px 10px 3px rgba(255, 75, 75, 0.4)",
// }

// export const borderRadius = {
//   default: 16,
//   rounded: 500,
// }
