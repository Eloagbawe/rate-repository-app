// import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({orderBy, orderDirection, searchKeyword=''}) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword }
    // Other options
  });
  // const [loading, setLoading] = useState(false);

  // const fetchRepositories = async () => {
  //   setLoading(true);

  //   // Replace the IP address part with your own IP address!
  //   const response = await fetch('http://192.168.100.25:5005/api/repositories');
  //   const json = await response.json();

  //   setLoading(false);
  //   setRepositories(json);
  // };

  // return { repositories: data, loading, refetch: fetchRepositories };

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        variables: {orderBy, orderDirection, searchKeyword},
      },
    });
  };
  return { repositories: data?.repositories, error, loading,
    fetchMore: handleFetchMore };

};

export default useRepositories;
