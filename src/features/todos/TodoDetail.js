import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { update } from "features/todos/todosSlice";

const FormSchema = Yup.object().shape({
  title: Yup.string().max(64, "Too Long!").required("Required"),
  content: Yup.string().max(256, "Too Long!").required("Required"),
});

const TodoDetail = () => {
  const { id } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();
  const todoDetail = useSelector((state) => {
    return state.todos.find((item) => item.id === Number(id));
  });

  console.log(todoDetail);

  const { title, content, createdAt } = todoDetail;
  const readableCreatedAt = new Date(createdAt).toLocaleString();
  const initialValues = {
    id: Number(id),
    title,
    content,
  };
  const handleSubmit = (values) => {
    dispatch(update(values));
    history.push("/todos");
  };

  return (
    <div className="App">
      <p
        style={{ width: "50%", textAlign: "right", fontStyle: "italic" }}
      >{`Created at: ${readableCreatedAt}`}</p>
      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="custom-form">
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" />
            <ErrorMessage name="title" />

            <label htmlFor="content">Content</label>
            <Field id="content" name="content" as="textarea" />
            <ErrorMessage name="content" />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TodoDetail;
