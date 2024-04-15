import plusIcon from '~/assets/icons/plus-icon.svg';

import { type IconName } from '~/libs/types/types.js';

const iconNameToIcon: Record<
  IconName,
  string> = {
    'plus': plusIcon
};

export { iconNameToIcon };