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

/**
 * Split data fetched
 * @param {Array} data 
 * @returns 
 */
export const splitData = (data) => {
  if(data === undefined) return
  
  if(data.length > 1) return data.join(', ') 

  return data
}

/**
 * Validate pathname (decode %25 and %20)
 * @param {String} str 
 * @returns 
 */
export const decodePathName = (str) => {
  return str.split('').map(l => {
    if(l === '%'){
      const encodedStr = encodeURI(l)
      return decodeURI(encodedStr).split('%').join('')
    }else if(l === ' '){
      return l.split(' ').join('-')
    }else{
      return l
    }
  }).join('').toLocaleLowerCase()
}