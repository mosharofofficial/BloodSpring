import { useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { myAxiosSecure } from "../Axios.config";
import { authContext } from "../Authentication/AuthProvider";
const RequestDetails = () => {
  const { user } = useContext(authContext);
  const { id } = useParams();

  const {
    data: pastData = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: [id],
    queryFn: async () =>
      await myAxiosSecure.get(`/requests/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        params: {
          email: user.email,
        },
      }),
  });

  if (!isPending) {
    return (
      <div className="bg-crimson min-h-screen ">
        {/* {console.log(pastData.data)} */}

        <h1 className="text-3xl text-white border-b-[4px] w-full text-center p-5 ">
          Donation Request Details
        </h1>
        <div className="hero min-h-screen bg-crimson  ">
          <div className="hero-content max-w-[100%] w-[100%] p-0 m-0">
            {/* card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 */}
            <form className="card-body bg-crimson flex flex-col justify-center items-center p-5">
              <div className="border-[4px] p-5 rounded-xl mb-4 ">
                <h1 className="text-2xl text-white pb-4">
                  Requester&apos;s info
                </h1>
                <div className="border-y-[4px] py-5 flex flex-col md:flex-row gap-2 justify-start">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        Email :
                      </span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="email"
                      defaultValue={user.email}
                      disabled
                      className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none disabled:text-crimson disabled:bg-white"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        Name :
                      </span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="name"
                      defaultValue={user.displayName}
                      disabled
                      className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none disabled:text-crimson disabled:bg-white"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="border-[4px] p-5 rounded-xl">
                <h1 className="text-2xl  text-white pb-4">
                  Recipient&apos;s info
                </h1>

                <div className="border-y-[4px] py-5 grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        Name :
                      </span>
                    </label>
                    <input
                      name="recipientName"
                      disabled
                      type="text"
                      placeholder="Recipient's name"
                      defaultValue={pastData.data.recipientName}
                      className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none  disabled:text-crimson disabled:bg-white"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        Blood Group :
                      </span>
                    </label>
                    <input
                      name="recipientName"
                      disabled
                      type="text"
                      placeholder="Recipient's name"
                      defaultValue={pastData.data.bloodGroup}
                      className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none  disabled:text-crimson disabled:bg-white"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        District :
                      </span>
                    </label>
                    <input
                      name="recipientName"
                      disabled
                      type="text"
                      placeholder="Recipient's name"
                      defaultValue={pastData.data.district}
                      className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none  disabled:text-crimson disabled:bg-white"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        Upazila :
                      </span>
                    </label>
                    <input
                      name="recipientName"
                      disabled
                      type="text"
                      placeholder="Recipient's name"
                      defaultValue={pastData.data.upazila}
                      className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none  disabled:text-crimson disabled:bg-white"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        Hospital Name :
                      </span>
                    </label>
                    <input
                      name="recipientName"
                      disabled
                      type="text"
                      placeholder="Recipient's name"
                      defaultValue={pastData.data.hospital}
                      className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none  disabled:text-crimson disabled:bg-white"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        Full Address :
                      </span>
                    </label>
                    <input
                      name="recipientName"
                      disabled
                      type="text"
                      placeholder="Recipient's name"
                      defaultValue={pastData.data.address}
                      className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none  disabled:text-crimson disabled:bg-white"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        Donation Date :
                      </span>
                    </label>
                    <input
                      name="recipientName"
                      disabled
                      type="text"
                      placeholder="Recipient's name"
                      defaultValue={pastData.data.date}
                      className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none  disabled:text-crimson disabled:bg-white"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        Donation Time :
                      </span>
                    </label>
                    <input
                      name="recipientName"
                      disabled
                      type="text"
                      placeholder="Recipient's name"
                      defaultValue={((pastData.data.time))}
                      className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none  disabled:text-crimson disabled:bg-white"
                      required
                    />
                  </div>

                  <div className="form-control col-span-1 md:col-span-2">
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        Message :
                      </span>
                    </label>
                    <textarea
                      defaultValue={pastData.data.message}
                      name="message"
                      disabled
                      placeholder="Explain in details why you need blood ."
                      className="text-xl w-full h-[100px]  px-[10px] py-[5px] rounded-[5px] text-crimson resize-none focus:outline-none disabled:text-crimson disabled:bg-white cursor-default"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

RequestDetails.propTypes = {};

export default RequestDetails;