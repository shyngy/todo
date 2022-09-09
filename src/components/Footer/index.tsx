import React from 'react';
import TasksFilter from '../TasksFilter';
import { ChangeCurrentFilter, FilterStatusList } from '../../utils/types';

const filters: { filterStatus: FilterStatusList }[] = [
  { filterStatus: 'all' },
  { filterStatus: 'active' },
  { filterStatus: 'completed' },
];

interface FooterProps {
  currentFilter: FilterStatusList;
  changeCurrentFilter: ChangeCurrentFilter;
  clearCompleted: () => void;
  itemsLeft: number;
}

const Footer: React.FC<FooterProps> = ({
  currentFilter,
  changeCurrentFilter,
  clearCompleted,
  itemsLeft,
}) => (
  <footer className="footer">
    <span className="todo-count">{`${itemsLeft} items left`}</span>
    <ul className="filters">
      {filters.map((item) => (
        <TasksFilter
          key={item.filterStatus}
          currentStatus={currentFilter}
          changeCurrentFilter={changeCurrentFilter}
          filterStatus={item.filterStatus}
        />
      ))}
    </ul>
    <button type="button" onClick={clearCompleted} className="clear-completed">
      Clear completed
    </button>
  </footer>
);

export default Footer;
