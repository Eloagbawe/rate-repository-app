import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#25292B',
    paddingBottom: 15

    // ...
  },
  text: {
   color: '#fff',
   fontWeight: 'bold'
  }
  // ...
});

const AppBar = () => {
  return <View style={styles.container}>
   <Text style={styles.text}>Repositories</Text>
  </View>;
};

export default AppBar;
