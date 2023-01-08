import { Box, Container, ContainerProps, Stack, Text } from '@chakra-ui/react';

import { Logo } from '../atoms';
import { ReactNode } from 'react';
import { SocialButtons } from '../molecules';

interface FooterProps {
  children?: ReactNode;
  containerProps: ContainerProps;
}

export function Footer({ containerProps, ...rest }: FooterProps) {
  return (
    <Box
      as="footer"
      role="contentinfo"
      bg="bg-accent"
      borderTopWidth={1}
      {...rest}
    >
      <Container {...containerProps}>
        <Stack spacing={{ base: '4', md: '5' }}>
          <Stack justify="space-between" direction="row" align="center">
            <Logo fontSize={'xl'} />
            <SocialButtons />
          </Stack>
          <Text fontSize="sm" color="subtle">
            &copy; {new Date().getFullYear()} MEDinfo Brasil. All rights
            reserved.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
