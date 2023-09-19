import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderBottomWidth: 8,
    borderColor: '#E1E5E7'
  },
  flexItemImg: {
    flexGrow: 0,
    width: '25%',
   },
   flexItemDetails: {
    flexGrow: 0,
    width: '75%',
   },
   avatarImg: {
    width: 70,
    height: 70,
    borderRadius: 10,
   },
   name: {
    fontWeight: theme.fontWeights.bold,
    marginTop: 5,
    marginBottom: 5,
    fontSize: theme.fontSizes.subheading
   },
   description: {
    color: '#595959',
    marginBottom: 5
   },
   language: {
    backgroundColor: '#0168D4',
    color: '#ffffff',
    fontWeight: theme.fontWeights.bold,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop:7,
    paddingBottom:7,

   }
});

const RepositoryItem = (props) => {
  const { fullName, description, language,
  forksCount, stargazersCount, ratingAverage,
  reviewCount, avatarImg} = props;
  return (
    <View>
    <View style={styles.container}>
      <View style={styles.flexItemImg}>
        <Image
          style={styles.avatarImg}
          source={{uri: avatarImg}}
        />
      </View>
      <View style={styles.flexItemDetails}>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={{alignItems: 'baseline', marginTop: 8, marginBottom: 8}}>
            <Text style={styles.language}>{language}</Text>
        </View>
      </View>
       </View>

      <View style={styles.detailsContainer}>
        <View>
          <Text>{stargazersCount}</Text>
          <Text>Stars</Text>
        </View>
        <View>
          <Text>{forksCount}</Text>
          <Text>Forks</Text>
         </View>
         <View>
           <Text>{reviewCount}</Text>
           <Text>Reviews</Text>
         </View>

         <View>
           <Text>{ratingAverage}</Text>
           <Text>Rating</Text>
         </View>
      </View>


    </View>
  );
};

export default RepositoryItem;
