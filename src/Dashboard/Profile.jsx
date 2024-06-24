import PropTypes from "prop-types";
import useGetUser from "../Shared/CustomHooks/useGetUser";
import { useEffect, useState } from "react";
import districts from "../Authentication/Register/districts";
import upazilas from "../Authentication/Register/upazilas";
import { isSupported } from "firebase/analytics";

const Profile = () => {
  const { data: currentUser, isPending } = useGetUser();
  const [district, setDistrict] = useState(null);
  const [upazilaList, setUpazilaList] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState("");

  useEffect(() => {
    // console.log(isPending);
    setDistrict(currentUser?.district);
    if (district) {
      setDistrict(currentUser.district);
      // console.log(district);
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
      setSelectedUpazila(currentUser.upazila);
    }
  }, [district, isPending]);

  // console.log("currentUser : ", currentUser);
  // console.log(upazilaList);

  if (!isPending) {
    return (
      <div>
        <h1 className="text-4xl font-bold py-10 text-center bg-crimson  text-white ">
          Profile
        </h1>
        <form className="flex flex-col gap-3 mt-8 bg-crimson p-4">
          <img
            src={currentUser.avatar}
            className="max-w-[400px] border-[4px] border-white"
          />

          <label className="text-3xl  text-white bg-crimson ">
            <span>Email :</span>
            <input
              type="email"
              disabled
              className="bg-white ml-3 rounded-xl text-crimson p-3"
              defaultValue={currentUser.email}
            />
          </label>

          <label className="text-3xl  text-white bg-crimson ">
            <span>Name :</span>
            <input
              type="text"
              className="ml-3 rounded-xl text-crimson bg-white p-3"
              defaultValue={currentUser.name}
            />
          </label>

          <label className="text-3xl  text-white bg-crimson ">
            <span>Avatar :</span>
            <input
              type="email"
              className="ml-3 rounded-xl text-crimson bg-white p-3"
              defaultValue={currentUser.avatar}
            />
          </label>

          <label className="text-3xl  text-white bg-crimson  ">
            <span>District :</span>
            <select
              name="district"
              onChange={(e) => {
                setDistrict(e.target.value);
              }}
              defaultValue={currentUser.district}
              className="select select-primary focus:outline-none border-none text-crimson text-3xl w-full max-w-xs ml-3 "
            >
              {districts.map((district) => (
                <option key={district["id"]} value={district["name"]}>
                  {district["name"]}
                </option>
              ))}
            </select>
          </label>
          <label className="text-3xl  text-white bg-crimson  ">
            <span>Upazila :</span>
            <select
              name="upazila"
              className="select select-primary focus:outline-none border-none text-crimson text-3xl w-full max-w-xs ml-3"
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
            >
              {upazilaList.map((upazila) => (
                <option
                  key={upazila["id"]}
                  value={upazila["name"]}
                >
                  {upazila["name"]}
                </option>
              ))}
            </select>
          </label>

          <label className="text-3xl  text-white bg-crimson ">
            <span>Blood Group :</span>
            <select
              name="bloodGroup"
              defaultValue={currentUser.bloodGroup}
              className="select select-primary focus:outline-none border-none text-crimson text-3xl w-full max-w-xs ml-3 "
            >
              <option value={"a+"}>a+</option>
              <option value={"a-"}>a-</option>
              <option value={"b+"}>b+</option>
              <option value={"b-"}>b-</option>
              <option value={"ab+"}>ab+</option>
              <option value={"ab-"}>ab-</option>
              <option value={"o+"}>o+</option>
              <option value={"o-"}>o-</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
};

Profile.propTypes = {};

export default Profile;
