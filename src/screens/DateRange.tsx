import React, { useContext, useState } from 'react';
import { addDays, endOfToday, endOfTomorrow, startOfToday, startOfTomorrow } from 'date-fns';
import { DateIntervalEnum, RangeItem } from '../model';

export const DateRangeList: { [key in DateIntervalEnum]: RangeItem } = {
  [DateIntervalEnum.Day]: {
    interval: { start: startOfToday(), end: endOfToday() } as Interval,
    name: 'Сегодня',
  },
  [DateIntervalEnum.Today]: {
    interval: { start: startOfTomorrow(), end: endOfTomorrow() } as Interval,
    name: 'Завтра',
  },
  [DateIntervalEnum.Weekly]: {
    interval: { start: startOfToday(), end: addDays(startOfToday(), 7) } as Interval,
    name: 'Неделя',
  },
  [DateIntervalEnum.All]: {
    name: 'За все время',
  },
};

const Context = React.createContext({
  range: DateRangeList[DateIntervalEnum.Day],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setRange: (arg0: typeof DateRangeList[DateIntervalEnum.Day]) => {},
});

Context.displayName = 'DateRangeContext';

export const DateRangeProvider: React.FC<{}> = ({ children }) => {
  const [range, setRange] = useState(DateRangeList[DateIntervalEnum.Day]);
  return <Context.Provider value={{ range, setRange }}>{children}</Context.Provider>;
};

export const useDateRange = () => {
  return useContext(Context);
};
