import { useId } from 'react';
import './FieldCheckbox.scss';

interface Props {
  label?: string;
}

export const Checkbox = (props: Props) => {
  const { label, ...inputProps } = props;
  const id = useId();

  return (
    <div className="field__checkbox">
      <div className="checkbox">
        <input
          type="checkbox"
          defaultChecked={true}
          id={id}
          className="checkbox__input"
          {...inputProps}
        />
        <span className="checkbox__box"></span>
      </div>
      <label htmlFor={id} className="field__label">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
