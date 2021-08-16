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
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { SERVER_URL } from "../server";
import * as Yup from "yup";
import { FormInput } from "./FormInput";

export const LoginComponent = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [apiErrors, setApiErrors] = useState("");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

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
      const body = JSON.stringify(values);
      console.log(body);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await axios.post(`${SERVER_URL}/api/auth`, body, config);
        setToken(res.data.token);
        router.push("/dashboard");
      } catch (error) {
        console.log(error.response.data[0]);
        setApiErrors(error.response.data[0].msg);
      }
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
        </h4>
      </div>
    </Container>
  );
};
