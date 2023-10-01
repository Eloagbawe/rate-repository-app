import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "../components/RepositoryList";


describe('Repository List', () => {
  describe('Repository List Container', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        edges: [
          {
            node: {
              fullName: "jaredpalmer/formik",
              forksCount: 2732,
              id: "jaredpalmer.formik",
              language: "TypeScript",
              ownerAvatarUrl: "https://avatars.githubusercontent.com/u/4060187?v=4",
              stargazersCount: 32880,
              ratingAverage: 90,
              reviewCount: 5,
              description: "Build forms in React, without the tears 😭 ",
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd'
          },
          {
            node: {
              fullName: "async-library/react-async",
              forksCount: 94,
              id: "async-library.react-async",
              language: "JavaScript",
              ownerAvatarUrl: "https://avatars.githubusercontent.com/u/54310907?v=4",
              stargazersCount: 2127,
              ratingAverage: 72,
              reviewCount: 3,
              description: "🍾 Flexible promise-based React data loader",
            },
            cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
        "pageInfo": {
          "hasNextPage": false,
          "hasPreviousPage": false,
          "startCursor": "WzE2OTU4Mzg1ODY3NDgsImphcmVkcGFsbWVyLmZvcm1payJd",
          "endCursor": "WzE2OTU4MDYxODY3NDgsInplaXQuc3dyIl0="
        },
        "totalCount": 10
      };
      
      render(<RepositoryListContainer repositories={repositories} />);
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
    
      const fullNames = screen.getAllByTestId('fullName');
      const descriptions = screen.getAllByTestId('description');
      const languages = screen.getAllByTestId('language');
      const forksCounts = screen.getAllByTestId('forksCount');
      const starsCounts = screen.getAllByTestId('stargazersCount');
      const ratingAverages = screen.getAllByTestId('ratingAverage');
      const reviewCounts = screen.getAllByTestId('reviewCount');


      screen.debug();
      
      expect(repositoryItems.length).toBe(2);
    
      expect(firstRepositoryItem).toBeOnTheScreen()
      expect(secondRepositoryItem).toBeOnTheScreen()

      expect(firstRepositoryItem).toContainElement(fullNames[0]);
      expect(secondRepositoryItem).toContainElement(fullNames[1]);

      expect(firstRepositoryItem).toHaveTextContent('jaredpalmer/formik');
      expect(secondRepositoryItem).toHaveTextContent('async-library/react-async');

      expect(within(firstRepositoryItem).getByTestId('fullName')).toHaveTextContent('jaredpalmer/formik');
      expect(within(secondRepositoryItem).getByTestId('fullName')).toHaveTextContent('async-library/react-async');

      expect(fullNames[0]).toHaveTextContent('jaredpalmer/formik');
      expect(fullNames[1]).toHaveTextContent('async-library/react-async');


      expect(firstRepositoryItem).toContainElement(descriptions[0]);
      expect(secondRepositoryItem).toContainElement(descriptions[1]);
      expect(descriptions[0]).toHaveTextContent('Build forms in React, without the tears 😭');
      expect(descriptions[1]).toHaveTextContent('🍾 Flexible promise-based React data loader');

      expect(firstRepositoryItem).toContainElement(languages[0]);
      expect(secondRepositoryItem).toContainElement(languages[1]);
      expect(languages[0]).toHaveTextContent('TypeScript');
      expect(languages[1]).toHaveTextContent('JavaScript');

      expect(firstRepositoryItem).toContainElement(forksCounts[0]);
      expect(secondRepositoryItem).toContainElement(forksCounts[1]);
      expect(forksCounts[0]).toHaveTextContent('2.7k');
      expect(forksCounts[1]).toHaveTextContent('94');

      expect(firstRepositoryItem).toContainElement(starsCounts[0]);
      expect(secondRepositoryItem).toContainElement(starsCounts[1]);
      expect(starsCounts[0]).toHaveTextContent('32.9k');
      expect(starsCounts[1]).toHaveTextContent('2.1k');

      expect(firstRepositoryItem).toContainElement(ratingAverages[0]);
      expect(secondRepositoryItem).toContainElement(ratingAverages[1]);
      expect(ratingAverages[0]).toHaveTextContent(90);
      expect(ratingAverages[1]).toHaveTextContent(72);

      expect(firstRepositoryItem).toContainElement(reviewCounts[0]);
      expect(secondRepositoryItem).toContainElement(reviewCounts[1]);
      expect(reviewCounts[0]).toHaveTextContent(5);
      expect(reviewCounts[1]).toHaveTextContent(3);
    });
  });
});
