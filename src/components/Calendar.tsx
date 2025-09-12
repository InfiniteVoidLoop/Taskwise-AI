import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import type { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { useDateMonthStore } from '../store';
import type { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';

const RedPickersDay = styled(PickersDay)(() => ({
  '&.red-day': {
    backgroundColor: '#ff4444',
    color: 'white',
    '&:hover': {
      backgroundColor: '#cc3333',
    },
    '&.Mui-selected': {
      backgroundColor: '#aa2222',
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

// List of dates you want to color red
const redDates = [
  '2025-09-25',
  '2025-09-01', 
  '2025-09-04',
];

// List of dates you want to color blue
const greenDates = [
  '2025-09-10',
  '2025-09-15',
  '2025-09-20',
]

function CustomDay(props: PickersDayProps) {
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