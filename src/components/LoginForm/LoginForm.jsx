import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations.js";
import css from "./LoginForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";

export default function LoginForm() {
  const dispatch = useDispatch();

  function handleSubmit(values, actions) {
    dispatch(logIn({ email: values.email, password: values.password }));
    actions.resetForm();
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(7, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
  });

  const emailId = useId();
  const passwordId = useId();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      <Form className={css.contactForm}>
        <label htmlFor={emailId}>Email</label>
        <Field
          type="email"
          name="email"
          id={emailId}
          className={css.inputField}
        ></Field>
        <ErrorMessage
          name="email"
          component="span"
          className={css.errorMessage}
        ></ErrorMessage>
        <label htmlFor={passwordId}>Password</label>
        <Field
          type="password"
          name="password"
          id={passwordId}
          className={css.inputField}
        ></Field>
        <ErrorMessage
          name="password"
          component="span"
          className={css.errorMessage}
        ></ErrorMessage>
        <button type="submit" className={css.submitButton}>
          Login
        </button>
      </Form>
    </Formik>
  );
}
