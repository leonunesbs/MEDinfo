import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';

import { FiMenu } from 'react-icons/fi';
import { Logo } from '../atoms';
import NextLink from 'next/link';
import { ReactNode } from 'react';
import { SocialButtons } from '../molecules';

interface SideMenuProps {
  children?: ReactNode;
}

export function SideMenu({}: SideMenuProps) {
  const sideMenu = useDisclosure();
  const { data, status } = useSession();
  const isAuth = status === 'authenticated';
  return (
    <>
      <IconButton
        variant="ghost"
        icon={<FiMenu fontSize="1.25rem" />}
        aria-label="Open Menu"
        onClick={sideMenu.onOpen}
      />
      <Drawer placement="right" {...sideMenu}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Logo />
          </DrawerHeader>

          <DrawerBody>
            <Stack>
              {data?.user.isStaff && (
                <Button as={NextLink} href="/posts/add">
                  Novo Post
                </Button>
              )}
              {isAuth ? (
                <Button onClick={() => signOut()}>Sair</Button>
              ) : (
                <Button onClick={() => signIn()}>Entrar</Button>
              )}
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <SocialButtons />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
