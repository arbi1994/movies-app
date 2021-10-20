import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState()
  
  useEffect(() => {
    const getCurrYear = () => {
      setCurrentYear(new Date().getFullYear());
    }

    document.addEventListener('DOMContentLoaded', getCurrYear)

    return () => {
      document.removeEventListener('DOMContentLoaded', getCurrYear)
    }
  }, [])
  
  return (
    <footer>
      <span>
        <p>
          © Copyright&nbsp;{'\u00B7'}&nbsp;{currentYear}&nbsp;
          |&nbsp;&nbsp;
          <a 
            href="mailto:arbi.1994@hotmail.com" 
            target="_blank" 
            rel="noreferrer noopener"
          >arbi.1994@hotmail.com</a>
        </p>
      </span>
    </footer>
  )
}

export default Footer
