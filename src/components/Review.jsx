import { View, Pressable } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as Yup from 'yup';
import useReview from '../hooks/useReview';
import { useNavigate } from "react-router-native";
import { styles } from './SignIn';

export const CreateReviewContainer = ({ onSubmit }) => {

  const CreateReviewSchema = Yup.object().shape({
    ownerName: Yup.string()
      .required('Repository owner name is required'),
    repositoryName: Yup.string()
      .required('Repository name is required'),
    rating: Yup.number()
      .required('Rating is required')
      .min(0)
      .max(100),
    text: Yup.string()
      .optional()
  })

  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a Review</Text>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={CreateReviewSchema}>
      {({ handleSubmit }) => 
        <View>
          <FormikTextInput name="ownerName" placeholder="Repository owner name" fieldStyle={styles.input}/>
          <FormikTextInput name="repositoryName" placeholder="Repository Name" fieldStyle={styles.input}/>
          <FormikTextInput name="rating" placeholder="Rating between 0 and 100" fieldStyle={styles.input}/>
          <FormikTextInput name="text" placeholder="Review" fieldStyle={styles.input} multiline={true}/>
          <Pressable onPress={handleSubmit}>
            <Text style={styles.btn}>Create a review</Text>
          </Pressable>
        </View> 
      }
      </Formik>
    </View>
  )
}

const CreateReview = () => {
  const [create_review] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const {ownerName, repositoryName, rating, text} = values;
    try {
      const res = await create_review({ownerName, repositoryName, rating: parseInt(rating), text});
      if (res) {
        navigate(`/repositories/${res?.createReview?.repositoryId}`)
      }
    } catch(e){
      console.log(e);
    }
  };
  return (
    <CreateReviewContainer onSubmit={onSubmit} />
  )
};

export default CreateReview;
