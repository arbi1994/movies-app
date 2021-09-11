/**
 * Convert a full date e.g. 1999-01-01 into 1999
 * @param {String} date 
 * @returns String
 */
export const getYear = (date) => {
  if(!date) return //check if date exists 

  const splitDate = date.split('-')
  const year = splitDate.slice(0, 1).join()

  return year
}