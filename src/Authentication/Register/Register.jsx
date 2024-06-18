import { useEffect, useState } from "react";
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

  const getFormObject = (event) => {
    const form = event.target;

    const email = form.email.value;
    const name = form.name.value;
    const avatar = form.avatar.value;
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    return {
      email,
      name,
      avatar,
      bloodGroup,
      district,
      upazila,
      password,
      confirmPassword,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = getFormObject(e);
    console.log(form);
  };

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
          <form
            onSubmit={handleSubmit}
            className="card-body bg-crimson border-white border-[4px] rounded-2xl "
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl  text-white">Email :</span>
              </label>
              <input
                name="email"
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
                name="name"
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
                name="avatar"
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
                  Password :
                </span>
              </label>
              <input
                name="password"
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
                name="confirmPassword"
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
