import React from "react";
import emptyCartImage from "../assets/images/emptyCart.svg";
import moduladdToNothing from "../assets/images/bannerImages/addToNothing.svg";
import grocery from "../assets/images/grocery.svg";
import moveToTrash from "../assets/images/delete_icon.svg";
import axios from "axios";
import { useState, useEffect } from "react";

import "../style.css";
import { Input, Timepicker, initTE } from "tw-elements";

const RIYADH_INIT_URL =
  "https://us-central1-arsann-f26bb.cloudfunctions.net/getViaRiyadhServices";
const RIYADH_BOOKING_URL =
  "https://us-central1-arsann-f26bb.cloudfunctions.net/initiateBookingPayment";
function RiyadhForm({ color }) {
  const [cartItem, setCartItem] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // tailwind dropUp

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await axios.post(RIYADH_INIT_URL, {});
      setServices(data.data);
      setIsLoading(false);
    })();
  }, []);

  const [totalPrice, setTotalPrice] = useState(0);
  const [form, setForm] = useState({
    name: "",
    mobileNumber: "",
    arrivalTime: "",
    gate: "",
  });

  useEffect(() => {
    console.log("form", form);
  }, [form]);
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
    setIsLoading(true);
    const body = {
      amount: totalPrice,
      bookingData: {
        gate: form.gate,
        name: form.name,
        phone: form.mobileNumber,
        services: cartItem,
      },
      time: new Date().getTime(),
    };
    const result = await axios.post(RIYADH_BOOKING_URL, body);
    if (result.data.redirectUrl) {
      window.location.replace(result.data.redirectUrl);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    const total = cartItem.reduce((acc, item) => acc + item.service_price, 0);
    setTotalPrice(total);
  }, [cartItem]);
  return (
    <div>
      <div className="container-everything">
        <div className="backgroundImg "></div>

        {isLoading && <div className="loading"></div>}
        <div className="background">
          <div className="main-container">
            <div className="form-cart-div flex justify-end w-95">
              <div className=" form-container bg-[#272727] mx-auto text-white p-6 rounded-[35px] shadow-md">
                <h2 className="text-2xl font-semibold mb-4 headingHello">
                  Guest Service
                </h2>
                <p className="text-1xl font-semibold mb-4">
                  Please fill the form below
                </p>

                <form action="#" method="post" className="flex riyadh-Form">
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
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
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
                          type="time"
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          id="form2"
                          value={form.arrivalTime}
                          onChange={(e) =>
                            setForm({ ...form, arrivalTime: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-inner-div w-1/2 ml-12">
                    {/* <!-- Phone Number Input --> */}
                    <div className="mb-[0.3rem]">
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
                          value={form.mobileNumber}
                          onChange={(e) =>
                            setForm({ ...form, mobileNumber: e.target.value })
                          }
                        />
                      </div>

                      <small className="text-gray-300">
                        Please enter a 10-digit phone number.
                      </small>
                    </div>
                    {/* <!-- Option Menu --> */}
                    <div className="mb-5">
                      <label for="option" className="block text-gray-200">
                        Select Gate:
                      </label>
                      <select
                        id="option"
                        name="option"
                        className="border-b  border-gray-500 w-full px-4 py-2  bg-[#272727] text-white border rounded-md focus:outline-none focus:ring focus:border-blue-300 border-gray-400"
                        required
                        onChange={(e) =>
                          setForm({ ...form, gate: e.target.value })
                        }
                        value={form.gate}
                      >
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
                      <div className="packageContainer border rounded-lg mr-4 border-b border-gray-500 ">
                        <div className="containerHead ">
                          <p className="font-semibold p-3">
                            {service.service_name}
                          </p>
                          <hr className="w-full border-t border-gray-500" />
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
        <button type="button" class="btn btn-primary up-arrow">
          {/* <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#demo"> */}
          <span>
            <img src={grocery} alt="" />
            {/* <span
              class="span-carItem position-absolute top-0 start-100 translate-middle badge rounded-pill"
             
            >
             
            </span> */}
          </span>
        </button>
        <div
          id="demo"
          class="collapse collapse-div"

          // id="divID"
          // style="display: none"
        >
          <div class="col-sm-12 cart card right-sec">
            <div class="">
              <hr />
              <div class="card-body p-0 hi-100">
                <span>
                  <div className="addNothing-div">
                    <img src={moduladdToNothing} alt="" />
                  </div>
                  <p className="nothingInCart">Nothing in your cart</p>
                </span>
                <ng-template>
                  <ul class="addCart ">
                    <li>
                      <span>
                        <p className="serviceName">
                          {/* {{ cart.service_name }} */}
                        </p>
                        <p className="priceDiv">
                          {/* Price: {{ cart.service_price }} */}
                        </p>
                      </span>
                      <span>
                        <img src="../../assets/image/trash.png" alt="" />
                      </span>
                    </li>
                  </ul>
                </ng-template>
              </div>
              <ng-template>
                <div class="card-footer p-0 cardFooter">
                  <ul>
                    <li>
                      <span>
                        <p className="liSpan">Total Amount</p>
                      </span>
                      <span>{/* <p>{{ this.total }} SAR</p> */}</span>
                    </li>
                  </ul>
                  <button type="button" class="btn btn-gold bookButton">
                    Book
                  </button>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiyadhForm;
