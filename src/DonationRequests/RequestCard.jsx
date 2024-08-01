import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const RequestCard = ({reqDetails}) => {

  const navigate = useNavigate()
  
    return (
      <div className="card card-side bg-base-100 shadow-xl w-[330px]  mx-auto">
        <div className="card-body bg-crimson rounded-xl text-white p-3 flex flex-col justify-between">
          <h2 className="text-xl ">Name : {reqDetails.recipientName}</h2>
          <h2 className="text-xl ">
            Location : {reqDetails.upazila}, {reqDetails.district}
          </h2>
          <h2 className="text-xl ">Date: {reqDetails.date}</h2>
          <h2 className="text-xl ">Time: {reqDetails.time}</h2>

          <div className="card-actions flex justify-center">
            <button
              onClick={() => navigate(`/reqDetails/${reqDetails._id}`)}
              className="btn button"
            >
              View
            </button>
          </div>
        </div>
      </div>
    );
};

RequestCard.propTypes = {
    reqDetails: PropTypes.object
};

export default RequestCard;