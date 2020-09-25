import React, { useRef, useEffect, TextareaHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import { InputControl } from './styles';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

const Textarea: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({ name: fieldName, ref: inputRef.current, path: 'value' });
  }, [fieldName, registerField]);

  return (
    <InputControl>
      <textarea rows={4} defaultValue={defaultValue} ref={inputRef} {...rest} />
    </InputControl>
  );
};

export default Textarea;
