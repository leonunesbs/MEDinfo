import {
  Box,
  ButtonGroup,
  Container,
  ContainerProps,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';

import { FaInstagram } from 'react-icons/fa';
import { Logo } from '../atoms';
import { ReactNode } from 'react';

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
            <ButtonGroup variant="ghost">
              <IconButton
                as="a"
                href="https://instagram.com/medinfo.brasil"
                aria-label="Instagram"
                icon={<FaInstagram fontSize="1.25rem" />}
              />
            </ButtonGroup>
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
