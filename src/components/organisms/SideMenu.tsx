import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  useDisclosure,
} from '@chakra-ui/react';

import { FiMenu } from 'react-icons/fi';
import { Logo } from '../atoms';
import { ReactNode } from 'react';
import { SocialButtons } from '../molecules';

interface SideMenuProps {
  children?: ReactNode;
}

export function SideMenu({}: SideMenuProps) {
  const sideMenu = useDisclosure();

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
            <Input placeholder="Search" />
          </DrawerBody>

          <DrawerFooter>
            <SocialButtons />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
