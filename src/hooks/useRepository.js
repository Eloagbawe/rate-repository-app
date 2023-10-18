import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = ({id, first, after}) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY,
    { fetchPolicy: 'cache-and-network',
      variables: { repositoryId: id, first, after }
    });

    const handleFetchMore = () => {
      const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
      if (!canFetchMore) {
        return;
      }
      console.log('load more')
      fetchMore({
        variables: {
          after: data.repository.reviews.pageInfo.endCursor,
          variables: { repositoryId: id },
        },
      });
    };

  return { repository: data, error, loading,
    fetchMore: handleFetchMore, ...result };

};

export default useRepository;
