import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/operations";

export default function ContactForm() {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    phone: "",
  };

  const contactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phone: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const nameId = useId();
  const numberId = useId();

  function handleSubmit(values, actions) {
    dispatch(addContact({ name: values.name, phone: values.phone }));
    actions.resetForm();
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactSchema}
    >
      <Form className={css.contactForm}>
        <label htmlFor={nameId}>Name</label>
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
        <label htmlFor={numberId}>Number</label>
        <Field
          type="text"
          name="phone"
          id={numberId}
          className={css.inputField}
        ></Field>
        <ErrorMessage
          name="phone"
          component="span"
          className={css.errorMessage}
        ></ErrorMessage>
        <button type="submit" className={css.submitButton}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
