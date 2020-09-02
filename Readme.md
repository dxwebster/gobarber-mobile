## Executar no seu computador

- Clonar Repositório: `git clone https://github.com/dxwebster/GoBarber-Mobile`
- Ir para projeto: `cd GoBarber-Mobile`
- Instalar dependências: `yarn install`
- Rodar app no Android Studio: `yarn android`

## Criar esse projeto do zero

- Remove legacy react-native-cli: `npm uninstall -g react-native-cli`
- Install new thing: `npm i -g @react-native-community/cli`
- Create new project with typescript template: `npx react-native init <MyApp> --template react-native-template-typescript`
- Run the app on Android studio: `yarn android`

## Limpar template e configurações

- Remover prettier e eslint files
- Mover o App.tsx pra uma pasta 'src', excluir conteúdo e iniciar uma View
- Ajeitar o caminho do App no arquivo 'index.js'

## Bibliotecas

- Styled-Components: `yarn add styled-components`
- React Navigation: `yarn add @react-navigation/native`
- Outros itens do React Navigations: `yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`
- Navegação em Pilhas: `yarn add @react-navigation/stack`
- Icones: `yarn add react-native-vector-icons`
- Lidar com Iphone: `yarn add react-native-iphone-x-helper`
- Formulários: `yarn add @unform/core @unform/mobile`
- Validação dos Forms: `yarn add yup`
- Conexão com api: `yarn add axios`
- Banco assíncrono pra salvar informações: `yarn add @react-native-community/async-storage`

Dependências de desenvolvimento:

- Tipos do Styled-Components: `yarn add @types/styled-components -D`
- Tipos do Icons: `yarn add @types/react-native-vector-icons -D`
- Tipos da Validação dos Forms: `yarn add @types/yup -D`

## Configuração de StatusBar

Através do component 'StatusBar' nativo do react-native, podemos estilizar nossa statusbar (barrinha do topo com horário, informações de bateria, etc)

```tsx
import React from 'react';
import { View, StatusBar } from 'react-native';

const App: React.FC = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <View style={{ flex: 1, backgroundColor: '#312e38' }} />
  </>
);

export default App;
```

## React Navigation e Rotas

Com o React Navigation lidamos com as nossas rotas. O contexto nesse caso é outro component, o 'NavigationContainer' que precisa ficar em volta de todos os componentes.

```tsx
import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <View style={{ flex: 1, backgroundColor: '#312e38' }}>
      <Routes />
    </View>
  </NavigationContainer>
);

export default App;
```

Nosso arquivo de rotas, fica dentro de uma pasta 'route' e utiliza a navegação em pilhas (stack).

```tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator>
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
```

O React Stack Navigator, cria um header automático, quando utilizado. Esse header é totalmente customizável e é usado em diversas aplicações. É possível incluir logo, botões, menus e etc. Mas na nossa aplicação GoBarber não vamos utiliza-lo, então vamos desativá-lo. Para isso, basta adicionar algumas opções no component 'Navigator' no arquivo de rotas.

```tsx
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
```

## Adicionando fontes

Vamos criar uma outra pasta assets, mas na raíz da aplicação para colocar as fontes. Vamos criar um arquivo 'react-native.config.js' e colocar as configurações dessas assets para o projeto:

```js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};
```

E rodar o comando: `yarn react-native link`

## Primeiras estilizações

Precisamos lembrar que no React Native não temos encadeamento e herança de estilos, cada elemento terá sua própria estilização.

```ts
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;
```

Também não precisamos incluir o display:flex nos projetos React Native, pois todos os elementos já vem assim por padrão.

## Component Input e Button

Como o input se repete ao lono da aplicação, vamos criar um component só pra ele. Vamos utilizar o TextInputProps do react-native para extender as propriedades padrão de um input do HTML e poder criar nossas próprias propriedades.

Nosso input precisará ter um name e um icon. Vamos criar uma interface para setar os tipos e depois incluí-las no nosso component, junto com o resto (...rest) de propriedades padrão.

Lembrando que todas os textos da aplicação precisam ter uma tag de texto em volta.

```tsx
import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => (
  <Container>
    <Icon name={icon} size={20} color="#666360" />
    <TextInput placeholderTextColor="#666360" {...rest} />
  </Container>
);

export default Input;
```

Nos estilos, vamos usar uma biblioteca de icones, 'react-native-vector-icons/Feather' para incluir os ícones no input. Para isso, precisamos fazer algumas configurações num arquivo do projeto. Acessar android > app > build.gradle e incluir o código abaixo:

```ts
project.ext.vectoricons =[
    iconsFontNames: ['Feather.ttf']
]
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

```

Rodar o yarn android de novamente para fazer a instalação dos ícones.

Agora, nos nossos estilos do component Input, como estamos utilizando essa biblioteca externa, criaremos o styled-component do icon colocando a biblioteca entre parêntesis:

```ts
export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
```

O component Button, segue a mesma lógica do Input, vamos utilizar umma biblioteca do React Native para extender as propriedades padrão do botão HTML para incluir o conteúdo do botão, no caso o 'children'.

```tsx
import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;
```

## Página: Signin

Com nossos dois components criados, vamos importa-los e incluí-los na página de Signin, passando para cada um suas respectivas propriedades já setadas:

```tsx
import React from 'react';
import { Image } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Title } from './styles';

const Signin: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu logon</Title>

      <Input name="email" icon="mail" placeholder="Email" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button onPress={() => {}}>Entrar</Button>
    </Container>
  );
};

export default Signin;
```

## Formulários

Explicação do Ref: vídeo Integrando Unform, 2:24min
