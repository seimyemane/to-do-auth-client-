import React from "react";

import Signin from "../components/Signin";
const date = new Date();

const year = date.getFullYear();

const Main = () => {
  return (
    <div className="bg-[url(https://img.freepik.com/free-photo/3d-background-with-white-cubes_23-2150472987.jpg?size=626&ext=jpg)] h-[100vh] bg-no-repeat bg-cover">
      <Signin />

      <h1 className="bg-slate-600 text-white h-fit flex justify-center items-center w-full p-2 ">
        <span className="w-1/2">
          {`${year}`} ©Copyright by Seim Yemane. Use for learning or your
          portfolio. Don't use to teach. Don't claim as your own product.
        </span>
      </h1>
    </div>
  );
};

export default Main;
