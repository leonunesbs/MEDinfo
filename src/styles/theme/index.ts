import { extendBaseTheme, type ThemeConfig } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import { colors, fonts } from './foundations';
import styles from './styles';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false,
};

const { Button, Container, Heading, Divider, Input, Textarea, Card, Drawer } =
  chakraTheme.components;

const theme = extendBaseTheme({
  config,
  fonts,
  styles,
  colors,
  components: {
    Drawer,
    Card,
    Input,
    Textarea,
    Button,
    Heading,
    Container,
    Divider,
  },
});

export default theme;
