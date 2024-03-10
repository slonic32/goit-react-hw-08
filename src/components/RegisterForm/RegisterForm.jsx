import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations.js";
import css from "./RegisterForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";

export default function RegisterForm() {
  const dispatch = useDispatch();

  function handleSubmit(values, actions) {
    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
    actions.resetForm();
  }

  const initialValues = {
    email: "",
    password: "",
    name: "",
  };

  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(7, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const emailId = useId();
  const passwordId = useId();
  const nameId = useId();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerSchema}
    >
      <Form className={css.contactForm}>
        <label htmlFor={nameId}>Username</label>
        <Field
          type="text"
          name="name"
          id={nameId}
          className={css.inputField}
        ></Field>
        <ErrorMessage
          name="name"
          component="span"
          className={css.errorMessage}
        ></ErrorMessage>
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
          Register
        </button>
      </Form>
    </Formik>
  );
}
