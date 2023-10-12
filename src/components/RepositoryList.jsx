import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from "react-router-native";
import { Button, Menu } from 'react-native-paper';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  menuItem: {
    color: '#000000'
  },
  button: {
    color: '#000000'
  }
});

// const repositories = [
//   {
//     id: 'jaredpalmer.formik',
//     fullName: 'jaredpalmer/formik',
//     description: 'Build forms in React, without the tears',
//     language: 'TypeScript',
//     forksCount: 1589,
//     stargazersCount: 21553,
//     ratingAverage: 88,
//     reviewCount: 4,
//     ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
//   },
//   {
//     id: 'rails.rails',
//     fullName: 'rails/rails',
//     description: 'Ruby on Rails',
//     language: 'Ruby',
//     forksCount: 18349,
//     stargazersCount: 45377,
//     ratingAverage: 100,
//     reviewCount: 2,
//     ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
//   },
//   {
//     id: 'django.django',
//     fullName: 'django/django',
//     description: 'The Web framework for perfectionists with deadlines.',
//     language: 'Python',
//     forksCount: 21015,
//     stargazersCount: 48496,
//     ratingAverage: 73,
//     reviewCount: 5,
//     ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
//   },
//   {
//     id: 'reduxjs.redux',
//     fullName: 'reduxjs/redux',
//     description: 'Predictable state container for JavaScript apps',
//     language: 'TypeScript',
//     forksCount: 13902,
//     stargazersCount: 52869,
//     ratingAverage: 0,
//     reviewCount: 0,
//     ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
//   },
// ];

const ItemSeparator = () => <View style={styles.separator} />;

const SortRepositoryMenu = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('Latest repositories')

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  
  const handleChange = (title) => {
    setSelected(title)
    closeMenu()
  }

  return (
    <View
      style={{
        paddingVertical: 5,
        flexDirection: 'row',
      }}>
      <Menu
        contentStyle={{
          backgroundColor: '#ffffff',
        }}
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Sort By - {selected}</Button>}>
        <Menu.Item onPress={() => handleChange('Latest repositories')} title="Latest repositories" />
        <Menu.Item onPress={() => handleChange('Highest rated repositories')} title="Highest rated repositories" />
        <Menu.Item  onPress={() => handleChange('Lowest rated repositories')} title="Lowest rated repositories" />
      </Menu>
    </View>
  )
}

export const RepositoryListContainer = ({ repositories }) => {  
  const navigate = useNavigate()

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories?.edges?.map(edge => edge.node)
    : [];

 

  return (
    <FlatList
      ListHeaderComponent={() => <SortRepositoryMenu/>}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) =>
      <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
        <RepositoryItem repositoryData={item}/>
      </Pressable>
      }
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  
  return (
    
    <RepositoryListContainer repositories={repositories}/>

  )

}
export default RepositoryList;
