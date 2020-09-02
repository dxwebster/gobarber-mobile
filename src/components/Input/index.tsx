import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';

// Formulários
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

// Styled-Components
import { Container, TextInput, Icon } from './styles';

// Interfaces
interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface inputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

// Component Input, que recebe todas as prorpriedades do input e também o ref
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<inputValueReference>({ value: defaultValue });

  // cria um método por dentro do componente filho
  // pega a ref do password, e quando der focus, vai executar uma ação
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  // Para lidar com as mudanças do Input
  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      // O vai acontecer com o input quando receber um novo valor
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.seNativeProps({ text: value });
      },
      // O que vai acontecer com o input quando o unform limpar
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  // Retorno do component
  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
        ref={inputElementRef}
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
