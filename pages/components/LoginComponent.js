import logo from "../../assets/chat.png";
import Image from 'next/image';
import Link from 'next/link'
import { Container,LogoWrapper,Form, StyledInput, InputContainer, Errors} from "../../styledComps/artifacts";
import { useFormik } from 'formik';
 import * as Yup from 'yup';
 
const LoginComponent = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
     
      email: '',
    },
    validationSchema: Yup.object({
   
        password: Yup.string().required("This field is required")
        .min(8,"Password must be atleast 8 characters")
        ,
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Container>
      <LogoWrapper>
        <Image  src={logo} alt="" />
        <h3>
          Chat <span>Engo</span>
        </h3>
      </LogoWrapper>
      <Form onSubmit={formik.handleSubmit}>
        <h3>Sign In</h3>
       
        <InputContainer>
        
            <StyledInput type="email" placeholder="Email" id="email" name="email"  {...formik.getFieldProps('email')}/>
            {formik.touched.email && formik.errors.email ? (
              <Errors>{formik.errors.email}</Errors>
            ) : null}
            <StyledInput type="password" placeholder="Password" id="password" name="password" {...formik.getFieldProps('password')} />
            {formik.touched.password && formik.errors.password ? (
              <Errors>{formik.errors.password}</Errors>
            ) : null}
        </InputContainer>

        <button type="submit">Sign In</button>
      </Form>
      <div>
      
        <h4>
          Not have an account? <span> <Link href="/">Sign Up </Link></span>
        </h4>
      </div>
    </Container>
  );
};


export default LoginComponent;