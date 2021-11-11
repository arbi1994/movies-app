import React, { useState, useEffect } from 'react';
// Material UI components
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// Custom hooks
import useTmdbConfig from '../../../hooks/useTmdbConfig';

const CountryProvidersSelect = ({ country, setCountry, watchProviders }) => {
  const [data] = useTmdbConfig()
  const [countryName, setCountryName] = useState(() => "Select country")

  const handleChange = (e) => { 
    setCountry(e.target.value);
  };
  
  const renderedCountries = Object?.keys(watchProviders)?.map(iso => {
    for(let {english_name: countryName, iso_3166_1: countryCode} of data){
      if(countryCode === iso) 
        return <MenuItem key={countryCode} value={countryCode}>{countryName}</MenuItem>
    }
  })

  // save the selected country's iso code to local storage
  useEffect(() => {
    const saveToLocalStorage = () => {
      localStorage.setItem('locale', country)
    }

    if(country) saveToLocalStorage()
  }, [country])

  // save the selected country's name to local storage
  useEffect(() => {
    const localLocale = localStorage.getItem('locale')

    // check if there is any data saved already in the local storage
    if(localLocale?.length === 1) return

    for(let {english_name: countryName, iso_3166_1: countryCode} of data){
      if(countryCode === localLocale) localStorage.setItem('locale-name', countryName)
    }
  }, [country])

  // set the country's name based on condition provided
  useEffect(() => {
    // get providers' key values
    const providers = Object?.keys(watchProviders) 
    // get result based on condition provided
    const result = providers?.some(key => key === localStorage.getItem('locale'))

    if(!result || localStorage.getItem('locale') === null){
      setCountryName('Select country')
    }else{
      setCountryName(localStorage.getItem('locale-name'))
    }
  }, [])

  return (
    <FormControl sx={{ width: 250, fontSize: '1em' }}>
      <Select
        disableunderline="true"
        value={country ?? ''}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{ background: 'white' }}
        className="select"
      >
        <MenuItem value="">
          <em>{countryName}</em>
        </MenuItem>
        {renderedCountries}
      </Select>
    </FormControl>
  );
};

export default CountryProvidersSelect;