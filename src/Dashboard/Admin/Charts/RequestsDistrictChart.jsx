import React from 'react';
import PropTypes from 'prop-types';
import useGetChartData from '../../../Shared/CustomHooks/useGetChartData';

const RequestsDistrictChart = () => {

  const { districtCount, loading } = useGetChartData();

    
    return (
      <div>
        {console.log("admin log: ", (loading && "loading") || districtCount)}
      </div>
    );
};

RequestsDistrictChart.propTypes = {
    
};

export default RequestsDistrictChart;