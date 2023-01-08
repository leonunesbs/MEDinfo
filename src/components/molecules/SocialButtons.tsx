import { ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react';

import { FaInstagram } from 'react-icons/fa';

export function SocialButtons({ ...rest }: ButtonGroupProps) {
  return (
    <ButtonGroup variant="ghost" {...rest}>
      <IconButton
        as="a"
        href="https://instagram.com/medinfo.brasil"
        aria-label="Instagram"
        icon={<FaInstagram fontSize="1.25rem" />}
      />
    </ButtonGroup>
  );
}
