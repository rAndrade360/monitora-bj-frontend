import format from 'date-fns/format';

export default function formatTheDateYall(date) {
  if (typeof date === 'number') {
    return format(date, 'dd/MM/yyyy');
  } else {
    const [year, month, day] = date.substr(0, 10).split('-');
    return format(new Date(year, month - 1, day), 'dd/MM/yyyy');
  }
}
