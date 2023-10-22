import React from "react";
// import logo from "../assets/images/logoSVG.svg";
import backgroundImg from "../assets/images/backgroundImage.png";
import emptyCartImage from "../assets/images/emptyCart.svg";
import moveToTrash from "../assets/images/delete_icon.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import "../style.css";
import { Input, Timepicker, initTE } from "tw-elements";

const RIYADH_INIT_URL =
  "https://us-central1-arsann-f26bb.cloudfunctions.net/getViaRiyadhServices";
function RiyadhForm() {
  const [cartItem, setCartItem] = useState([]);
  const [services, setServices] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.post(RIYADH_INIT_URL, {});
      setServices(data.data);
    })();
  }, []);

  const [totalPrice, setTotalPrice] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const addToCart = (item) => {
    setCartItem([...cartItem, item]);

    const newServices = services.map((service) => {
      if (item.s_id === service.s_id) {
        service.active = false;
      }
      return service;
    });

    setServices(newServices);
  };

  const removeFromCart = (index) => {
    setButtonDisabled(false);

    const updatedCart = [
      ...cartItem.slice(0, index),
      ...cartItem.slice(index + 1),
    ];

    const item = cartItem[index];
    const newServices = services.map((service) => {
      if (item.s_id === service.s_id) {
        service.active = true;
      }
      return service;
    });

    setServices(newServices);
    setCartItem(updatedCart);
  };

  useEffect(() => {
    const total = cartItem.reduce((acc, item) => acc + item.service_price, 0);
    setTotalPrice(total);
  }, [cartItem]);
  return (
    <div>
      <div className="backgroundImg ">
        <img src={backgroundImg} alt="" />
      </div>
      <div className="background">
        <div className="main-container">
          <div className="form-cart-div flex justify-end w-95">
            <div className=" bg-[#272727] w-[80rem] mx-auto text-white p-6 rounded-[35px] shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Guest Service</h2>
              <p className="text-2xl font-semibold mb-4">
                Please fill the form below
              </p>

              <form action="#" method="post" className="flex">
                <div className="form-inner-div w-1/2 ">
                  {/* <!-- Name Input --> */}
                  <div className="mb-5">
                    <label for="name" className="block text-gray-200">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="border-b border-gray-500 w-full px-4 py-2 bg-[#272727] text-white border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      required
                    />
                  </div>

                  {/* <!-- Phone Number Input --> */}
                  <div className="mb-4">
                    <label for="phone" className="block text-gray-200">
                      Mobile Number:
                    </label>
                    <div className="flex">
                      <input
                        className="border-b border-gray-500 mr-1 w-20 px-4 py-2 bg-[#272727] text-white border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300 "
                        placeholder="+966"
                        disabled
                      />
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        className="border-b border-gray-500 w-full px-4 py-2 bg-[#272727] text-white border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        required
                      />
                    </div>

                    <small className="text-gray-300">
                      Please enter a 10-digit phone number.
                    </small>
                  </div>
                </div>

                <div className="form-inner-div w-1/2 ml-12">
                  {/* <!-- Option Menu --> */}
                  <div className="mb-5">
                    <label for="option" className="block text-gray-200">
                      Select Gate:
                    </label>
                    <select
                      id="option"
                      name="option"
                      className="border-b border-gray-500 w-full px-4 py-2 bg-[#272727] text-white border rounded-md focus:outline-none focus:ring focus:border-blue-300 border-gray-400"
                      required
                    >
                      <option value="">Select</option>
                      <option value="option1">V1 - Main Entrance</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    {/* time selection menu */}
                    <label className="label" for="timeInput">
                      Arrival Time:
                    </label>

                    <div
                      className="border-b border-gray-500 relative w-full px-4 py-1 bg-[#272727] text-white border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      id="timepicker-inline-12"
                      data-te-input-wrapper-init
                    >
                      <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="form2"
                      />
                      <label
                        for="form2"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >
                        Select a time
                      </label>
                    </div>
                  </div>
                </div>
              </form>
              <div className="serviceHeading">
                <h1 className="service-container text-xl font-semibold py-6">
                  Choose a service
                </h1>
              </div>
              <div className="servicesContainer flex">
                {services.map((service, index) => {
                  return (
                    <div className="packageContainer border rounded-lg mr-4 border-b border-gray-500 ">
                      <div className="containerHead ">
                        <p className="font-semibold p-3">
                          {service.service_name}
                        </p>
                        <hr className=" w-[295px] border-t border-gray-500" />
                      </div>
                      <div className="packagePrice">
                        <p className="price p-3 text-[15px]">
                          Price: {service.service_price}{" "}
                          {service.timeMin ? "/" : ""} {service.timeMin}
                        </p>
                        <div className="cart-button flex justify-center pb-2">
                          <button
                            className={`addToCart rounded-lg w-56 text-[0.9rem] py-0.5 hover:text-black transition-color duration-300 ${
                              !service.active
                                ? "bg-[#383838] text-gray-500 hover:text-gray-500"
                                : "bg-[#D4B066] text-white"
                            }`}
                            onClick={() => addToCart(services[index])}
                            disabled={!service.active}
                          >
                            {!service.active ? "Added to Cart" : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="cart bg-[#272727]  text-white  rounded-[35px] shadow-md w-25">
              <h1 className="cart-heading text-3xl font-semibold  text-white mb-4 border-b border-gray-500 pt-5  pb-4 w-96 ml-6">
                Cart
              </h1>

              <div className="cart-item-container ">
                {cartItem.length > 0 ? (
                  cartItem.map((item, index) => (
                    <>
                      <div
                        key={index}
                        className="cart-item flex items-center justify-between pl-6 pb-6"
                      >
                        <div className="flex flex-col">
                          <h2 className="font-semibold text-18">
                            {item.service_name}
                          </h2>
                          <p className="text-gray-500">
                            Price: {item.service_price} SAR
                          </p>
                        </div>
                        <div className="deleteButton pr-8">
                          <button onClick={() => removeFromCart(index)}>
                            <img src={moveToTrash} alt="" />
                          </button>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <>
                    <div className="empty-cart-img flex items-center justify-center pt-32">
                      <img src={emptyCartImage} alt="" />
                    </div>
                    <span className="flex  justify-center">
                      Nothing in your cart
                    </span>
                  </>
                )}
              </div>
              {cartItem.length > 0 ? (
                <div className="total-container  pl-6 h-[5rem] ">
                  <div className="total-div flex justify-between  border-t border-gray-500 w-[386px]">
                    <h4 className="font-semibold ">Total</h4>
                    <h4 className="font-semibold ">{totalPrice} SAR</h4>
                  </div>

                  <div className="book-button  py-[0.7rem] flex justify-center pr-9">
                    <button className="addToCart bg-[#D4B066] text-white rounded-[1rem] w-56 text-[0.9rem] py-[0.7rem] hover:text-black transition-color duration-300">
                      Book
                    </button>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiyadhForm;
