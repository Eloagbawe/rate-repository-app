import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage  from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';


const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();


    const signIn = async ({ username, password }) => {
      const { data } = await mutate({ variables: {credentials: { username, password } }});
      await authStorage.setAccessToken(data?.authenticate?.accessToken)
      apolloClient.resetStore();
      return data?.authenticate
    };

    return [signIn, result];
};

export default useSignIn
