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

### Limpar template e configurações

- Remover prettier e eslint files
- Mover o App.tsx pra uma pasta 'src', excluir conteúdo e iniciar uma View
- Ajeitar o caminho do App no arquivo 'index.js'

## Bibliotecas

- Styled-Components: `yarn add styled-components`
- React Navigation: `yarn add @react-navigation/native`
  `yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

- Navegação em Pilhas: `yarn add @react-navigation/stack`

Dependências de desenvolvimento:

- Tipos do Styled-Components: `yarn add @types/styled-components -D`

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

### React Navigation e Rotas

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

### Importando imagens

Na nossa página 'Signin', vamos importar o logo pelo commponent 'Image' do React-Native. Basta incluí-lo dentro do 'Container'.

```tsx
import React from 'react';
import { Image } from 'react-native';

import { Container } from './styles';

import logoImg from '../../assets/logo.png';

const Signin: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
    </Container>
  );
};

export default Signin;
```

### Adicionando fontes

Vamos criar uma outra pasta assets, mas na raíz da aplicação para colocar as fontes. Vamos criar um arquivo 'react-native'config.js' e colocar as configurações dessas assets para o projeto:

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

### Primeiras estilizações

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
