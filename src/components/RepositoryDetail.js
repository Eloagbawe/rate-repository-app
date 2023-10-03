import { View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';

export const RepositoryDetail = () => {
  const { id } = useParams();
  const { repository } = useRepository({id});

  const data = repository?.repository;

  return (
    <View>
       {data && <RepositoryItem repositoryData={{...data, detailMode: true}}/>}
    </View>
  )
}
