import * as React from 'react';
import './FieldInput.scss';

interface Props {
  className?: string;
  placeholder?: string;
  children?: React.ReactNode;
  onChange: (value: string) => void;
}

const FieldSearch = (props: Props) => {
  const { placeholder, className, children, onChange } = props;

  return (
    <div className={`field ${className || ''}`}>
      <div className="input__wrap">
        {children && <span>{children}</span>}
        <input
          placeholder={placeholder}
          spellCheck={false}
          className="field__input"
          onChange={(event) => onChange(event.currentTarget.value)}
        />
      </div>
    </div>
  );
};

export default FieldSearch;
