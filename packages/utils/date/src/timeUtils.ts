import moment from 'moment'

export type TimeUtilsFun = (value: number | string, format?: string) => string

const timeUtils: TimeUtilsFun = (value, format = 'YYYY-MM-DD HH:mm') => {
  if (value === undefined) return ''
  if (typeof value !== 'number') {
    value = Number.parseInt(value)
  }
  const time = moment(value).format(format)
  const currentYear = new Date().getFullYear()
  const timeString = time.toString()
  return currentYear.toString() === timeString.slice(0, 4)
    ? timeString.slice(5, time.length)
    : time
}

export default timeUtils
