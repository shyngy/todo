import React from 'react';
import Task from '../Task';
import { OnChangeTask, OnDeleteTask, TaskData } from '../../utils/types';

interface TaskListProps {
  tasks: TaskData[];
  onDeleteTask: OnDeleteTask;
  onChangeTask: OnChangeTask;
}

const TaskList: React.FC<TaskListProps> = ({ onDeleteTask, tasks, onChangeTask }) => (
  <ul className="todo-list">
    {tasks.map((item) => (
      <Task
        key={`${item.createdAt}${item.id}`}
        onDeleteTask={onDeleteTask}
        onChangeTask={onChangeTask}
        id={item.id}
        status={item.status}
        createdAt={item.createdAt}
        label={item.label}
      />
    ))}
  </ul>
);

export default TaskList;
