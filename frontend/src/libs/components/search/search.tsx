import React, { ReactNode, useCallback } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Button, Icon } from '../components';

import styles from './styles.module.scss';

type Properties = {
    defaultValue: string;
    placeholder: string;
    onValueChange: (search: string) => void;
    children?: ReactNode;
}

const SearchInput: React.FC<Properties> = ({ defaultValue, placeholder, onValueChange }) => {
  const { control } = useForm({
      defaultValues: { search: defaultValue },
      mode: 'onChange',
  });
  const { field } = useController({
    name: 'search',
    defaultValue,
    control,
  });
  const { value, onChange } = field;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    onValueChange(event.target.value);
  };

  return (
    <div className={styles["search-input"]}>
        <div className={styles["search-input__container"]}>
            <div className={styles["search-input__icon"]}>
                <Icon name="loupe" width={22} height={22}/>
            </div>
           
            <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            />
             <div className={styles["search-input__button"]}>
                <Button style="square" iconName="arrow-right"/>
             </div>
            
        </div>
        
    </div>
  );
};

export { SearchInput };