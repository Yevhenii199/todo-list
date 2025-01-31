import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);

  const formik = useFormik({
    initialValues: {
      task: "",
    },
    validationSchema: Yup.object({
      task: Yup.string()
        .min(5, "Мінімум 5 символів")
        .required("Обов’язкове поле"),
    }),
    onSubmit: (values, { resetForm }) => {
      setTasks([...tasks, { id: Date.now(), text: values.task }]);
      resetForm();
    },
  });

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id, newText) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  };

  return (
    <div className="container">
      <h1>ToDo List</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="task"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.task}
          placeholder="Введіть завдання..."
        />
        <button type="submit">Додати</button>
        {formik.touched.task && formik.errors.task ? <div className="error">{formik.errors.task}</div> : null}
      </form>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <span className="task-text">{task.text}</span>
                <div className="button-group">
                  <button className="edit-btn" onClick={() => updateTask(task.id, prompt("Редагувати:", task.text) || task.text)}>
                    ✏️
                  </button>
                  <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>
    </div>
  );
};

export default ToDoList;
