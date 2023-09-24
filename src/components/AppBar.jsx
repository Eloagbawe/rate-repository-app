import { View, StyleSheet, Text, Pressable,  ScrollView } from 'react-native';
import { Link } from 'react-router-native';

import Constants from 'expo-constants';
import theme from '../theme'

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
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab tab={'Repositories'} route={"/"}/>
        <AppBarTab tab={'Sign In'} route={"/sign-in"}/>
      </ScrollView>
    </View>)
};

export default AppBar;
