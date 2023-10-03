import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import theme from '../theme';
import Text from './Text';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 40,
    justifyContent: 'space-between',
  },
  bottomBorder: {
    borderStyle: 'solid',
    borderBottomWidth: 10,
    borderColor: '#E1E5E7'
  },
  flexItemImg: {
    width: '25%',
   },
   flexItemDetails: {
    width: '75%',
   },
   avatarImg: {
    width: 65,
    height: 65,
    borderRadius: 6,
   },
   name: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
    fontSize: theme.fontSizes.subheading
   },
   description: {
    color: '#595959',
    marginBottom: 5
   },
   buttonStyle: {
    backgroundColor: theme.colors.primary,
    color: '#ffffff',
    fontWeight: theme.fontWeights.bold,
    borderRadius: 5,
    overflow: 'hidden'

   },
   language: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop:7,
    paddingBottom:7,
   },
   githubUrl: {
    padding: 15,
    textAlign: 'center'
   },
   countContainer: {
    padding: 10
   },
   count: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 15
   },
   countLabel: {
    color: '#595959',
     fontSize: 15
   }
});

const formatCount = (count) => {
  if (count < 1000) {
    return count;
  } else {
    const thousands = Math.round(count / 1000 * 10) / 10;
    return `${thousands}k`
  }
}

const RepositoryItem = (props) => {
  const { repositoryData } = props;

  const { fullName, description, language,
    forksCount, stargazersCount, ratingAverage,
    reviewCount, ownerAvatarUrl, url, detailMode} = repositoryData;

  return (
    <View testID="repositoryItem">
    <View style={styles.container}>
      <View style={styles.flexItemImg}>
        <Image
          style={styles.avatarImg}
          source={{uri: ownerAvatarUrl}}
        />
      </View>
      <View style={styles.flexItemDetails}>
        <Text style={styles.name} testID="fullName">{fullName}</Text>
        <Text style={styles.description} testID="description">{description}</Text>
        <View style={{alignItems: 'baseline', marginTop: 8, marginBottom: 8}}>
          <Text style={[styles.buttonStyle, styles.language]} testID="language">{language}</Text>
        </View>
      </View>
       </View>

      <View style={styles.detailsContainer}>
        <View style={styles.countContainer}>
          <Text style={styles.count} testID="stargazersCount">{formatCount(stargazersCount)}</Text>
          <Text style={styles.countLabel} testID="stars">Stars</Text>
        </View>
        <View style={styles.countContainer}>
          <Text style={styles.count} testID="forksCount">{formatCount(forksCount)}</Text>
          <Text style={styles.countLabel}>Forks</Text>
         </View>
         <View style={styles.countContainer}>
           <Text style={styles.count} testID="reviewCount">{formatCount(reviewCount)}</Text>
           <Text style={styles.countLabel}>Reviews</Text>
         </View>

         <View style={styles.countContainer}>
           <Text style={styles.count} testID="ratingAverage">{formatCount(ratingAverage)}</Text>
           <Text style={styles.countLabel}>Rating</Text>
         </View>

      </View>

      {detailMode && <View style={{paddingHorizontal: 30, paddingBottom: 20}}>
        <Pressable onPress={() => Linking.openURL(url)}>
          <Text style={[styles.buttonStyle, styles.githubUrl]}>Open in Github</Text>
        </Pressable>
      </View>}

      <View style={styles.bottomBorder}></View>

    </View>
  );
};

export default RepositoryItem;
