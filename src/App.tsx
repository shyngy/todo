import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import NewTaskForm from './components/NewTaskForm';
import {
  AddTask,
  ChangeCurrentFilter,
  FilterStatusList,
  OnChangeTask,
  OnDeleteTask,
  TaskData,
} from './utils/types';
import { v4 as uuidv4 } from 'uuid';

import defaultValueTasks from './utils';

const App = () => {
  const [tasks, setTasks] = React.useState<TaskData[]>(defaultValueTasks);
  const [currentFilter, setCurrentFilter] = React.useState<FilterStatusList>('all');

  const changeCurrentFilter: ChangeCurrentFilter = (status) => {
    setCurrentFilter(status);
  };

  const clearCompleted = () => {
    setTasks((state) => state.filter((item) => item.status !== 'completed'));
  };

  const itemsLeft = () => {
    return tasks.reduce((acc, item) => (item.status === 'active' ? acc + 1 : acc), 0);
  };

  const addTask: AddTask = (task) => {
    setTasks((state) => [{ ...task, id: uuidv4() }, ...state]);
  };

  const onDeleteTask: OnDeleteTask = (id) => {
    setTasks((state) => state.filter((item) => item.id !== id));
  };

  const onChangeTask: OnChangeTask = (id, task) => {
    setTasks((state) => state.map((item) => (item.id === id ? task : item)));
  };

  const currentTasks = () => {
    if (currentFilter === 'all') return tasks;
    return tasks.filter((item) => item.status === currentFilter);
  };

  return (
    <div className="App">
      <section className="todoapp">
        <NewTaskForm onSaveTask={addTask} />
        <section className="main">
          <TaskList
            onChangeTask={onChangeTask}
            onDeleteTask={onDeleteTask}
            tasks={currentTasks()}
          />
          <Footer
            clearCompleted={clearCompleted}
            changeCurrentFilter={changeCurrentFilter}
            currentFilter={currentFilter}
            itemsLeft={itemsLeft()}
          />
        </section>
      </section>
    </div>
  );
};

export default App;
