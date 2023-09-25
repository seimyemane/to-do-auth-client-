import React from "react";

const date = new Date();

const year = date.getFullYear();

const Footer = () => {
  return (
    <div>
      {" "}
      <h1 className="bg-slate-600 text-white h-fit flex justify-center items-center w-full p-2 ">
        <span className="w-full ">
          {`${year}`} ©Copyright by Seim Yemane. Use for learning or your
          portfolio. Don't use to teach. Don't claim as your own product.
        </span>
      </h1>
    </div>
  );
};

export default Footer;
