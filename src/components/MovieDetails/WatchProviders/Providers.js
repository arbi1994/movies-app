import React, { useState, useEffect } from 'react';
// api config
import { BASE_IMAGE_URL, LOGO_SIZES } from '../../../api_config';

const Providers = ({ watchProviders, country, pathname }) => {
  const [providers, setProviders] = useState([])

  useEffect(() => {
    Object?.keys(watchProviders)?.map(iso => {
      if(iso === sessionStorage.getItem('locale')) {
        setProviders(watchProviders[iso])
        // console.log('providers', watchProviders[iso])
      }
    })
  }, [country, pathname, watchProviders])

  // get all the properties out of providers obj
  const { buy, link, rent, flatrate } = providers 

  const renderedRentProviders = rent?.map(rent => {
    if(!providers.hasOwnProperty('rent')) return

    const { provider_id, provider_name, logo_path } = rent

    return (
      <li key={provider_id}>
        <a href={link} alt={provider_name} target="_blank" rel="noreferrer"><img alt={provider_name} src={`${BASE_IMAGE_URL}${LOGO_SIZES[LOGO_SIZES.length - 1]}${logo_path}`} /></a>
      </li>
    ) 
  })

  const renderedFlatrateProviders = flatrate?.map(flatrate => {
    if(!providers.hasOwnProperty('flatrate')) return

    const { provider_id, provider_name, logo_path } = flatrate

    return (
      <li key={provider_id}>
        <a href={link} alt={provider_name} target="_blank" rel="noreferrer"><img alt={provider_name} src={`${BASE_IMAGE_URL}${LOGO_SIZES[LOGO_SIZES.length - 1]}${logo_path}`} /></a>
      </li>
    ) 
  })

  const renderedBuyProviders = buy?.map(buy => {
    if(!providers.hasOwnProperty('buy')) return

    const { provider_id, provider_name, logo_path } = buy

    return (
      <li key={provider_id}>
        <a 
          href={link} 
          alt={provider_name} 
          target="_blank"
          rel="noreferrer"
        >
          <img alt={provider_name} src={`${BASE_IMAGE_URL}${LOGO_SIZES[LOGO_SIZES.length - 1]}${logo_path}`} />
        </a>
      </li>
    )
  })

  return (
    <div className="watch-providers__providers">
      {
        providers.hasOwnProperty('rent')
        ? (
          <>
            <h5>Rent</h5>
            <ul className="watch-providers__providers--rent">
              {renderedRentProviders}
            </ul>
          </> 
        ) : null
      }

      {
        providers.hasOwnProperty('flatrate')
        ? (
          <>
            <h5>Streaming</h5>
            <ul className="watch-providers__providers--flatrate">
              {renderedFlatrateProviders}
            </ul>
          </> 
        ) : null
      }

      {
        providers.hasOwnProperty('buy')
        ? (
          <>
            <h5>Buy</h5>
            <ul className="watch-providers__providers--buy">
              {renderedBuyProviders}
            </ul>
          </> 
        ) : null
      }

    </div>
  )
}

export default Providers
