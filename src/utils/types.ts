export interface TaskData {
  label: string;
  status: 'editing' | 'active' | 'completed';
  createdAt: string;
  id: number;
}

export type FilterStatusList = 'all' | 'active' | 'completed';

export type AddTask = (task: Omit<TaskData, 'id'>) => void;
export type OnChangeTask = (id: number, task: TaskData) => void;
export type OnDeleteTask = (id: number) => void;
export type ChangeCurrentFilter = (status: FilterStatusList) => void;
