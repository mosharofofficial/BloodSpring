import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import upazilas from "./upazilas";
import districts from "./districts";
import { Link } from "react-router-dom";

const Register = () => {
  const [district, setDistrict] = useState(null);
  const [upazilaList, setUpazilaList] = useState([]);
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

  return (
    <div className="hero min-h-screen bg-crimson  ">
      <div className="hero-content max-w-[100%] w-[100%] flex-col ">
        <div className="text-center lg:text-left max-w-[600px] text-white ">
          <h1 className="text-4xl font-bold">
            Join the Life-Saving Community!
          </h1>
          <p className="py-6 text-2xl">
            Welcome to BloodSpring! Your donation brings hope and healing to
            those in need. Sign up to make a difference and become a hero today.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body bg-crimson border-white border-[4px] rounded-2xl ">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl  text-white">Email :</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl  text-white">Name :</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl  text-white">Avatar :</span>
              </label>
              <input
                type="text"
                placeholder="image URL"
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
                defaultValue={"disabled"}
                className="select select-primary focus:outline-none border-none text-crimson text-xl w-full max-w-xs"
              >
                <option value={"disabled"} disabled>
                  Select Blood Group
                </option>
                <option value={"A+"}>A+</option>
                <option value={"A-"}>A-</option>
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
                  Password :
                </span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl  text-white">
                  Confirm Password :
                </span>
              </label>
              <input
                type="password"
                placeholder="confirm password"
                className="text-2xl px-[10px] py-[5px] rounded-[5px] text-crimson focus:outline-none"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn button">Sign Up</button>
            </div>
            <Link to={"/login"}>
              <h2 className="text-lg text-white hover:underline">
                Already have an account? Log in{" "}
              </h2>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {};

export default Register;
