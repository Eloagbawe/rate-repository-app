import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from "react-router-native";
import { Button, Menu, Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({handleSort, sortName, onChangeSearch, searchQuery}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  
  const handleChange = (title) => {
    handleSort(title)
    closeMenu()
  }

  return (
    <View style={{backgroundColor:'#E1E5E7'}}>
      <View style={{marginTop: 20, marginBottom: 5, marginHorizontal: 20}}>
        <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{borderRadius: 10}}
        theme={{ colors: { elevation: {level3: '#ffffff'} } }}/>
      </View>

      <View
        style={{
        paddingVertical: 5,
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
      }}>
        
        <Menu
          contentStyle={{
            backgroundColor: '#ffffff',
          }}
          visible={visible}
          onDismiss={closeMenu}
          anchor={<View style={styles.flex}><Button onPress={openMenu}>{sortName}</Button>
          <MaterialCommunityIcons name="menu-down" size={26} color="#1C1E21" onPress={openMenu}
          /></View>}>
          <Menu.Item onPress={() => handleChange('Latest repositories')} title="Latest repositories" />
          <Menu.Item onPress={() => handleChange('Highest rated repositories')} title="Highest rated repositories" />
          <Menu.Item  onPress={() => handleChange('Lowest rated repositories')} title="Lowest rated repositories" />
        </Menu>
      </View>
    </View>
  )
}

export class RepositoryListContainer extends React.Component {
  
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;
    const { handleSort, sortName, onChangeSearch, searchQuery } = props

    return (
      <RepositoryListHeader
      handleSort={handleSort} sortName={sortName}
      onChangeSearch={onChangeSearch} searchQuery={searchQuery}
      />
    );
  };

  render() {
    const {repositories, navigate, onEndReach} = this.props;
  
    const repositoryNodes = repositories
    ? repositories?.edges?.map(edge => edge.node)
    : [];

    return (
      <FlatList
        // ...
        ListHeaderComponent={this.renderHeader}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({item}) =>
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem repositoryData={item}/>
        </Pressable>}
      />
    );
  }
}

const RepositoryList = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
    name: 'Latest repositories'
  })
  const [filter, setfilter] = useState('')
  const [value] = useDebounce(filter, 500);

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy: sortBy.orderBy,
    orderDirection: sortBy.orderDirection,
    searchKeyword: value
  });

  const handleSort = (sort) => {
    switch(sort) {
      case 'Highest rated repositories':
        setSortBy({
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'DESC',
          name: 'Highest rated repositories'
        })
        break;
      case 'Lowest rated repositories':
        setSortBy({
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'ASC',
          name: 'Lowest rated repositories'
        })
        break;
      default:
        setSortBy({
          orderBy: 'CREATED_AT',
          orderDirection: 'DESC',
          name: 'Latest repositories'
        })
        break;
    }
  }

  const onChangeSearch = (value) => {
    setfilter(value)
  }
  const onEndReach = () => {
    fetchMore();
  };
  
  return (
    <RepositoryListContainer repositories={repositories} handleSort={handleSort}
    sortName={sortBy.name} searchQuery={filter} onChangeSearch={onChangeSearch}
    navigate={navigate} onEndReach={onEndReach}/>
  )

}
export default RepositoryList;
