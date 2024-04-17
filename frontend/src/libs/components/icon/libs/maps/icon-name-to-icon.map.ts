import plusIcon from '~/assets/icons/plus-icon.svg';
import telegramIcon from '~/assets/icons/telegram-icon.svg';
import viberIcon from '~/assets/icons/viber-icon.svg';
import youtubeIcon from '~/assets/icons/youtube-icon.svg';
import instagramIcon from '~/assets/icons/instagram-icon.svg';
import facebookIcon from '~/assets/icons/facebook-icon.svg';

import { type IconName } from '~/libs/types/types.js';

const iconNameToIcon: Record<
  IconName,
  string> = {
    'plus': plusIcon,
    'telegram': telegramIcon,
    'viber': viberIcon,
    'youTube': youtubeIcon,
    'instagram': instagramIcon,
    'facebook': facebookIcon
};

export { iconNameToIcon };