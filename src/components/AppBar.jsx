import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Link } from 'react-router-native';

import Constants from 'expo-constants';
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bgAppBar,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 3

    // ...
  },
  flexItem: {
    width: '25%',
  },
  text: {
   color: '#fff',
   fontWeight: 'bold',
   paddingHorizontal: 5
  },
  link: {
    width: '100%'
  }
  // ...
});

const AppBarTab = (props) => {
  const { tab, route } = props;
  const handlePress = () => {
    console.log('pressed')
  }

  return (
    <View style={styles.flexItem}>
      <Pressable onPress={handlePress}>
        <Link to={route}>
          <Text style={styles.text}>{tab}</Text>
        </Link>
      </Pressable>
    </View>
    )
}

const AppBar = () => {

  return (
    <View style={styles.container}>
      <AppBarTab tab={'Repositories'} route={"/"}/>
      <AppBarTab tab={'Sign In'} route={"/sign-in"}/>
    </View>)
};

export default AppBar;
