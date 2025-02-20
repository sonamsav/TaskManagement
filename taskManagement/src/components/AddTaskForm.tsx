import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { addTask, updateTask } from "../slices/taskSlice";
import styles from "../styles/modules/modal.module.scss";
import HeaderButton from "./HeadorButton";

type TaskType = {
  id: string;
  title: string;
  description: string;
  status: "active" | "complete" | "pending";
  time?: string;
  dueDate?: string; 
};

type AddTaskFormProps = {
  type: "add" | "update";
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  task?: TaskType;
};

const dropIn = {
  hidden: { opacity: 0, transform: "scale(0.9)" },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: { duration: 0.1, type: "spring", damping: 25, stiffness: 500 },
  },
  exit: { transform: "scale(0.9)", opacity: 0 },
};

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  type,
  modalOpen,
  setModalOpen,
  task,
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<Omit<TaskType, "id" | "time">>({
    title: "",
    description: "",
    status: "pending",
    dueDate: "", 
  });

  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  useEffect(() => {
    if (type === "update" && task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "pending",
        dueDate: "",
      });
    }
  }, [type, task, modalOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<Record<keyof typeof formData, string>> = {};
  
    if (formData.title.trim() === "") {
      errors.title = "Title is required";
    }
    if (formData.description.trim() === "") {
      errors.description = "Description is required";
    }
    if (!formData.dueDate) {
      errors.dueDate = "Due Date is required";
    }
  
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
  
    if (type === "add") {
      dispatch(
        addTask({
          id: uuid(),
          ...formData,
          time: new Date().toLocaleString(),
          dueDate: formData.dueDate,  // ✅ Ensure dueDate is included
        })
      );
      toast.success("Task added successfully");
    } else if (type === "update" && task) {
      const updatedTask = { ...task, ...formData, dueDate: formData.dueDate };  // ✅ Ensure update includes dueDate
  
      if (
        task.title !== formData.title ||
        task.status !== formData.status ||
        task.description !== formData.description ||
        task.dueDate !== formData.dueDate
      ) {
        dispatch(updateTask(updatedTask));
        toast.success("Task Updated successfully");
      } else {
        toast.error("No changes made");
        return;
      }
    }
    setModalOpen(false);
  };
  

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.formTitle}>
                {type === "add" ? "Add" : "Update"} TASK
              </h1>

              <label htmlFor="title">
                <input
                  placeholder="Title"
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                {validationErrors.title && (
                  <span className={styles.error}>{validationErrors.title}</span>
                )}
              </label>

              <label htmlFor="description">
                <input
                  placeholder="Description"
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                {validationErrors.description && (
                  <span className={styles.error}>
                    {validationErrors.description}
                  </span>
                )}
              </label>

              <label htmlFor="dueDate">
                Due Date
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
                {validationErrors.dueDate && (
                  <span className={styles.error}>
                    {validationErrors.dueDate}
                  </span>
                )}
              </label>

              <label htmlFor="status">
                Status
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="complete">Completed</option>
                </select>
              </label>

              <div className={styles.buttonContainer}>
                <HeaderButton type="submit" variant="primary">
                  {type === "add" ? "Add Task" : "Update Task"}
                </HeaderButton>
                <HeaderButton
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </HeaderButton>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTaskForm;
