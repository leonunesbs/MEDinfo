import {
  Box,
  Button,
  Container,
  ContainerProps,
  HStack,
} from '@chakra-ui/react';

import { Logo } from '../atoms';
import NextLink from 'next/link';
import { ReactNode } from 'react';
import { SideMenu } from './SideMenu';

interface NavbarProps {
  children?: ReactNode;
  containerProps?: ContainerProps;
}

export function Navbar({ containerProps, ...rest }: NavbarProps) {
  return (
    <Box
      as="nav"
      role="navigation"
      bg="bg-surface"
      borderBottomWidth={1}
      {...rest}
    >
      <Container {...containerProps} py={{ base: '2', lg: '4' }}>
        <HStack spacing="10" justify="space-between">
          <Button
            variant={'ghost'}
            mr={10}
            as={NextLink}
            href="/"
            display="flex"
            justifyContent={'flex-start'}
            px={0}
            _hover={{ bg: 'transparent', filter: 'brightness(0.8)' }}
            _active={{ bg: 'transparent', filter: 'brightness(0.5)' }}
          >
            <Logo />
          </Button>
          <SideMenu />
        </HStack>
      </Container>
    </Box>
  );
}
