import { createMuiTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    appbar: {
      height: number;
      logo: {
        height: number;
      };
    };
    selection: {
      draggedShadow: string;
      droppedShadow: string;
    };
    custom: {
      palette: {
        yellow: string;
        altBackground: string;
        a: {
          main: string;
          secondary: string;
          alt: string;
        };
        b: {
          main: string;
          secondary: string;
          alt: string;
        };
        c: {
          main: string;
          secondary: string;
          alt: string;
        };
        d: {
          main: string;
          secondary: string;
          alt: string;
        };
        e: {
          main: string;
          secondary: string;
          alt: string;
        };
        special: {
          bad: string;
          good: string;
        };
        gradient: {
          main: string;
          secondary: string;
          alt: string;
        };
        textColor: (color: string) => string;
      };
    };
  }
}

export const makeCocoTheme = (isDark: boolean = false) =>
  createMuiTheme({
    // @ts-ignore
    transition: "all 0.2s ease",
    transitionSlow: "all 0.4s ease-out",
    custom: {
      palette: {
        yellow: "#FAD851",
        altBackground: "#F5F9FF",
        a: {
          main: "#2195F3",
          secondary: "#1056AE",
          alt: "#79CFFB",
        },
        b: {
          main: "#7D43F8",
          secondary: "#4621B2",
          alt: "#B88EFC",
        },
        c: {
          main: "#FAD851",
          secondary: "#F8BD00",
          alt: "#FDF796",
        },
        d: {
          main: "#EDF4FC",
          secondary: "#F5F9FF",
          alt: "#FCFDFF",
        },
        e: {
          main: "#243441",
          secondary: "#425B6F",
          alt: "#90B4C5",
        },
        special: {
          bad: "#F4556F",
          good: "#17B19B",
        },
        gradient: {
          main: "linear-gradient(to right, #2195F3 0.19%, #161326 198.16%)",
          secondary: "linear-gradient(to right, #2195F3, #7D43F8 )",
          alt: "linear-gradient(to right, #B88EFC -13.2%, #7D43F8 27.1%, #4621B2 93.47%)",
        },
        textColor: (color: string) =>
          [
            "#EDF4FC",
            "#F5F9FF",
            "#FCFDFF",
            "#FDF796",
            "#FAD851",
            "#F8BD00",
          ].includes(color)
            ? "#243441"
            : "#FFFFFF",
      },
    },
    typography: {
      fontFamily: "Montserrat",
    },
    zIndex: {
      drawer: 90,
    },
    mixins: {
      toolbar: {
        minHeight: 48,
        maxHeight: 48,
        height: 48,
        width: "100%",
        padding: 0,
        "@media (min-width:0px) and (orientation: landscape)": {
          minHeight: "40px",
        },
        "@media (min-width:600px)": {
          minHeight: "40px",
        },
      },
    },
    palette: {
      primary: {
        main: "#2195F3",
      },
      secondary: {
        main: "#062B49",
      },
      type: isDark ? "dark" : "light",
    },
    appbar: {
      height: 48,
      logo: {
        height: 22,
      },
    },
    selection: {
      draggedShadow: "4px 4px 4px 4px rgba(0,0,0,0.25)",
      droppedShadow: "0px 0px 0px 0px rgba(0,0,0,0.25)",
    },
    overrides: {
      MuiPaper: {
        rounded: {
          borderRadius: 24,
        },
      },
      MuiCssBaseline: {
        "@global": {
          "*::-webkit-scrollbar": {
            width: "0.5em",
            height: "0.5em",
          },
          "*::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.25)",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.84)",
            borderRadius: "8px",
          },
        },
      },
    },
  });
