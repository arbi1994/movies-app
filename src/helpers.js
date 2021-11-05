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
  return str.split('').map(char => {
    if(char === '%'){
      const encodedStr = encodeURI(char)
      return decodeURI(encodedStr).split('%').join('')
    }else if(char === ' '){
      return char.split(' ').join('-')
    }else if(char === '/'){
      return char.split('/').join('-')
    }else{
      return char
    }
  }).join('').toLocaleLowerCase()
}

export const persistedState = (key) => {
  const state = JSON.parse(localStorage.getItem(key)); 
  return state
}