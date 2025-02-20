import { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderButton from "./HeadorButton";
import styles from "../styles/modules/app.module.scss";
import AddTaskForm from "./AddTaskForm";
import { updateFilterStatus } from "../slices/taskSlice";
import FilterButton from "./FilterBox";
import { RootState } from "../redux/store";

const Header: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const filterStatus = useSelector((state: RootState) => state.task.filterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateFilterStatus(e.target.value as "all" | "pending" | "complete"));
  };

  return (
    <div className={styles.appHeader}>
      <HeaderButton variant="primary" onClick={() => setModalOpen(true)}>
        + Add New Task
      </HeaderButton>
      <FilterButton id="status" onChange={updateFilter} value={filterStatus}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option> 
      </FilterButton>
      <AddTaskForm type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default Header;
