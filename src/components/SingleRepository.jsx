import { View, FlatList, StyleSheet} from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import Text from './Text';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem repositoryData={{...repository, detailMode: true}}/>
};

const ReviewItem = ({ review }) => {
  <View>
    <Text>{review?.text}</Text>
  </View>
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useRepository({id});

  const data = repository?.repository;

  const reviews = data?.reviews
  ? data.reviews?.edges?.map(edge => edge.node)
  : [];

  console.log(reviews[0]?.text)
  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={data} />}
      // ...
    />
  )
}

export default SingleRepository;
