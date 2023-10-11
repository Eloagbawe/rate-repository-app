import { View, Pressable } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as Yup from 'yup';
import { styles } from './SignIn';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from "react-router-native";


export const SignUpContainer = ({ onSubmit }) => {

  const SignUpSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(5)
      .max(30),
    password: Yup.string()
      .required('Password is required')
      .min(5)
      .max(30),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null])
    .required('Password confirmation is required')
  })

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a Review</Text>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={SignUpSchema}>
      {({ handleSubmit }) => 
        <View>
          <FormikTextInput name="username" placeholder="Username" fieldStyle={styles.input}/>
          <FormikTextInput name="password" placeholder="Password" fieldStyle={styles.input} 
          secureTextEntry/>
          <FormikTextInput name="confirmPassword" placeholder="Confirm Password" 
          fieldStyle={styles.input} secureTextEntry/>
          <Pressable onPress={handleSubmit}>
            <Text style={styles.btn}>Sign Up</Text>
          </Pressable>
        </View> 
      }
      </Formik>
    </View>
  )
}

const SignUp = () => {
  const navigate = useNavigate()
  const [signIn] = useSignIn()
  const [signUp] = useSignUp()

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const res = await signUp({ username, password });
      if (res) {
        try {
          const resp = await signIn({ username, password});
          if (resp) {
            navigate("/")
          }
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit}/>
  )
}

export default SignUp;
