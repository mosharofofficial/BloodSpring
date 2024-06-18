import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Login = (props) => {
  return (
    <div className="hero min-h-screen bg-crimson  ">
      <div className="hero-content max-w-[100%] w-[100%] flex-col lg:flex-row-reverse">
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

            <div className="form-control mt-6">
              <button className="btn button">Log In</button>
            </div>
            <Link to={"/register"}>
              <h2 className="text-lg text-white hover:underline">
                Don&apos;t have an account? Sign Up{" "}
              </h2>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
