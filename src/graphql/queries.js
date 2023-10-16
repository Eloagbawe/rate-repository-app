import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String,
    $after: String, $first: Int) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword,
      after: $after, first: $first){
      edges {
        node {
          fullName
          forksCount
          id
          language
          ownerAvatarUrl
          stargazersCount
          ratingAverage
          reviewCount
          description
        }
        cursor
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_ME = gql`
  query getCurrentUser($includeReviews: Boolean = false){
    me {
      id
      username
      reviews @include(if: $includeReviews){
        edges {
          node {
            createdAt
            id
            rating
            repositoryId
            text
            userId
            user {
              username
              id
              createdAt
            }
          }
        }
      }
    }
  }
`
export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      url
      language
      ownerAvatarUrl
      ratingAverage
      reviewCount
      stargazersCount
      forksCount
      description
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`
