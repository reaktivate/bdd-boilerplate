import format from 'date-fns/format';
import startOfYesterday from 'date-fns/startOfYesterday';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import subWeeks from 'date-fns/subWeeks';
import subMonths from 'date-fns/subMonths';
import subDays from 'date-fns/subDays';

const dateFormat = 'yyyy-M-d';

export const dateOptions = [
  { label: 'Last 30 days', value: 'last_30' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Current week', value: 'current_week' },
  { label: 'Last week', value: 'last_week' },
  { label: 'Current month', value: 'current_month' },
  { label: 'Last month', value: 'last_month' },
  { label: 'Custom', value: 'custom' },
];

export const getTimeRange = (mod: string): { fromDate: string; toDate: string } => {
  switch (mod) {
    case 'yesterday': {
      const yesterday = format(startOfYesterday(), dateFormat);
      return {
        fromDate: yesterday,
        toDate: yesterday,
      }
    }
    case 'current_week': {
      const startOfCurrentWeek = format(startOfWeek(new Date(), { weekStartsOn: 1 }), dateFormat);
      const endOfCurrentWeek = format(endOfWeek(new Date(), { weekStartsOn: 1 }), dateFormat);
      return {
        fromDate: startOfCurrentWeek,
        toDate: endOfCurrentWeek,
      };
    }
    case 'last_week': {
      const lastWeekDay = subWeeks(new Date(), 1);
      const startOfLastWeek = format(startOfWeek(new Date(lastWeekDay), { weekStartsOn: 1 }), dateFormat);
      const endOfLastWeek = format(endOfWeek(new Date(lastWeekDay), { weekStartsOn: 1 }), dateFormat);
      return {
        fromDate: startOfLastWeek,
        toDate: endOfLastWeek,
      };
    }
    case 'current_month': {
      const startOfCurrentMonth = format(startOfMonth(new Date()), dateFormat);
      const endOfCurrentMonth = format(endOfMonth(new Date()), dateFormat);
      return {
        fromDate: startOfCurrentMonth,
        toDate: endOfCurrentMonth,
      };
    }
    case 'last_month': {
      const prevMonthDay = subMonths(new Date(), 1);
      const startOfLastMonth = format(startOfMonth(new Date(prevMonthDay)), dateFormat);
      const endOfLastMonth = format(endOfMonth(new Date(prevMonthDay)), dateFormat);
      return {
        fromDate: startOfLastMonth,
        toDate: endOfLastMonth,
      };
    }
    case 'last_30': {
      const startDate = format(subDays(new Date(), 30), dateFormat);
      const endDate = format(new Date(), dateFormat);
      return {  
        fromDate: startDate,
        toDate: endDate,
      };
    }
    default: {
      const today = format(new Date(), dateFormat);
      return {
        fromDate: today,
        toDate: today,
      };
    }
  }
};
