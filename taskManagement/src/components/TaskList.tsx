import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import styles from "../styles/modules/app.module.scss";
import TaskItem from "./TaskItem";
import { Task } from "../types/task";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const TaskList: React.FC = () => {
  const taskList = useSelector((state: RootState) => state.task.taskList);
  const filterStatus = useSelector(
    (state: RootState) => state.task.filterStatus
  );

  const sortedTaskList = [...taskList]
    .filter((item): item is Task => !!item.time)
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  const filteredTaskList = sortedTaskList.filter((task) => {
    const filterStatusValue =
      task.status === "complete"
        ? "completed"
        : task.status === "active"
        ? "pending"
        : task.status;

    if (filterStatus === "all") return true;
    return filterStatusValue === filterStatus;
  });

  const pendingCount = taskList.filter(
    (task) => task.status === "pending"
  ).length;
  const completedCount = taskList.filter(
    (task) => task.status === "complete"
  ).length;

  // console.log("Filtered tasks:", pendingCount);
  // console.log("Filtered completedCountcompletedCount:", completedCount);

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTaskList.length > 0 ? (
          filteredTaskList.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Tasks Found
          </motion.p>
        )}
      </AnimatePresence>
      <div className={styles.statusSummary}>
        <p>
          <span className={styles.pendingCount}>Pending: {pendingCount}</span>
          <span className={styles.completedCount}>
            Completed: {completedCount}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default TaskList;
