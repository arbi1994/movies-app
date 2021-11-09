import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';
// Helper functions
import { getYear, splitData } from '../../helpers';

const SubTitle = ({ productionCountries, release_date, runtime, loading }) => {
  return (
    <>
      {loading 
        ? <Skeleton 
            className="subtitle-loader"
            sx={{ bgcolor: 'grey.900' }} 
            style={{ height: '25px' }}
          />
        : <div className="details__header--subtitle">
            <h6>{splitData(productionCountries)}</h6>
            <h6>{getYear(release_date)}</h6>
            <h6>{runtime <= 0 ? 'N/A' : `${runtime}min`}</h6>
          </div>
      }
    </>
  )
}

SubTitle.propTypes = {
  productionCountries: PropTypes.array,
  release_date: PropTypes.string,
  runtime: PropTypes.number,
  loading: PropTypes.bool,
}

export default SubTitle
