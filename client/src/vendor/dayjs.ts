import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import localeRu from "dayjs/locale/ru";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale(localeRu);

const MOSCOW_TZ = "Europe/Moscow";

export function formatPostDate(dateString: string) {
  if (!dateString) return "";

  const date = dayjs.utc(dateString).tz(MOSCOW_TZ);
  const now = dayjs().tz(MOSCOW_TZ);

  if (now.diff(date, "hour") < 24) {
    return date.fromNow();
  }
  if (now.diff(date, "day") === 1) {
    return `вчера в ${date.format("HH:mm")}`;
  }

  return date.format("DD.MM.YY [в] HH:mm");
}

