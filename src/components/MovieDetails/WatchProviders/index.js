import React from 'react';
import PropTypes from 'prop-types';
// provider's logos
import justwatchLogo from '../../../images/logo-providers/justwatch_logo.svg';
import tmdbLogo from '../../../images/logo-providers/tmdb_logo.svg';
// Components
import CountryProvidersSelect from './CountryProvidersSelect';
import Providers from './Providers';

const WatchProviders = ({ watchProviders, country, setCountry, pathname }) => {

  return (
    <div className="watch-providers">
      <div className="watch-providers__header">
        <div className="watch-providers__header--title">
          <h2>WATCH IT</h2>

          <div className="ott-titles">
            <h6>Provided by</h6>
            <div className="providers">
              <img alt="justwatch" src={justwatchLogo} />
              <img alt="tmdb" src={tmdbLogo} />
            </div>
          </div>

        </div>

        <div className="watch-providers__header--subheader">
          <CountryProvidersSelect 
            country={country} 
            setCountry={setCountry} 
            watchProviders={watchProviders} 
          />
        </div>
      </div>
    
      {Object.keys(watchProviders).length === 0 
        ? null
        : (
          <Providers 
            watchProviders={watchProviders} 
            country={country} 
            pathname={pathname}
          />
        )
      }
    </div>
  )
}

WatchProviders.propTypes = {
  watchProviders: PropTypes.object.isRequired,
  country: PropTypes.string,
  setCountry: PropTypes.func,
  pathname: PropTypes.string,
}

export default WatchProviders
