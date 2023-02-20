import dayjs from "dayjs";
import en from "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

dayjs.locale(en);

export const dateFormats = {
  date: "MM-DD-YYYY",
  dateTime: "MM-DD-YYYY HH:mm",
  time: "HH:mm",
};

export const formatDate = (date: Date, format: string) => {
  return dayjs(date).format(format);
};

export const dateToRelative = (date: Date, compareDate = new Date()) => {
  return dayjs(compareDate).to(date);
};
