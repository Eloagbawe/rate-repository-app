import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
      }
    }
  }
`;

export const GET_ME = gql`
  query {
    me {
      id
      username
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
    }
  }
`
