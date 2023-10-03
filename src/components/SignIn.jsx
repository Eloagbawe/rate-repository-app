import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as Yup from 'yup';
import { useNavigate } from "react-router-native";

import useSignIn from '../hooks/useSignIn';

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

export const SignInContainer = ({ onSubmit }) => {

  const SignInSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
  })

  const initialValues = {
    username: '',
    password: '',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={SignInSchema}>
      {({ handleSubmit }) => 
        <View>
          <FormikTextInput name="username" placeholder="Username" fieldStyle={styles.input}/>
          <FormikTextInput name="password" placeholder="Password" fieldStyle={styles.input} secureTextEntry/>
          <Pressable onPress={handleSubmit}>
            <Text style={styles.btn}>Submit</Text>
          </Pressable>
        </View> 
      }
      </Formik>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const res = await signIn({ username, password });
      if (res) {
        navigate("/")
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SignInContainer onSubmit={onSubmit} />
  )
};

export default SignIn;
