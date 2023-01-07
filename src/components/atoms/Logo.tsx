import { Box, BoxProps, Text } from '@chakra-ui/react';

import { ReactNode } from 'react';

interface LogoProps extends BoxProps {
  children?: ReactNode;
}

export function Logo({ ...rest }: LogoProps) {
  return (
    <Box fontSize={['xl', '2xl']} {...rest}>
      <Text>
        <Text as="span" fontWeight={900} color="blue.800">
          MED
        </Text>
        <Text as="span" color="blue.500">
          info
        </Text>{' '}
        <Text as="span">&#x1F1E7;&#x1F1F7;</Text>
      </Text>
    </Box>
  );
}
