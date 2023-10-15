import { FlatList, View, StyleSheet, Pressable, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import { ReviewItem } from "./SingleRepository";
import theme from '../theme';
import Text from './Text';
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from '../graphql/mutations';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  actionBtns: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10
  },
  btn: {
    borderRadius: 5,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
    color: '#fff',
    fontWeight: theme.fontWeights.bold,
    overflow: 'hidden'
  },
  viewBtn: {
    backgroundColor: '#0065D3',
    marginRight: 20
  },
  deleteBtn: {
    backgroundColor: '#D5384C'
  },
  bottomBorder: {
    borderStyle: 'solid',
    borderBottomWidth: 10,
    borderColor: '#E1E5E7'
  },

});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewContainer = ({review, refetch}) => {
  const navigate = useNavigate();
  const [ mutate ] = useMutation(DELETE_REVIEW);

  const viewRepository = (id) => {
    navigate(`/repositories/${id}`)
  }

  const deleteRepository = () => {
    Alert.alert('Delete Review',
    'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: async() => {
        const { data } = await mutate({variables: {deleteReviewId: review?.id}})
        if (data) {
          refetch()
        }
      }},
    ]);
  }

  return (
    <View style={styles.bottomBorder}>
      <ReviewItem review={review} />
      <View style={styles.actionBtns}>
        <Pressable onPress={() => viewRepository(review?.repositoryId)}>
          <Text style={[styles.btn, styles.viewBtn]}>View repository</Text>
        </Pressable>
        <Pressable onPress={() => deleteRepository()}>
          <Text style={[styles.btn, styles.deleteBtn]}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  )

}
const MyReviews = () => {
  const { data, refetch } = useQuery(GET_ME, {
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
      renderItem={({ item }) => <ReviewContainer review={item} refetch={refetch}/>}
      keyExtractor={({ id }) => id}
    />
  )
}

export default MyReviews;
