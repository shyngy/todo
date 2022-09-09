import React from 'react';
import { ChangeCurrentFilter, FilterStatusList } from '../../utils/types';

interface TasksFilterProps {
  filterStatus: FilterStatusList;
  currentStatus: FilterStatusList;
  changeCurrentFilter: ChangeCurrentFilter;
}

const TasksFilter: React.FC<TasksFilterProps> = ({
  filterStatus,
  currentStatus,
  changeCurrentFilter,
}) => {
  const onButtonClick = () => {
    changeCurrentFilter(filterStatus);
  };
  return (
    <li>
      <button
        type="button"
        className={currentStatus === filterStatus ? 'selected' : ''}
        onClick={onButtonClick}
      >
        {filterStatus}
      </button>
    </li>
  );
};

export default TasksFilter;
