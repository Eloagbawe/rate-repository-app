import { View, StyleSheet, Text, Pressable } from 'react-native';
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
    width: '30%',
  },
  text: {
   color: '#fff',
   fontWeight: 'bold',
   paddingHorizontal: 5
  }
  // ...
});

const AppBarTab = (props) => {
  const {tab} = props;
  const handlePress = () => {
    console.log('pressed')
  }

  return (
    <View style={styles.flexItem}>
      <Pressable onPress={handlePress}>
        <Text style={styles.text}>{tab}</Text>
      </Pressable>
    </View>
    )
}

const AppBar = () => {

  return (
    <View style={styles.container}>
      <AppBarTab tab={'Repositories'}/>
    </View>)
};

export default AppBar;
