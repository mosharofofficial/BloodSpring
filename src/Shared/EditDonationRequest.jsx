import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useGetUser from "./CustomHooks/useGetUser";
import districts from "../Authentication/Register/districts";
import upazilas from "../Authentication/Register/upazilas";
import { authContext } from "../Authentication/AuthProvider";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_red.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "./CustomHooks/useAxiosSecure";

const EditDonationRequest = () => {
  const myAxiosSecure = useAxiosSecure();
  const { user } = useContext(authContext);
  const { id } = useParams();

  const {
    data: pastData = {},
    isPending: pastDataIsPending,
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

  const { data } = useGetUser();
  const [district, setDistrict] = useState("");
  const [upazilaList, setUpazilaList] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  const [districtTriggered, setDistrictTriggered] = useState(false);
  useEffect(() => {
    // console.log(pastData.data);
    if (!pastDataIsPending && !districtTriggered) {
      setDistrict(pastData.data.district);
      setTime(pastData.data.time);
      setDate(pastData.data.date);
      //   console.log("district set")
      //   console.log("district :" , district)
    }
    if (district) {
      //   console.log(district);
      const selectedDistrict = districts.find(
        (districtObject) => districtObject["name"] === district
      );
      // console.log("district : ", district);
      // console.log("selectedDistrict : ", selectedDistrict);
      const selectedDistrictId = selectedDistrict?.id;
      const upazilasList = upazilas.filter((upazila) => {
        return upazila.district_id === selectedDistrictId;
      });
      setUpazilaList(upazilasList);
      setSelectedUpazila(pastData.data.upazila);
    }
  }, [district, pastDataIsPending]);

  const getFormObject = (formElement) => {
    const form = formElement;

    // console.log(form)

    return {
      email: form.email.value,
      name: form.name.value,
      recipientName: form.recipientName.value,
      bloodGroup: form.bloodGroup.value,
      district: form.district.value,
      upazila: form.upazila.value,
      hospital: form.hospital.value,
      address: form.address.value,
      date: date,
      time: time,
      message: form.message.value,
      status: "pending",
      timestamp: Date.now(),
    };
  };

  const dateChangeHandler = (date) => {
    setDate(
      new Date(date).toDateString()
      // .toISOString()
      // .split("T")[0]
    );
  };

  const timeChangeHandler = (date) => {
    setTime(
      new Date(date).toLocaleTimeString()
      // .toISOString().split("T")[1]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data?.isActive) {
      Swal.fire("User has been blocked");
      return;
    } else {
      const form = getFormObject(e.target);

      //   console.log("form: ",form)
      myAxiosSecure
        .patch(`/update/${id}?email=${user.email}`, {
          form,
        })
        .then((res) => {
          if (res.data.acknowledged) {
            Swal.fire("Request Updated Successfully .");
            // console.log(res.data);
          }
        })
        .then(() => {
          location.reload();
        })
        .catch((e) => console.log(e.message));
    }
  };

  if (!pastDataIsPending) {
    return (
      <div className="bg-crimson min-h-screen ">
        {/* {console.log(date)}
       {console.log(time)} */}

        <h1 className="text-3xl text-white border-b-[4px] w-full text-center p-5 ">
          Edit Donation Request
        </h1>
        <div className="hero min-h-screen bg-crimson  ">
          <div className="hero-content max-w-[100%] w-[100%] p-0 m-0">
            {/* card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 */}
            <form
              onSubmit={handleSubmit}
              className="card-body bg-crimson flex flex-col justify-center items-center p-5"
            >
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
                      type="text"
                      placeholder="Recipient's name"
                      defaultValue={pastData.data.recipientName}
                      className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        Blood Group :
                      </span>
                    </label>
                    <select
                      name="bloodGroup"
                      defaultValue={pastData.data.bloodGroup}
                      className="select select-primary focus:outline-none border-none text-crimson text-xl w-full max-w-xs"
                    >
                      <option value={"disabled"} disabled>
                        Select Blood Group
                      </option>
                      <option value={"A+"}>a+</option>
                      <option value={"A-"}>a-</option>
                      <option value={"b+"}>b+</option>
                      <option value={"b-"}>b-</option>
                      <option value={"ab+"}>ab+</option>
                      <option value={"ab-"}>ab-</option>
                      <option value={"o+"}>o+</option>
                      <option value={"o-"}>o-</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        District :
                      </span>
                    </label>
                    <select
                      name="district"
                      onChange={(e) => {
                        setDistrictTriggered(true);
                        setDistrict(e.target.value);
                      }}
                      // defaultValue={"disabled"}
                      value={district}
                      className="select select-primary focus:outline-none border-none text-crimson text-2xl w-full max-w-xs disabled:text-crimson disabled:bg-white"
                    >
                      <option value={"disabled"} disabled>
                        Select District
                      </option>
                      {districts.map((district) => (
                        <option key={district["id"]} value={district["name"]}>
                          {district["name"]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        Upazila :
                      </span>
                    </label>
                    <select
                      disabled={upazilaList.length ? false : true}
                      name="upazila"
                      className="select select-primary focus:outline-none border-none text-crimson text-2xl w-full max-w-xs disabled:text-crimson disabled:bg-white"
                      value={selectedUpazila}
                      onChange={(e) => setSelectedUpazila(e.target.value)}
                    >
                      {upazilaList.map((upazila) => (
                        <option key={upazila["id"]} value={upazila["name"]}>
                          {upazila["name"]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        Hospital Name :
                      </span>
                    </label>
                    <input
                      name="hospital"
                      type="text"
                      placeholder="Hospital name"
                      className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none"
                      defaultValue={pastData.data.hospital}
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
                      name="address"
                      type="text"
                      placeholder="Full Address"
                      defaultValue={pastData.data.address}
                      className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        Donation Date :
                      </span>
                    </label>

                    <Flatpickr
                      className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none"
                      value={new Date(pastData.data.date).toISOString()}
                      options={{ dateFormat: "d-m-Y" }}
                      placeholder="Select Date"
                      onChange={([date]) => {
                        dateChangeHandler(date);
                      }}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xl  text-white">
                        Donation Time :
                      </span>
                    </label>

                    <Flatpickr
                      className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none"
                      value={pastData.data.time}
                      options={{
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: "G:i K",
                      }}
                      placeholder="Select Time"
                      onChange={([date]) => {
                        timeChangeHandler(date);
                      }}
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
                      placeholder="Explain in details why you need blood ."
                      className="text-xl w-full h-[100px]  px-[10px] py-[5px] rounded-[5px] text-crimson resize-none focus:outline-none"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn button">
                    Update
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

EditDonationRequest.propTypes = {
  //   requestData: PropTypes.object,
};

export default EditDonationRequest;
