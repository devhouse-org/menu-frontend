import React, { useState, ChangeEvent } from 'react';
import { getThemeColors } from '../utils';
import { t } from 'i18next';

interface DatePickerProps {
  startYear?: number;
  endYear?: number;
  onDateChange: (year: string, month: string, day: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ startYear = 1900, endYear = new Date().getFullYear(), onDateChange }) => {
  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const theme = getThemeColors();
  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value;
    setYear(newYear);
    setDay(''); // Reset day when year changes
    onDateChange(newYear, month, day);
  };

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value;
    setMonth(newMonth);
    setDay(''); // Reset day when month changes
    onDateChange(year, newMonth, day);
  };

  const handleDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDay = e.target.value;
    setDay(newDay);
    onDateChange(year, month, newDay);
  };

  const getDaysInMonth = (year: string, month: string): number => {
    return new Date(Number(year), Number(month), 0).getDate();
  };

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: year && month ? getDaysInMonth(year, month) : 31 }, (_, i) => i + 1);

  return (
    <div className="flex mt-2 gap-4  rounded-lg ">
      <select
        value={year}
        onChange={handleYearChange}
        style={{backgroundColor:"white"}}
        className="p-2 border rounded focus:outline-none w-28 focus:ring-2"
      >
        <option disabled value="">{t("Year")}</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <select
        value={month}
        onChange={handleMonthChange}
        style={{backgroundColor:"white"}}
        className="p-2 border rounded focus:outline-none w-28 focus:ring-2"
      >
        <option disabled value="">{t("Month")}</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <select
        value={day}
        onChange={handleDayChange}
        style={{backgroundColor:"white"}}
        disabled={!year || !month}
        className="p-2 border rounded focus:outline-none w-28 focus:ring-2"
      >
        <option disabled value="">{t("Day")}</option>
        {days.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DatePicker;
