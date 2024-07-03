import PropTypes from "prop-types";
import useGetRequests from "../Shared/CustomHooks/useGetRequests";
import { useEffect } from "react";

const MyDonationRequests = () => {

    const {data:requestsData, isPending, refetch} = useGetRequests();


    useEffect(()=>{
        console.log(isPending)
        console.log(requestsData)
    },[isPending])
    
    
    if (!isPending) {
        return (
          <div className="bg-crimson min-h-screen ">
            {/* {console.log(date)}
       {console.log(time)} */}

            <h1 className="text-3xl text-white border-b-[4px] w-full text-center p-5 ">
              My Donation Requests
            </h1>
            <div className="p-2 bg-crimson grid grid-cols-1  md:grid-cols-2 gap-2 items-start justify-center">
              {/* card component : */}

              <div className="card card-side bg-base-100 shadow-xl max-w-[500px]  mx-auto border-[4px] border-white m-3">
                <figure className=" bg-crimson max-w-[35%] ">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                    alt="Movie"
                    className="rounded-l-xl object-cover w-full h-full "
                  />
                </figure>
                <div className="card-body bg-crimson rounded-r-xl text-white p-3 flex flex-col justify-between ">
                  <h2 className="text-xl ">Name : Mosharof Hossain</h2>
                  <h2 className="text-xl ">Location : Upazila, District</h2>
                  <h2 className="text-xl ">
                    Date: {new Date().toDateString()}
                  </h2>
                  <h2 className="text-xl ">
                    Time: {new Date().toTimeString().split(" ")[0]}
                  </h2>
                  <div className="card-actions ">
                    <button className="btn button">View</button>
                  </div>
                </div>
              </div>
              {/* card end */}

              {/* card component : */}

              <div className="card card-side bg-base-100 shadow-xl max-w-[500px]  mx-auto border-[4px] border-white m-3">
                <figure className=" bg-crimson max-w-[35%] ">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                    alt="Movie"
                    className="rounded-l-xl object-cover w-full h-full "
                  />
                </figure>
                <div className="card-body bg-crimson rounded-r-xl text-white p-3 flex flex-col justify-between ">
                  <h2 className="text-xl ">Name : Mosharof Hossain</h2>
                  <h2 className="text-xl ">Location : Upazila, District</h2>
                  <h2 className="text-xl ">
                    Date: {new Date().toDateString()}
                  </h2>
                  <h2 className="text-xl ">
                    Time: {new Date().toTimeString().split(" ")[0]}
                  </h2>
                  <div className="card-actions ">
                    <button className="btn button">View</button>
                  </div>
                </div>
              </div>
              {/* card end */}
            </div>
          </div>
        );
    }
    
  
};

MyDonationRequests.propTypes = {};

export default MyDonationRequests;
