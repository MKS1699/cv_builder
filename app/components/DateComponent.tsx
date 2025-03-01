"use client";

import { useEffect, useState } from "react";
import { StyledComponentPropsTypes } from "../types/styledComponent";

interface DateComponentPropsTypes extends StyledComponentPropsTypes {
  value: string;
  valueHandler: (val: string) => void;
  id: string;
}

type dateFormatTypes =
  | "ddmmyy" // 19-Jan-70
  | "ddmmYY" // 19-Jan-1970
  | "ddMMyy" // 19-January-70
  | "ddMMYY" // 19-January-1970
  | "mmyy" // Jan-70
  | "MMyy" // January-70
  | "mmYY" // Jan-1970
  | "MMYY" // January-1970
  | "YY" // 1970
  | "yy"; // 70

const DateComponent = ({
  id,
  value,
  valueHandler,
  className,
}: DateComponentPropsTypes) => {
  // format
  const [dateFormat, setDateFormat] = useState<string>("YY"); // date format
  const [monthFormat, setMonthFormat] = useState<string>("mm"); // month format
  const [yearFormat, setYearFormat] = useState<string>("YY"); // year format
  // date
  const [date, setDate] = useState<string>("1"); // date
  const [dateArr, setDateArr] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ]); // date Array
  // month
  const [month, setMonth] = useState<string>(""); // month
  const [monthArr, setMonthArr] = useState<string[]>([]); // month Array
  // year
  const [year, setYear] = useState<string>(`${new Date().getFullYear()}`); // year
  const [yearArr, setYearArr] = useState<string[]>([]); // year Array

  // creating month & year array
  function creatingMonthYearArr(): void {
    const d = new Date();

    const monthNameShort: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthNameFull: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // setting months
    if (monthFormat == "mm") {
      setMonthArr(monthNameShort);
      setMonth(monthNameShort[d.getMonth()]);
    } else {
      setMonthArr(monthNameFull);
      setMonth(monthNameFull[d.getMonth()]);
    }

    // creating year
    if (yearFormat == "YY") {
      // year array
      const yearArr: string[] = [];
      // 50 years back from current
      for (let i = 50; i > 0; i--) {
        let year = d.getFullYear() - i;
        yearArr.push(year.toString());
      }
      // 10 years from current including
      for (let i = 0; i <= 10; i++) {
        let year = d.getFullYear() + i;
        yearArr.push(year.toString());
      }
      setYearArr(yearArr);
      setYear(d.getFullYear().toString());
    } else {
      // year array
      const yearArr: string[] = [];
      // 50 years back from current
      for (let i = 50; i > 0; i--) {
        let year = d.getFullYear() - i;
        yearArr.push(`${year.toString()[2]}${year.toString()[3]}`);
      }
      // 10 years from current including
      for (let i = 0; i <= 10; i++) {
        let year = d.getFullYear() + i;
        yearArr.push(`${year.toString()[2]}${year.toString()[3]}`);
      }
      setYearArr(yearArr);
      setYear(d.getFullYear().toString());
    }
  }

  // crate date value
  function createDateValue() {
    let dateStr: string = "";
    if (
      dateFormat == "ddmmyy" ||
      dateFormat == "ddMMYY" ||
      dateFormat == "ddMMyy" ||
      dateFormat == "ddmmYY"
    ) {
      dateStr = `${date} ${month} ${year}`;
    }
    if (dateFormat == "YY" || dateFormat == "yy") {
      dateStr = `${year}`;
    }
    if (
      dateFormat == "MMYY" ||
      dateFormat == "MMyy" ||
      dateFormat == "mmYY" ||
      dateFormat == "mmyy"
    ) {
      dateStr = `${month} ${year}`;
    }
    valueHandler(dateStr);
  }

  // creating month & year
  useEffect(() => {
    creatingMonthYearArr();
  }, [monthFormat, yearFormat]);

  // handling value
  useEffect(() => {
    createDateValue();
  }, [date, month, year, dateFormat]);

  // updating month & year based on date format
  useEffect(() => {
    // month format update
    if (
      dateFormat == "MMYY" ||
      dateFormat == "MMyy" ||
      dateFormat == "ddMMYY" ||
      dateFormat == "ddMMyy"
    ) {
      setMonthFormat("MM");
    } else if (
      dateFormat == "ddmmYY" ||
      dateFormat == "ddmmyy" ||
      dateFormat == "mmYY" ||
      dateFormat == "mmyy"
    ) {
      setMonthFormat("mm");
    }
    // year format update
    if (
      dateFormat == "MMYY" ||
      dateFormat == "ddMMYY" ||
      dateFormat == "YY" ||
      dateFormat == "ddmmYY" ||
      dateFormat == "mmYY"
    ) {
      setYearFormat("YY");
    } else if (
      dateFormat == "MMyy" ||
      dateFormat == "ddMMyy" ||
      dateFormat == "ddmmyy" ||
      dateFormat == "mmyy" ||
      dateFormat == "yy"
    ) {
      setYearFormat("yy");
    }
  }, [dateFormat]);

  return (
    <div
      className={`w-full h-auto flex flex-row items-center gap-2 p-1 ${className}`}
    >
      {/* date format */}
      <select
        name={`${id}-date-format`}
        id={`${id}-date-format`}
        value={dateFormat}
        onChange={(e) => setDateFormat(e.target.value)}
        className="outline-none ring-2 ring-blue-500 p-1 rounded-md cursor-pointer text-center"
      >
        <option value="yy">yy</option>
        <option value="YY">YY</option>
        <option value="mmyy">mmyy</option>
        <option value="MMYY">MMYY</option>
        <option value="mmYY">mmYY</option>
        <option value="MMyy">MMyy</option>
        <option value="ddmmyy">ddmmyy</option>
        <option value="ddMMYY">ddMMYY</option>
        <option value="ddmmYY">ddmmYY</option>
        <option value="ddMMyy">ddMMyy</option>
      </select>
      {/* date value*/}
      <div className="italic font-normal">{value}</div>
      {/* date selection */}
      {(dateFormat == "ddMMYY" ||
        dateFormat == "ddMMyy" ||
        dateFormat == "ddmmYY" ||
        dateFormat == "ddmmyy") && (
        <select
          name={`${id}-date-selection`}
          id={`${id}-date-selection`}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="outline-none ring-2 ring-blue-500 p-1 rounded-md cursor-pointer text-center"
        >
          {dateArr.length > 0 &&
            dateArr.map((date: string) => {
              return (
                <option value={date} key={`${id}-date-selection-${date}`}>
                  {date}
                </option>
              );
            })}
        </select>
      )}
      {/* year selection */}
      <select
        name={`${id}p-year-selection`}
        id={`${id}p-year-selection`}
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="outline-none ring-2 ring-blue-500 p-1 rounded-md cursor-pointer text-center"
      >
        {yearArr.length > 0 &&
          yearArr.map((year: string) => {
            return (
              <option value={year} key={`${id}-year-selection-${year}`}>
                {year}
              </option>
            );
          })}
      </select>
      {/* year format */}
      <select
        name={`${id}-year-format`}
        id={`${id}-year-format`}
        value={yearFormat}
        onChange={(e) => setYearFormat(e.target.value)}
        className="outline-none ring-2 ring-blue-500 p-1 rounded-md cursor-pointer text-center"
      >
        <option value="YY">YY</option>
        <option value="yy">yy</option>
      </select>
      {(dateFormat == "mmYY" ||
        dateFormat == "MMYY" ||
        dateFormat == "MMyy" ||
        dateFormat == "mmyy" ||
        dateFormat == "ddMMYY" ||
        dateFormat == "ddMMyy" ||
        dateFormat == "ddmmYY" ||
        dateFormat == "ddmmyy") && (
        <>
          {/* month selection */}
          <select
            name={`${id}-month-selection`}
            id={`${id}-month-selection`}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="outline-none ring-2 ring-blue-500 p-1 rounded-md cursor-pointer text-center"
          >
            {monthArr.length > 0 &&
              monthArr.map((month: string) => {
                return (
                  <option value={month} key={`${id}-month-selection-${month}`}>
                    {month}
                  </option>
                );
              })}
          </select>
          {/* month format */}
          <select
            name="month-format"
            id="month-format"
            value={monthFormat}
            onChange={(e) => setMonthFormat(e.target.value)}
            className="outline-none ring-2 ring-blue-500 p-1 rounded-md cursor-pointer text-center"
          >
            <option value="mm">mm</option>
            <option value="MM">MM</option>
          </select>
        </>
      )}
    </div>
  );
};

export default DateComponent;
