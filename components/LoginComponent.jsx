import logo from "../assets/chat.png";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  LogoWrapper,
  Form,
  InputContainer,
  Errors,
} from "../styledComps/artifacts";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { SERVER_URL } from "../server";
import * as Yup from "yup";
import { FormInput } from "./FormInput";
import { useApi } from "../Hooks/useApi";

export const LoginComponent = () => {
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
      console.log(result?.response.data[0]);
      setApiErrors(result?.response.data[0].msg);
    }
  }, [result]);
  
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("This field is required")
        .min(8, "Password must be atleast 8 characters"),

      email: Yup.string().email("Invalid email address").required("Required"),
    }),

    onSubmit: async (values) => {
      const url = "/api/auth";
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
        <h3>Sign In</h3>

        <InputContainer>
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

          {apiErrors ? <Errors>{apiErrors}</Errors> : null}
        </InputContainer>
        <button type="submit">Sign In</button>
      </Form>
      <div>
        <h4>
          Not have an account?{" "}
          <span>
            {" "}
            <Link href="/">Sign Up </Link>
          </span>
          <h3></h3>
        </h4>
      </div>
    </Container>
  );
};
