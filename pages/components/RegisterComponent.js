import styled from "styled-components";
import logo from "../../assets/chat.png";
import Image from 'next/image';
import Link from 'next/link'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios"; 
import {SERVER_URL} from "../../server"
import { Container,LogoWrapper,Form, StyledInput, InputContainer, Errors } from "../../styledComps/artifacts";




const RegisterComponent = () => {
  const handleClick = () =>{
    console.log("Clicked me!")
  }
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      password2:'',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
        password: Yup.string().required("This field is required")
        .min(8,"Password must be atleast 8 characters")
        ,
        password2: Yup.string().when("password", {
          is: val => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
          )
        }).min(8,"Password must be atleast 8 characters"),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async values => {
     
       const body= JSON.stringify(values)
       
      //  const config = {
      //    headers: {
      //      "Content-Type": "application/json",
      //   },
      // };
      // const res = await axios.post(`${SERVER_URL}/api/users`, body, config);
      // console.log(res.data.token)
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
       <Form  onSubmit={formik.handleSubmit}>
         <h3>Sign Up</h3>
       
        <InputContainer>
            <StyledInput placeholder="Full name" onClick={handleClick} id="name" name="name" {...formik.getFieldProps('name')}/>
            {formik.touched.name && formik.errors.name ? (
              <Errors style={{"color": "red"}}>{formik.errors.name}</Errors>
            ) : null}
            <StyledInput type="email" placeholder="Email" id="email" name="email"  {...formik.getFieldProps('email')}/>
            {formik.touched.email && formik.errors.email ? (
              <Errors>{formik.errors.email}</Errors>
            ) : null}
            <StyledInput type="password" placeholder="Password" id="password" name="password" {...formik.getFieldProps('password')} />
            {formik.touched.password && formik.errors.password ? (
              <Errors>{formik.errors.password}</Errors>
            ) : null}
            <StyledInput type="password" placeholder="Confrim Password" id="password2" name="password2" {...formik.getFieldProps('password2')} />
            {formik.touched.password2 && formik.errors.password2 ? (
              <Errors>{formik.errors.password2}</Errors>
            ) : null}
              
        </InputContainer>

        <button type="submit">Sign Up</button>
      </Form>
      <div>
         <Terms>
           By signing up, I agree to the Privacy Policy <br /> and Terms of
           Service
         </Terms>
         <h4>
           Already have an account? <span> <Link href="/login">Sign In</Link></span>
           <span>
              <Link href="/dashboard">
                dashboard
              </Link>
           </span>
         </h4>
       </div>

    </Container>
  );
};
// const RegisterComponent = () => {

//   return (
//     <Container>
//       <LogoWrapper>
//         <Image  src={logo} alt="" />
//         <h3>
//           Chat <span>Engo</span>
//         </h3>
//       </LogoWrapper>
//       <Form>
//         <h3>Sign Up</h3>
//       <InputContainer>
        // <StyledInput placeholder="Full name" />
        // <StyledInput type="email" placeholder="Email" />
        // <StyledInput type="password" placeholder="Password" />
        // <StyledInput type="password" placeholder="Confrim Password" />
//       </InputContainer>
//         <button>Sign Up</button>
//       </Form>
//       <div>
//         <Terms>
//           By signing up, I agree to the Privacy Policy <br /> and Terms of
//           Service
//         </Terms>
//         <h4>
//           Already have an account? <span> <Link href="/login">Sign In</Link></span>
//         </h4>
//       </div>
//     </Container>
//   );
// };

const Terms = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 10px;
  color: #808080;
  font-weight: 300;
`;



export default RegisterComponent;