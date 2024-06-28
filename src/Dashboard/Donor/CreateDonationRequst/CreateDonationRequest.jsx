import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { myAxios } from "../../../Axios.config";
import districts from "../../../Authentication/Register/districts";
import upazilas from "../../../Authentication/Register/upazilas";
import { authContext } from "../../../Authentication/AuthProvider";

const CreateDonationRequest = () => {
  const { user, register, update } = useContext(authContext);
  const [district, setDistrict] = useState(null);
  const [upazilaList, setUpazilaList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const selectedDistrict = districts.find(
      (districtObject) => districtObject["name"] === district
    );

    const selectedDistrictId = selectedDistrict?.id;

    const upazilasList = upazilas.filter(
      (upazila) => upazila.district_id === selectedDistrictId
    );

    setUpazilaList(upazilasList);
  }, [district]);

  const getFormObject = (event) => {
    const form = event.target;

    return {
      email: form.email.value,
      name: form.name.value,
      avatar: form.avatar.value,
      bloodGroup: form.bloodGroup.value,
      district: form.district.value,
      upazila: form.upazila.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
      role: "donor",
      isActive: true,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = getFormObject(e);

    if (form.confirmPassword === form.password) {
      register(form.email, form.password)
        .then(() => {
          update(form.name, form.avatar)
            .then(console.log("displayName and photoURL is set"))

            .catch((e) => console.log(e.message));
        })
        .then(() => {
          myAxios.post("/addUser", form).then((res) => {
            if (res.data.insertedId) {
              navigate("/");
            }
          });
        })
        .catch((e) => console.log(e.message));
    } else {
      alert("passwords dont match !");
    }
  };
  return (
    <div className="bg-crimson min-h-screen">
      <h1 className="text-3xl text-white border-b-[4px] w-full text-center p-5 mb-10">
        Create Donation Request
      </h1>
      <div className="hero min-h-screen bg-crimson  ">
        <div className="hero-content max-w-[100%] w-[100%] flex-col ">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form
              onSubmit={handleSubmit}
              className="card-body bg-crimson border-white border-[4px] rounded-2xl "
            >
              <h1 className="text-2xl text-white">Requester&apos;s info</h1>
              <div className="border-y-[4px] py-5">
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
              <h1 className="text-2xl mt-10 text-white">
                Recipient&apos;s info
              </h1>

              <div className="border-y-[4px] py-5">
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
                    defaultValue={"disabled"}
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
                      setDistrict(e.target.value);
                    }}
                    defaultValue={"disabled"}
                    className="select select-primary focus:outline-none border-none text-crimson text-xl w-full max-w-xs"
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
                    name="upazila"
                    disabled={upazilaList.length ? false : true}
                    defaultValue={"disabled"}
                    className="select select-primary focus:outline-none border-none text-crimson text-xl w-full max-w-xs"
                  >
                    <option value={"disabled"} disabled>
                      Select Upazila
                    </option>
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
                  <input
                    name="date"
                    placeholder="Donation Date"
                    type="text"
                    className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none"
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
                    name="time"
                    placeholder="Donation Time"
                    type="text"
                    className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl  text-white">
                      Message :
                    </span>
                  </label>
                  <textarea
                    name="time"
                    placeholder="Explain in details why you need blood ."
                   
                    className="text-xl w-full h-[250px]  px-[10px] py-[5px] rounded-[5px] text-crimson resize-none focus:outline-none"
                    required
                  ></textarea>
                </div>

                <div className="form-control mt-6">
                  <button className="btn button">Request</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateDonationRequest.propTypes = {};

export default CreateDonationRequest;
