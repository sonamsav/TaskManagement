import { format } from "date-fns";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../slices/taskSlice";
import { getClasses } from "../utils/getClasses";
import CheckBoxButton from "./CheckBoxButton";
import AddTaskForm from "./AddTaskForm";
import styles from "../styles/modules/item.module.scss";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "active" | "complete";
  time: string;
  dueDate?: string;
}

interface TaskItemProps {
  task: Task;
  index: number;
}

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(task.status === "complete");
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setChecked(task.status === "complete");
  }, [task.status]);

  const handleCheck = () => {
    setChecked((prevChecked) => {
      const newStatus = prevChecked ? "pending" : "complete";
      dispatch(updateTask({ ...task, status: newStatus }));
      return !prevChecked;
    });
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast.success("Task Deleted Successfully");
  };

  return (
    <>
      <motion.div className={styles.item} variants={child} key={index}>
        <div className={styles.taskDetails}>
          <CheckBoxButton checked={checked} handleCheck={handleCheck} />

          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.taskText,
                task.status === "complete" ? styles["taskText--completed"] : "",
              ])}
            >
              <span className={styles.title}> {task.title} </span>
            </p>

            <p
              className={getClasses([
                styles.taskText,
                task.status === "complete" ? styles["taskText--completed"] : "",
              ])}
            >
              {task.description}
            </p>
            <p className={styles.time}>
              {task.dueDate
                ? format(new Date(task.dueDate), "p, MM/dd/yyyy")
                : "No Due Date"}
            </p>
          </div>
        </div>
        <div className={styles.taskActions}>
          <div
            className={styles.icon}
            onClick={handleDelete}
            onKeyDown={handleDelete}
            tabIndex={0}
            role="button"
          >
            <MdDelete
              style={{
                color: "red",
              }}
            />
          </div>
        </div>
      </motion.div>
      <AddTaskForm
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        task={task}
      />
    </>
  );
};

export default TaskItem;
