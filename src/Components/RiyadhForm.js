import React from "react";
// import logo from "../assets/images/logoSVG.svg";
import backgroundImg from "../assets/images/backgroundImage.png";
import "../style.css";

function RiyadhForm() {
  return (
    <div>
      {/* <div className="headImg">
        <img src={logo} alt="" />
      </div> */}
      <div className="backgroundImg">
        <img src={backgroundImg} alt="" />
      </div>
      <div className="background">
        <div className="container">
          <div class=" bg-[#272727] max-w-[70rem] mx-auto text-white p-6 rounded-[35px] shadow-md">
            <h2 class="text-2xl font-semibold mb-4">Guest Service</h2>
            <p class="text-2xl font-semibold mb-4">
              Please fill the form below
            </p>

            <form action="#" method="post" className="flex">
              <div className="form-inner-div w-1/2 ">
                {/* <!-- Name Input --> */}
                <div class="mb-4">
                  <label for="name" class="block text-gray-200">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="w-full px-4 py-2 bg-[#272727] text-white border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                </div>

                {/* <!-- Phone Number Input --> */}
                <div class="mb-4">
                  <label for="phone" class="block text-gray-200">
                    Mobile Number:
                  </label>
                  <div className="flex">
                    <input
                      class=" mr-1 w-20 px-4 py-2 bg-[#272727] text-white border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300 "
                      placeholder="+966"
                    />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      pattern="[0-9]{10}"
                      placeholder="1234567890"
                      class="w-full px-4 py-2 bg-[#272727] text-white border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                  </div>

                  <small class="text-gray-300">
                    Please enter a 10-digit phone number.
                  </small>
                </div>
              </div>

              <div className="form-inner-div w-1/2 ml-12">
                {/* <!-- Option Menu --> */}
                <div class="mb-4">
                  <label for="option" class="block text-gray-200">
                    Select Gate:
                  </label>
                  <select
                    id="option"
                    name="option"
                    class="w-full px-4 py-2 bg-[#272727] text-white border rounded-md focus:outline-none focus:ring focus:border-blue-300 border-gray-400"
                    required
                  >
                    <option value="">Select</option>
                    <option value="option1">V1 - Main Entrance</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
                <div class="mb-4">
                  {/* time selection menu */}
                  <label className="label-time" for="timeInput" class="">
                    Arrival Time:
                  </label>

                  <input
                    className="input-time border-gray-400"
                    type="time"
                    id="timeInput"
                    name="timeInput"
                  />
                </div>
              </div>
            </form>
            <div className="serviceHeading">
              <h1 className="service-container text-xl font-semibold">
                Choose a service
              </h1>
            </div>
            <div className="servicesContainer flex">
              <div className="packageContainer border border-gray-400  rounded-lg mr-4">
                <div className="containerHead ">
                  <p className="font-semibold p-3">VIA Package</p>
                  <hr className=" w-[255px] border-t border-gray-400" />
                </div>
                <div className="packagePrice">
                  <p className="p-3 text-[15px]">Price: 200 SAR</p>
                  <div className="cart-button flex justify-center pb-2">
                    <button className="addToCart bg-yellow-500 hover:bg-yellow-300 text-white font-semibold rounded-lg w-56 text-[0.9rem] py-0.5">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="packageContainer border border-gray-400  rounded-lg mr-4">
                <div className="containerHead ">
                  <p className="font-semibold p-3">VIA Package</p>
                  <hr className=" w-[255px] border-t border-gray-400" />
                </div>
                <div className="packagePrice">
                  <p className="p-3 text-[15px]">Price: 200 SAR</p>
                  <div className="cart-button flex justify-center pb-2">
                    <button className="addToCart bg-yellow-500 hover:bg-yellow-300 text-white font-semibold rounded-lg w-56 text-[0.9rem] py-0.5">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="packageContainer border border-gray-400  rounded-lg mr-4">
                <div className="containerHead ">
                  <p className="font-semibold p-3">VIA Package</p>
                  <hr className=" w-[255px] border-t border-gray-400" />
                </div>
                <div className="packagePrice">
                  <p className="p-3 text-[15px]">Price: 200 SAR</p>
                  <div className="cart-button flex justify-center pb-2">
                    <button className="addToCart bg-yellow-500 hover:bg-yellow-300 text-white font-semibold rounded-lg w-56 text-[0.9rem] py-0.5">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="packageContainer border border-gray-400  rounded-lg">
                <div className="containerHead ">
                  <p className="font-semibold p-3">VIA Package</p>
                  <hr className=" w-[255px] border-t border-gray-400" />
                </div>
                <div className="packagePrice">
                  <p className="p-3 text-[15px]">Price: 200 SAR</p>
                  <div className="cart-button flex justify-center pb-2">
                    <button className="addToCart bg-yellow-500 hover:bg-yellow-300 text-white font-semibold rounded-lg w-56 text-[0.9rem] py-0.5">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiyadhForm;
