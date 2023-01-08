import { Box, BoxProps, Text, useColorModeValue } from '@chakra-ui/react';

import { ReactNode } from 'react';

interface LogoProps extends BoxProps {
  children?: ReactNode;
  href?: string;
}

export function Logo({ ...rest }: LogoProps) {
  return (
    <Box fontSize={['xl', '2xl']} {...rest}>
      <Text>
        <Text
          as="span"
          fontWeight={900}
          color={useColorModeValue('blue.800', 'white')}
        >
          MED
        </Text>
        <Text as="span" color={useColorModeValue('blue.500', 'blue.400')}>
          info
        </Text>{' '}
        <Text as="span">&#x1F1E7;&#x1F1F7;</Text>
      </Text>
    </Box>
  );
}
