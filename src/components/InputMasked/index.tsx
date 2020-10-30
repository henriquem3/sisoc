/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import ReactInputMask, { Props as MaskProps } from 'react-input-mask';
import { Container, Error } from './styles';

interface MaskedInputProps extends MaskProps {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

export const InputMask: React.FC<MaskedInputProps> = ({
  name,
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
        // ref.value = value;
      },
      clearValue(ref: any) {
        ref.setInputValue('');
        // ref.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={false} isFocused={false}>
      {Icon && <Icon />}
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default InputMask;
