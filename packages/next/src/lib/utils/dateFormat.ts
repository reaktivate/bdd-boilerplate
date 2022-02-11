import format from 'date-fns/format';
import { currentLang, t } from './i18n';

const dateString = 'MMM do, yyyy';
const dateStringSlug = 'yyyy-M-d';
const dateStringWithoutYear = 'MMM Do';

function formatDate(date: string | null) {
  if (!date) return '';
  return format(new Date(date), dateString);
}

function formatDateAsSlug(date: string | null) {
  if (!date) return '';
  return format(new Date(date), dateStringSlug);
}

function formatTime(date: string, tz: string, mode: 'full' | 'short') {
  let dateFormat = 'M/d/yy h:mma';
  if (currentLang() === 'es') {
    dateFormat = 'd/M/yy h:mma';
  }

  if (mode === 'full') {
    dateFormat = 'EEEE, MMM do yyyy, h:mma';
  }
  const stringsToTranslate = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let res = `${format(new Date(date), dateFormat)} ${tz}`;
  stringsToTranslate.forEach((str) => {
    res = res.replace(str, t(str));
  });
  return res;
}

export { formatDate, formatDateAsSlug, formatTime, dateString, dateStringWithoutYear };
