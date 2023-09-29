import { View, StyleSheet, Pressable,  ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import Constants from 'expo-constants';
import theme from '../theme'
import useAuthStorage  from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';



const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bgAppBar,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 3

    // ...
  },
  flexItem: {
    // width: '25%',
    marginRight: 20
  },
  scrollView: {
    height: '100%',
    paddingTop: 10,
    paddingBottom: 15
  },
  text: {
   color: '#fff',
   fontWeight: 'bold',
   paddingHorizontal: 5
  },
  link: {
    width: '100%'
  }
});

const AppBarTab = (props) => {

  const { tab, route, link, handleClick } = props;
  const handlePress = () => {
    console.log('pressed')
  }

  return (
    <View style={styles.flexItem}>
      <Pressable onPress={handleClick ? handleClick : handlePress}>
        {link ? <Link to={route}>
          <Text style={styles.text}>{tab}</Text>
        </Link> : <Text style={styles.text}>{tab}</Text>}
      </Pressable>
    </View>
    )
}

const AppBar = () => {
  const { data } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
  });

  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient();


  const logout = () => {
    authStorage.removeAccessToken().then(() => {
      apolloClient.resetStore();
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab tab={'Repositories'} route={"/"} link={true}/>
        {data?.me ?  <AppBarTab tab={'Sign Out'} handleClick={logout}/> : 
         <AppBarTab tab={'Sign In'} route={"/sign-in"} link={true}/>}
      </ScrollView>
    </View>)
};

export default AppBar;
