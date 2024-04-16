import { type IconName } from '~/libs/types/types.js';

import { iconNameToIcon } from './libs/maps/maps.js';

type Properties = {
  name: IconName;
  width?: number | undefined;
  height?: number | undefined;
};

const Icon: React.FC<Properties> = ({
  name,
  width,
  height,
}) => {
  const iconPath = iconNameToIcon[name];

  return <img src={iconPath} width={width} height={height} />;
};

export { Icon };