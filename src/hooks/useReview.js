import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const create_Review = async({ownerName, repositoryName, rating, text}) => {
    const { data } = await mutate({ variables: {review: {ownerName, repositoryName, rating, text}}});
    return data
  }
  return [create_Review, result];
}

export default useReview;
