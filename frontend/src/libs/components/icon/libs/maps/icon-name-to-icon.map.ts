import plusIcon from '~/assets/icons/plus-icon.svg';
import arrowRightIcon from '~/assets/icons/arrow-right.svg';
import loupeIcon from '~/assets/icons/loupe-icon.svg';

import { type IconName } from '~/libs/types/types.js';

const iconNameToIcon: Record<
  IconName,
  string> = {
    'plus': plusIcon,
    'arrow-right': arrowRightIcon,
    'loupe': loupeIcon
};

export { iconNameToIcon };