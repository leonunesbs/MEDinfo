import {
  Box,
  Button,
  ButtonGroup,
  Container,
  ContainerProps,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';

import { FiMenu } from 'react-icons/fi';
import { Logo } from '../atoms';
import NextLink from 'next/link';
import { ReactNode } from 'react';

interface NavbarProps {
  children?: ReactNode;
  containerProps?: ContainerProps;
}

export function Navbar({ containerProps, ...rest }: NavbarProps) {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
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
          {isDesktop ? (
            <Flex justify="space-between" flex="1">
              <ButtonGroup variant="link" spacing="8">
                {[''].map((item) => (
                  <Button key={item}>{item}</Button>
                ))}
              </ButtonGroup>
              <HStack spacing="3">
                <Button variant="ghost">Entrar</Button>
              </HStack>
            </Flex>
          ) : (
            <IconButton
              variant="ghost"
              icon={<FiMenu fontSize="1.25rem" />}
              aria-label="Open Menu"
            />
          )}
        </HStack>
      </Container>
    </Box>
  );
}
