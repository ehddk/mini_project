const isLeapYear = (year: number): boolean => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year: number): number => {
  return isLeapYear(year) ? 29 : 28;
};

const calendar = document.querySelector(".calendar") as HTMLElement;

const month_names: string[] = [
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

const month_picker = document.querySelector("#month-picker") as HTMLElement;

month_picker.onclick = () => {
  month_list.classList.remove("hideonce");
  month_list.classList.remove("hide");
  month_list.classList.add("show");
};

const generateCalendar = (month: number, year: number): void => {
  const calendar_days = document.querySelector(".calendar-days") as HTMLElement;
  calendar_days.innerHTML = "";
  const calendar_header_year = document.querySelector("#year") as HTMLElement;

  const days_of_month: number[] = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  const currentDate = new Date();

  month_picker.innerHTML = month_names[month];
  calendar_header_year.innerHTML = String(year);

  const first_day = new Date(year, month);

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    const day = document.createElement("div");

    if (i >= first_day.getDay()) {
      day.innerHTML = String(i - first_day.getDay() + 1);

      if (
        i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add("current-date");
      }
    }
    calendar_days.appendChild(day);
  }
};

const month_list = calendar.querySelector(".month-list") as HTMLElement;

month_names.forEach((e, index) => {
  const month = document.createElement("div");
  month.innerHTML = `<div>${e}</div>`;

  month_list.append(month);
  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace("show", "hide");
  };
});

(function () {
  month_list.classList.add("hideonce");
})();

document.querySelector("#pre-year")?.addEventListener("click", () => {
  currentYear.value--;
  generateCalendar(currentMonth.value, currentYear.value);
});

document.querySelector("#next-year")?.addEventListener("click", () => {
  currentYear.value++;
  generateCalendar(currentMonth.value, currentYear.value);
});

const currentDate = new Date();
const currentMonth = { value: currentDate.getMonth() };
const currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);
