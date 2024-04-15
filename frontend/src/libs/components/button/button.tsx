import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  type ButtonStyle,
  type IconName,
} from '~/libs/types/types.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  label?: string;
  buttonType?: 'button' | 'submit';
  iconName?: IconName | undefined;
  iconWidth?: number;
  iconHeight?: number;
  style?: ButtonStyle;
  isDisabled?: boolean;
  onClick?:
    | ((event_: React.MouseEvent) => void)
    | ((event_: React.MouseEvent) => Promise<void>)
    | undefined;
};

const Button: React.FC<Properties> = ({
  buttonType = 'button',
  label,
  iconName,
  iconWidth,
  iconHeight,
  style = 'primary',
  isDisabled = false,
  onClick,
}) => {
  return (
    <button
    type={buttonType}
      className={getValidClassNames(styles[style])}
      onClick={onClick}
      disabled={isDisabled}
    >
      {iconName && (
        <Icon
          name={iconName}
          width={iconWidth}
          height={iconHeight}
        />
      )}
      <span>{label}</span>
    </button>
  );
};

export { Button };