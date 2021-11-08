import React from 'react';
import { Link } from 'react-router-dom';
import pageNotFoundImg from '../images/error/404.svg'

const NotFound = () => {
  return (
    <section className="page-not-found">
      <div className="page-not-found__wrapper">
        <h2>Page</h2>
        <span>
          <h2>N</h2>
          <img 
            alt="404 error"
            src={pageNotFoundImg} 
          />
          <h2>t</h2>
        </span>
        <h2>Found</h2>
      </div>
      <Link to="/" className="home-redirect">Go back to the Home page</Link>
    </section>
  )
}

export default NotFound
