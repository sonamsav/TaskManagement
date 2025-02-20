import React from "react";
import { Toaster } from "react-hot-toast";
import PageTitle from "./components/PageTitle";
import Header from "./components/Header";
import styles from "./styles/modules/app.module.scss";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <PageTitle>Create Task List</PageTitle>
        <div className={styles.app__wrapper}>
          <Header />
          <TaskList />
        </div>
        <Toaster
          position="top"
          toastOptions={{
            style: {
              fontSize: "1.4rem",
            },
          }}
        />
      </div>
    </>
  );
};

export default App;