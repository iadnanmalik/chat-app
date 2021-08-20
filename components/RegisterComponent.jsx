import styled from "styled-components";
import logo from "../assets/chat.png";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { SERVER_URL } from "../server";
import {
  Container,
  LogoWrapper,
  Form,
  InputContainer,
  Errors,
} from "../styledComps/artifacts";
import { useRouter } from "next/dist/client/router";
import { useState, useEffect } from "react";
import { FormInput } from "./FormInput";
import { useApi } from "../Hooks/useApi";

export const RegisterComponent = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [apiErrors, setApiErrors] = useState("");
  const [result, authenticate] = useApi();

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    if (result?.data) {
      setToken(result.data.token);
      router.push("/dashboard");
    } else {
      console.log(result?.response.data.msg);
      setApiErrors(result?.response.data.msg);
    }
  }, [result]);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      password2: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      password: Yup.string()
        .required("This field is required")
        .min(8, "Password must be atleast 8 characters"),
      password2: Yup.string()
        .when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
          ),
        })
        .min(8, "Password must be atleast 8 characters"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),

    onSubmit: async (values) => {
      const url = "/api/users";
      authenticate({ url, values });
    },
  });
  return (
    <Container>
      <LogoWrapper>
        <Image src={logo} alt="" />
        <h3>
          Chat <span>Engo</span>
        </h3>
      </LogoWrapper>
      <Form onSubmit={formik.handleSubmit}>
        <h3>Sign Up</h3>

        <InputContainer>
          <FormInput
            type="text"
            placeholder="Full Name"
            id="name"
            name="name"
            {...formik.getFieldProps("name")}
            showError={formik.touched.name && formik.errors.name}
            error={formik.errors.name}
          />
          <FormInput
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            {...formik.getFieldProps("email")}
            showError={formik.touched.email && formik.errors.email}
            error={formik.errors.email}
          />
          <FormInput
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            {...formik.getFieldProps("password")}
            showError={formik.touched.password && formik.errors.password}
            error={formik.errors.password}
          />
          <FormInput
            type="password"
            placeholder="Confirm Password"
            id="password2"
            name="password2"
            {...formik.getFieldProps("password2")}
            showError={formik.touched.password2 && formik.errors.password2}
            error={formik.errors.password2}
          />

          {apiErrors ? <Errors>{apiErrors}</Errors> : null}
        </InputContainer>
        <button type="submit">Sign Up</button>
      </Form>
      <div>
        <Terms>
          By signing up, I agree to the Privacy Policy <br /> and Terms of
          Service
        </Terms>
        <h4>
          Already have an account?{" "}
          <span>
            {" "}
            <Link href="/login">Sign In</Link>
          </span>
        </h4>
      </div>
    </Container>
  );
};

const Terms = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 10px;
  color: #808080;
  font-weight: 300;
`;
