import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as Yup from 'yup';
// import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  heading: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    marginVertical: 10
  },
  input: {
    borderStyle: 'solid',
    borderColor: '#CDCDCD',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10
  },
  btn: {
    borderRadius: 5,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
    color: '#fff',
    backgroundColor: '#0065D3',
    fontWeight: theme.fontWeights.bold,
    overflow: 'hidden'
  }
})

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
    review: Yup.string()
      .optional()
  })

  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    review: ''
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
          <FormikTextInput name="review" placeholder="Review" fieldStyle={styles.input} multiline={true}/>
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

  const onSubmit = async (values) => {
    console.log(values)
  };
  return (
    <CreateReviewContainer onSubmit={onSubmit} />
  )
};

export default CreateReview;