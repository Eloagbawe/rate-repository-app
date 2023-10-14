import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import { ReviewItem } from "./SingleRepository";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    variables: {includeReviews: true}
  });

  const reviews = data?.me?.reviews
  ? data?.me?.reviews?.edges?.map(edge => edge.node)
  : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  )
}

export default MyReviews;
