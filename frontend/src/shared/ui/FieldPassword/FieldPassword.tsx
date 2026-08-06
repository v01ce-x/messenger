import { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, LockIcon } from '@/assets/icons';
import './FieldPassword.scss';

interface Props {
  className?: string;
  label?: string;
  error?: string;
  placeholder?: string;
}

const FieldPassword = (props: Props) => {
  const { error, placeholder, label, className, ...propsInput } = props;

  const inputId = useId();
  const [inputType, setInputType] = useState<'text' | 'password'>('password');

  const switchTypeInput = () => {
    if (inputType === 'password') {
      setInputType('text');
    } else if (inputType === 'text') {
      setInputType('password');
    }
  };

  return (
    <div className={`field ${className}`}>
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
        <span>
          <LockIcon className="icon--18" />
        </span>
        <input
          type={inputType}
          id={inputId}
          placeholder={placeholder}
          className="field__input"
          {...propsInput}
        />
        <EyeIcon
          onClick={switchTypeInput}
          className={`icon--22 animated-icon ${inputType === 'text' ? 'is-active' : ''}`}
        />
      </div>
    </div>
  );
};

export default FieldPassword;
