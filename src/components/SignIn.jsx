import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as Yup from 'yup';

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

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" fieldStyle={styles.input}/>
      <FormikTextInput name="password" placeholder="Password" fieldStyle={styles.input} secureTextEntry/>
      <Pressable onPress={onSubmit}>
        <Text style={styles.btn}>Sign In</Text>
      </Pressable>
    </View>
  )
}
const SignIn = () => {

  const SignInSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
  })

  const onSubmit = (values) => {
    console.log('submit')
    console.log(values)
  }
  const initialValues = {
    username: '',
    password: '',
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={SignInSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
    </View>
  )
};

export default SignIn;
