import React, { ReactNode, useCallback } from 'react';
import { useController } from 'react-hook-form';

type Properties = {
    defaultValue: string;
    placeholder: string;
    onValueChange: (search: string) => void;
    children?: ReactNode;
}

const SearchInput: React.FC<Properties> = ({ defaultValue, placeholder, children, onValueChange }) => {
  const { field } = useController({
    name: 'search',
    defaultValue,
  });
  const { value, onChange } = field;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    onValueChange(event.target.value);
  };

  return (
    <div className="search-input-container">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
      />
      {children}
    </div>
  );
};

export default SearchInput;