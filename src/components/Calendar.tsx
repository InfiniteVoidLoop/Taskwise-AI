import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import type { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { useDateMonthStore } from '../store';
import type { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';
import { useRedDateStore } from '../store';
import { useGreenDateStore } from '../store';

const RedPickersDay = styled(PickersDay)(() => ({
  '&.red-day': {
    backgroundColor: '#b70a0aff',
    color: 'white',
    '&:hover': {
      backgroundColor: '#df6d6dff',
    },
    '&.Mui-selected': {
      backgroundColor: '#f43232ff',
    },
  },
}));

const GreenPickersDay = styled(PickersDay)(() => ({
  '&.green-day': {
    backgroundColor: '#04700cff',
    color: 'white',
    '&:hover': {
      backgroundColor: '#72d888ff',
    },
    '&.Mui-selected': {
      backgroundColor: '#0e9145ff',
    },
  },
}));


function CustomDay(props: PickersDayProps) {
  const {redDates} = useRedDateStore();
  const {greenDates} = useGreenDateStore();
  const { day, ...other } = props;
  const isRedDay = redDates.includes(day.format('YYYY-MM-DD'));
  const isGreenDay = greenDates.includes(day.format('YYYY-MM-DD'));
  
  if (isRedDay) {
    return (
      <RedPickersDay
        {...other}
        day={day}
        className="red-day"
      />
    );
  }
  
  if (isGreenDay) {
    return (
      <GreenPickersDay
        {...other}
        day={day}
        className="green-day"
      />
    );
  }
  
  return (
    <PickersDay
      {...other}
      day={day}
    />
  );
}

function Calendar() {
  const { dateMonth, setDateMonth } = useDateMonthStore();

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) setDateMonth(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar 
        value={dateMonth}
        onChange={handleDateChange}
        slots={{
          day: CustomDay,
        }}
      />
    </LocalizationProvider>
  );
}

export default Calendar;