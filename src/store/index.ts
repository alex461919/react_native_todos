import { useDispatch, useSelector } from 'react-redux';
import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  createSlice,
  isPlain,
  PayloadAction,
} from '@reduxjs/toolkit';

import initData from './init';
import { Task, TaskStatusEnum } from '../model';
import { compareAsc, isWithinInterval } from 'date-fns';

const todoSlice = createSlice({
  name: 'todo',
  initialState: initData({ taskCount: 40, dayCount: 8 }),
  reducers: {
    add: (state, action: PayloadAction<Pick<Task, 'date' | 'topic'>>) => {
      const last = state.reduce((ac, item) => (item.id > ac ? item.id : ac), '0');
      state.push({ ...action.payload, id: (last + 1).toString(), status: TaskStatusEnum.Wait });
    },
    save: (state, action: PayloadAction<Pick<Task, 'id' | 'topic' | 'date'>>) => {
      const index = state.findIndex(item => action.payload.id === item.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    remove: (state, action: PayloadAction<Pick<Task, 'id'>>) => {
      const index = state.findIndex(item => action.payload.id === item.id);
      state.splice(index, 1);
    },
    setStatus: (state, action: PayloadAction<Pick<Task, 'id' | 'status'>>) => {
      const index = state.findIndex(item => action.payload.id === item.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
  },
});

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable: (value: any) => isPlain(value) || value instanceof Date,
});

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
  middleware: [serializableMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export const { add, save, remove, setStatus } = todoSlice.actions;

export const useTodoDateRangeSelector = (interval?: Interval) =>
  useSelector((state: RootState) => {
    const list = state.todo
      .filter(item => (interval ? isWithinInterval(item.date, interval) : true))
      .sort((d1, d2) => compareAsc(d1.date, d2.date))
      .reduce<{ [key: string]: Task[] }>(function (prev, item) {
        const date = item.date.toDateString();
        prev[date] = prev[date] || [];
        prev[date].push(item);
        return prev;
      }, {});
    return Object.entries(list).map(item => ({ date: item[0], tasks: item[1] }));
  });

export const useTodoByIdSelector = (id: string) =>
  useSelector((state: RootState) => state.todo.find(item => item.id === id));

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
