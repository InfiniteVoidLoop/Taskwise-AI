import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useDateMonthStore } from '../store';
import {Dayjs} from 'dayjs'

function Calendar() {
  const {dateMonth, setDateMonth} = useDateMonthStore();
  const handleDateChange = (newDate: Dayjs| null) =>{
    if (newDate) setDateMonth(newDate);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar 
        value ={dateMonth}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
