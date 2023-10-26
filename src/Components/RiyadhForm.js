import React from "react";
import emptyCartImage from "../assets/images/emptyCart.svg";
import logo from "../assets/images/logoSVG.svg";
import grocery from "../assets/images/grocery.svg";
import moveToTrash from "../assets/images/delete_icon.svg";
import axios from "axios";
import { useState, useEffect } from "react";

import "../style.css";

const RIYADH_INIT_URL =
  "https://us-central1-arsann-f26bb.cloudfunctions.net/getViaRiyadhServices";
const RIYADH_BOOKING_URL =
  "https://us-central1-arsann-f26bb.cloudfunctions.net/initiateBookingPayment";
function RiyadhForm({ color }) {
  const [cartItem, setCartItem] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    arrivalTime: false,
    mobileNumber: false,
    gate: false,
  });

  const [isMobileCartVisible, setIsMobileCartVisible] = useState(false);

  useEffect(
    () => {
      (async () => {
        setIsLoading(true);
        const { data } = await axios.post(RIYADH_INIT_URL, {});
        setServices(data.data);
        setIsLoading(false);
      })();
    },
    setTimeout(() => {}, 50000)
  );
  // tailwind dropUp

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await axios.post(RIYADH_INIT_URL, {});
      console.log(data);
      setServices(data.data);
      setIsLoading(false);
    })();
  }, []);

  const [isModal, setIsModal] = useState(false);

  const closePopup = () => {
    setIsModal(false);
  };
  const [totalPrice, setTotalPrice] = useState(0);
  const [form, setForm] = useState({
    name: "",
    mobileNumber: "",
    arrivalTime: "",
    gate: "",
  });

  const [isServiceDescription, setIsServiceDescription] = useState(false);

  const DescriptionOpener = () => {
    setIsServiceDescription(!isServiceDescription);
  };
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

  const bookPackage = async () => {
    const validationErrors = {};
    if (form.gate.length === 0) validationErrors["gate"] = true;
    if (form.name.length === 0) validationErrors["name"] = true;
    if (form.mobileNumber.length === 0) validationErrors["mobileNumber"] = true;
    if (form.arrivalTime.length === 0) validationErrors["arrivalTime"] = true;
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return alert("Unable to book, please fill proper fields");
    }

    setIsLoading(true);
    const body = {
      amount: totalPrice,
      bookingData: {
        gate: form.gate,
        name: form.name,
        phone: form.mobileNumber,
        services: cartItem,
      },
      time: new Date(form.arrivalTime).getTime(),
    };

    try {
      const response = await axios.post(RIYADH_BOOKING_URL, body);
      if (response.data.data.redirectUrl) {
        window.location.replace(response.data.data.redirectUrl);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsModal(true);
    }
  };
  useEffect(() => {
    const total = cartItem.reduce((acc, item) => acc + item.service_price, 0);
    setTotalPrice(total);
  }, [cartItem]);
  return (
    <div>
      <div className="container-everything">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="backgroundImg "></div>

        {isLoading && <div className="loading"></div>}
        <div className="background">
          <div className="main-container">
            <div className="form-cart-div flex justify-end w-95">
              <div className=" form-container bg-[#272727] mx-auto text-white p-6 rounded-[35px] shadow-md">
                <h2 className="text-3xl font-semibold mb-4 headingHello">
                  Guest Service
                </h2>
                <p className="text-1xl font-semibold mb-4">
                  Please fill the form below
                </p>

                <form action="#" method="post" className="flex riyadh-Form">
                  <div className="form-inner-div w-1/2 ">
                    {/* <!-- Name Input --> */}
                    <div className="first-two-inputs">
                      <label for="name" className="block text-gray-200">
                        Name:
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className=" input border-b w-full px-4 py-2 bg-[#272727] text-white border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        required
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          if (e.target.value?.length > 0) {
                            setErrors({ ...errors, name: false });
                          }
                        }}
                      />
                      <span className="error-span">
                        {errors.name && "Please fill the required field"}
                      </span>
                    </div>
                    <div className="mb-4">
                      {/* time selection menu */}
                      <label className="label" for="timeInput">
                        Arrival Time:
                      </label>

                      <div
                        className="border-b input relative w-full px-4 py-1 bg-[#272727] text-white border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        id="timepicker-inline-12"
                        data-te-input-wrapper-init
                      >
                        <input
                          type="time"
                          className="input peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="form2"
                          value={form.arrivalTime}
                          onChange={(e) => {
                            setForm({ ...form, arrivalTime: e.target.value });
                            if (e.target.value?.length > 0) {
                              setErrors({ ...errors, arrivalTime: false });
                            }
                          }}
                        />
                      </div>
                      <span className="error-span">
                        {errors.arrivalTime && "Please fill the required field"}
                      </span>
                    </div>
                  </div>

                  <div className="form-inner-div w-1/2 ml-12">
                    {/* <!-- Phone Number Input --> */}
                    <div className="mb-[0.3rem]">
                      <label for="phone" className="block text-gray-200">
                        Mobile Number:
                      </label>
                      <div className="flex mobileInput">
                        <input
                          className="input border-b  mr-1 w-20 px-4 py-2 bg-[#272727] text-white border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300 "
                          disabled
                          value="+966"
                        />
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          className=" input border-b  w-full px-4 py-2 bg-[#272727] text-white border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                          required
                          value={form.mobileNumber}
                          onChange={(e) => {
                            setForm({ ...form, mobileNumber: e.target.value });
                            if (e.target.value?.length > 0) {
                              setErrors({ ...errors, mobileNumber: false });
                            }
                          }}
                        />
                      </div>

                      {/* <small className="text-gray-300">
                        Please enter a 10-digit phone number.
                      </small> */}
                      <span className="error-span">
                        {errors.mobileNumber &&
                          "Please fill the required field"}
                      </span>
                    </div>
                    {/* <!-- Option Menu --> */}
                    <div className="mb-5">
                      <label for="option" className="block text-gray-200">
                        Select Gate:
                      </label>
                      <select
                        id="option"
                        name="option"
                        className="input border-b  border-[#605E5E] w-full px-4 py-2  bg-[#272727] text-white border rounded-md focus:outline-none focus:ring focus:border-blue-300 border-gray-400"
                        required
                        onChange={(e) => {
                          setForm({ ...form, gate: e.target.value });
                          if (e.target.value?.length > 0) {
                            setErrors({ ...errors, gate: false });
                          }
                        }}
                        value={form.gate}
                      >
                        <option option="">Select</option>
                        <option option="V1 – Main Entrance">
                          V1 – Main Entrance
                        </option>
                        <option option="V2 - Next to St. Regis Riyadh">
                          V2 - Next to St. Regis Riyadh
                        </option>
                        <option option="V3 – Chi Spacca/Madeo">
                          V3 – Chi Spacca/Madeo
                        </option>
                        <option option="V4 – Cinema/Ballroom">
                          V4 – Cinema/Ballroom
                        </option>
                        <option option="V5 – Via Mercato">
                          V5 – Via Mercato
                        </option>
                      </select>
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
                      <div className="packageContainer border rounded-lg mr-4 border-b border-[#605E5E] ">
                        <div className="containerHead ">
                          <div
                            className={`service-heading ${
                              isServiceDescription ? "bg-[#CDAB6A] " : ""
                            }`}
                          >
                            <p className="font-semibold p-3">
                              {service.service_name}
                            </p>
                            <button onClick={() => DescriptionOpener()}>
                              <i
                                class="fa fa-info"
                                aria-hidden="true"
                                data-toggle="collapse"
                              ></i>
                            </button>
                          </div>
                          <hr className="w-full border-t border-[#605E5E]" />
                          {isServiceDescription && (
                            <div className="serviceDescription">
                              <p>{service.service_description}</p>
                            </div>
                          )}
                        </div>
                        <div className="packagePrice">
                          <p className="price p-3 text-[15px]">
                            Price: {service.service_price} SAR
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
                              {!service.active
                                ? "Added to Cart"
                                : "Add to Cart"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="cart-container cart bg-[#272727]  text-white  rounded-[35px] shadow-md w-25">
                <h1 className="cart-heading text-3xl font-semibold  text-white mb-4  pt-5  pb-4 w-96 ml-6 ">
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
                              Price:{item.service_price}SAR
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
                  <div className="total-container  pl-6 h-[7rem] ">
                    <div className="total-div flex justify-between  border-t border-[#605E5E] w-[386px]">
                      <h4 className="font-semibold ">Total</h4>
                      <h4 className="font-semibold ">{totalPrice} SAR</h4>
                    </div>

                    <div className="book-button  py-[0.7rem] flex justify-center ">
                      <button
                        className="addToCart bg-[#D4B066] text-white rounded-[1rem] w-56 text-[0.9rem] py-[0.7rem] hover:text-black transition-color duration-300"
                        onClick={() => bookPackage()}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* The DropUp Menu */}
      <div class="mob collapse-cart">
        <button
          type="button"
          class="btn btn-primary up-arrow"
          onClick={() => setIsMobileCartVisible(!isMobileCartVisible)}
        >
          <span className="groceryImgSpan">
            <img src={grocery} alt="" />
          </span>
          <span className="rounded-pill-items-count">
            <span>{cartItem.length}</span>
          </span>
        </button>

        {isMobileCartVisible && (
          <div className="cart-container-mobile cart bg-[#272727]  text-white  rounded-[35px] shadow-md w-25">
            <h1 className="cart-heading text-3xl font-semibold  text-white mb-4  pt-5  pb-4 w-96 ml-6 ">
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
                <div className="total-div flex justify-between  border-t border-[#605E5E] w-[386px]">
                  <h4 className="font-semibold ">Total</h4>
                  <h4 className="font-semibold ">{totalPrice} SAR</h4>
                </div>

                <div className="book-button  py-[0.7rem] flex justify-center pr-9">
                  <button
                    className="addToCart bg-[#D4B066] text-white rounded-[1rem] w-56 text-[0.9rem] py-[0.7rem] hover:text-black transition-color duration-300"
                    onClick={() => bookPackage()}
                  >
                    Book
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>

      {isModal && (
        <div className="modalDiv fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-600 opacity-50"></div>
          <div className=" modal-div relative bg-[#222222] rounded-lg p-8 ">
            <div class="flex flex-col items-center">
              <div class="circle">
                <div class="cancel-sign">
                  <div class="cancel-line"></div>
                  <div class="cancel-line"></div>
                </div>
              </div>
              <div className="modalDescription">
                <h2 className="text-2xl text-white">oops...</h2>
                <p className="text-white">
                  Online payment is not availible now
                </p>
                <button
                  onClick={() => closePopup()}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RiyadhForm;
