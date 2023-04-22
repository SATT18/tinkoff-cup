import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import isYesterday from 'dayjs/plugin/isYesterday'

dayjs.extend(isToday)
dayjs.extend(isTomorrow)
dayjs.extend(isYesterday)

export const formatDateToTimeDate = (date: string | undefined | null): string =>
  date ? dayjs(date).format('DD.MM.YYYY HH:mm') : '-'

export const formatDate = (date: string | undefined | null): string =>
  date ? dayjs(date).format('DD.MM.YYYY') : '-'

export const formatTime = (date: string | undefined | null): string =>
  date ? dayjs(date).format('HH:mm') : '-'

export const formatDateToDayWord = (date: string | undefined | null) => {
  if (!date) {
    return '-'
  }
  if (dayjs(date).isToday()) {
    return `Сегодня, ${formatTime(date)}`
  } else if (dayjs(date).isYesterday()) {
    return `Вчера, ${formatTime(date)}`
  } else if (dayjs(date).isTomorrow()) {
    return `Завтра, ${formatTime(date)}`
  } else {
    return dayjs(date).format('dd.MM, HH:mm')
  }
}
