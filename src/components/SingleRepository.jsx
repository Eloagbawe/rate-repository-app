import { View, FlatList, StyleSheet, Platform } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  separator: {
    height: 5,
  },
  reviewContainer: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  ratingContainer: {
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#0966C1',
    width: 55,
    height: 55,
    marginRight: 10
  },
  ratingText: {
    fontSize: 20,
    fontWeight: theme.fontWeights.bold,
    color: '#0966C1',
    textAlign: 'center',
    marginTop: Platform.select({
      android: 10,
      ios: 12,
      default: 10,
    }),
  },
  detailsContainer: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexShrink: 1
  },
  bottomBorder: {
    borderStyle: 'solid',
    borderBottomWidth: 10,
    borderColor: '#E1E5E7'
  },
  username: {
    fontSize: 20,
    fontWeight: theme.fontWeights.bold,
    color:'#1c2023'
  },
  createdText: {
    color: '#6F6F70',
    marginVertical: 8,
    fontSize: 16
  },
  reviewText: {
    color: '#2E2E2E',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem repositoryData={{...repository, detailMode: true}}/>
};

export const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.username}>{review?.user?.username}</Text>
        <Text style={styles.createdText}>{format(new Date(review?.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={styles.reviewText}>{review?.text}</Text>
      </View>
    </View>
  )
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useRepository({id});

  const data = repository?.repository;

  const reviews = data?.reviews
  ? data.reviews?.edges?.map(edge => edge.node)
  : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => 
      <View style={styles.bottomBorder}>
        <ReviewItem review={item} />
      </View>
      }
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={data} />}
      // ...
    />
  )
}

export default SingleRepository;
