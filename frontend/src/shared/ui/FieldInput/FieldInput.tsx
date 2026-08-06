import { useId } from 'react';
import * as React from 'react';
import './FieldInput.scss';
import { motion, AnimatePresence } from 'framer-motion';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  type?: string;
  error?: string;
  placeholder?: string;
  children?: React.ReactNode;
}

const FieldInput = (props: Props) => {
  const {
    type = 'text',
    error,
    placeholder,
    label,
    className,
    children,
    ...inputProps
  } = props;

  const inputId = useId();

  return (
    <div className={`field ${className || ''}`}>
      <AnimatePresence mode="wait">
        {error ? (
          <motion.span
            className="field__error"
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.span>
        ) : (
          <motion.label
            className="field__label"
            htmlFor={inputId}
            key="label"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        )}
      </AnimatePresence>
      <div className="input__wrap">
        {children && <span>{children}</span>}
        <input
          type={type}
          id={inputId}
          placeholder={placeholder}
          className="field__input"
          {...inputProps}
        />
      </div>
    </div>
  );
};

export default FieldInput;
