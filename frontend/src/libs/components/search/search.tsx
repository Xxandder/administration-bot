import React, { ReactNode, useCallback } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Button, Icon } from '../components';

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
    <div className="search-input">
        <div className="search-input__container">
            <Icon name="loupe" width={22} height={22}/>
            <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className="search-input"
            />
            <Button style="square" iconName="arrow-right"/>
        </div>
        
    </div>
  );
};

export { SearchInput };