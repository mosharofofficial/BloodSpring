import PropTypes from "prop-types";

const Blogs = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold py-5 pb-10 mb-0 text-center bg-crimson text-white">
        Blogs
      </h1>

      {/* blog container */}
      <div className="  pb-10 mt-[10px]">
        {/* blog */}
        <div className="gap-x bg-crimson   text-white    ">
          <h1 className=" text-3xl py-5 px-3">
            The Ripple Effect of a Single Donation: Unveiling the Life-Saving
            Journey
          </h1>
          <img
            src={"https://i.ibb.co/C2fNSRq/donating-blood.jpg"}
            className="  border-y-[2px]"
          />
          <p className=" text-lg sm:text-xl p-3    border-b-[2px]">
            Have you ever wondered what happens after you donate blood? The
            impact goes far beyond simply saving a life. It&apos;s a ripple
            effect that touches countless individuals and their loved ones. In
            this blog post, we&apos;ll delve deeper into the incredible journey
            of donated blood, from the moment you step into a donation center to
            the life-saving procedures it facilitates.
          </p>
          <div className="flex justify-center py-3">
            <button className="btn button">Read More</button>
          </div>
        </div>

        {/* blog */}
        <div className="gap-x bg-crimson   text-white   border-t-[10px] ">
          <h1 className=" text-3xl py-5 px-3">
            Beyond the Needle: Addressing Blood Donation Fears with Empathy and
            Knowledge
          </h1>
          <img
            src={"https://i.ibb.co/wp0Q1C1/empathy.jpg"}
            className="  border-y-[2px]"
          />
          <p className=" text-lg sm:text-xl p-3    border-b-[2px]">
            Donating blood is a fantastic way to help others, but it's natural
            to have some concerns. Fear of needles, anxieties about pain, or
            worries about eligibility are common. In this blog post, we'll
            address these anxieties head-on, providing factual information and
            practical tips to overcome your fears and become a confident blood
            donor.
          </p>
          <div className="flex justify-center py-3">
            <button className="btn button">Read More</button>
          </div>
        </div>

        {/* blog */}
        <div className="gap-x bg-crimson   text-white   border-t-[10px] ">
          <h1 className=" text-3xl py-5 px-3">
            The Science of the Red Liquid: A Deep Dive into Blood Components and
            Typing
          </h1>
          <img
            src={"https://i.ibb.co/rxRyt9R/blood-Components.jpg"}
            className="  border-y-[2px]"
          />
          <p className=" text-lg sm:text-xl p-3    border-b-[2px]">
            Blood is an amazing and complex fluid that keeps us alive and
            functioning. But what exactly is in our blood, and how does it all
            work together? This blog post dives into the science behind blood,
            exploring its various components and the crucial role of blood
            typing in safe transfusions.
          </p>
          <div className="flex justify-center py-3">
            <button className="btn button">Read More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Blogs.propTypes = {};

export default Blogs;
