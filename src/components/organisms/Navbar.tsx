import { Box, Container, ContainerProps, Flex, HStack } from '@chakra-ui/react';

import { Logo } from '../atoms';
import { ReactNode } from 'react';

interface NavbarProps {
  children?: ReactNode;
  containerProps?: ContainerProps;
}

export function Navbar({ containerProps, ...rest }: NavbarProps) {
  return (
    <Box
      as="nav"
      role="navigation"
      bg="bg-accent"
      borderBottomWidth={1}
      {...rest}
    >
      <Container {...containerProps} py={2}>
        <Flex>
          <Logo mr={10} />
          <HStack>
            <Box>Home</Box>
            <Box>Blog</Box>
            <Box>Contato</Box>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
