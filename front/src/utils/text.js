// string capitalise (value: string)
export const capitalize = (value = '') =>
  typeof value === 'string' && value.length > 0
    ? [value[0].toUpperCase(), value.slice(1)].join('')
    : value;
// eslint-disable-next-line
export const trimString_ = (value = '') =>
  typeof value === 'string' ? value.trim() : value;
