import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      200: '#81E6D9',
      300: '#4FD1C5',
      400: '#38B2AC',
      500: '#319795',
      600: '#2C7A7B',
      700: '#285E61',
      800: '#234E52',
      900: '#1D4044',
    },
  },
  fonts: {
    heading: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
      '*::placeholder': {
        color: props.colorMode === 'dark' ? 'gray.400' : 'gray.500',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'xl',
      },
      variants: {
        solid: (props: any) => ({
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          _active: {
            transform: 'translateY(0)',
          },
        }),
        ghost: {
          _hover: {
            bg: 'teal.50',
          },
        },
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'teal.400',
      },
      variants: {
        outline: (props: any) => ({
          field: {
            borderRadius: 'xl',
            bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
            _hover: {
              borderColor: 'teal.300',
            },
          },
        }),
      },
    },
    Select: {
      defaultProps: {
        focusBorderColor: 'teal.400',
      },
      variants: {
        outline: (props: any) => ({
          field: {
            borderRadius: 'xl',
            bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          },
        }),
      },
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: 'teal.400',
      },
      variants: {
        outline: (props: any) => ({
          borderRadius: 'xl',
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        }),
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderRadius: '2xl',
          boxShadow: 'xl',
        },
      }),
    },
    Modal: {
      baseStyle: (props: any) => ({
        dialog: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderRadius: '2xl',
        },
      }),
    },
  },
  shadows: {
    outline: '0 0 0 3px rgba(56, 178, 172, 0.4)',
  },
  radii: {
    none: '0',
    sm: '0.25rem',
    base: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px',
  },
});

export default theme;