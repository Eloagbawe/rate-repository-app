import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import Main from './src/components/Main';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';



const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1C1E21",
  },
};

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
      </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
    )
};

export default App;
