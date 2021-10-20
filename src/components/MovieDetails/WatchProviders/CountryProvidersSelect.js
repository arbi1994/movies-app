import React, { useEffect } from 'react';
// Material UI components
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// Custom hooks
import useTmdbConfig from '../../../hooks/useTmdbConfig';

const CountryProvidersSelect = ({ country, setCountry, watchProviders }) => {
  const [data] = useTmdbConfig()

  const handleChange = (e) => { 
    setCountry(e.target.value);
  };
  
  const renderedCountries = Object?.keys(watchProviders)?.map(iso => {
    for(let {english_name: countryName, iso_3166_1: countryCode} of data){
      if(countryCode === iso) return <MenuItem key={countryCode} value={countryCode}>{countryName}</MenuItem>
    }
  })

  useEffect(() => {
    const saveToSessionStorage = () => {
      sessionStorage.setItem('locale', country)
    }

    saveToSessionStorage()
  }, [country])

  return (
    <FormControl sx={{ minWidth: 250, fontSize: '1em' }}>
      <Select
        disableunderline="true"
        value={country}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{ background: 'white' }}
        className="select"
      >
        <MenuItem value="">
          <em>Country</em>
        </MenuItem>
        {renderedCountries}
      </Select>
    </FormControl>
  );
};

export default CountryProvidersSelect;