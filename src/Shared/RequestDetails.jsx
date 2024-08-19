import { useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useGetUser from "./CustomHooks/useGetUser";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAxiosSecure from "./CustomHooks/useAxiosSecure";
const RequestDetails = () => {
  const myAxiosSecure = useAxiosSecure();

  const MySwal = withReactContent(Swal);

  const {
    data: user,
    isPending: userPending,
    refetch: userRefetch,
  } = useGetUser();
  const { id } = useParams();

  const {
    data: pastData = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: [id],
    queryFn: async () =>
      await myAxiosSecure.get(`/requests/${id}`, {
        params: {
          email: user.email,
        },
      }),
  });

  const handleDonate = (e) => {
    e.preventDefault();

    MySwal.fire({
      title: "Are you sure?",
      html: (
        <div className="bg-crimson border-y-[4px] py-5 flex flex-col  gap-2 justify-start px-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl  text-white">
                Donor Email :
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
                Donor Name :
              </span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="name"
              defaultValue={user.name}
              disabled
              className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none disabled:text-crimson disabled:bg-white"
              required
            />
          </div>
        </div>
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        myAxiosSecure
          .patch(`/toInProgress?email=${user.email}`, {
            status: "in progress",
            id,
            donorEmail: user.email,
            donorName: user.name,
          })
          .then((res) => {
            if (res.data.modifiedCount === 1) {
              Swal.fire({
                title: "Confirmed!",
                text: "Your donation has been confirmed.",
                icon: "success",
              });
            }
          })
          .catch((e) => console.log(e.message));
      }
    });
  };

  if (!isPending && !userPending) {
    return (
      <div className="bg-crimson min-h-screen ">
        {/* {console.log(user)} */}

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
                      defaultValue={pastData.data.email}
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
                      defaultValue={pastData.data.name}
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
                      defaultValue={pastData.data.time}
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
                <div className="flex items-center justify-center mt-5">
                  <button onClick={handleDonate} className="button btn px-10">
                    Donate
                  </button>
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
