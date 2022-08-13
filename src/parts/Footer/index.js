import React from "react";
import List from "./RenderItem";

export default function Footer() {
  function submit() {}

  return (
    <footer className="container mx-auto">
      <div className="flex justify-between">
        <div className="w-1/6">
          <h6 className="text-white">Company</h6>
          <ul className="mt-4">
            <List textName="API Developer"></List>
            <List textName="Career"></List>
            <List textName="Our Story"></List>
            <List textName="New Soon"></List>
          </ul>
        </div>
        <div className="w-1/6">
          <h6 className="text-white">Student</h6>
          <ul className="mt-4">
            <List textName="Get Scholarship"></List>
            <List textName="Our Pathskills"></List>
            <List textName="All Features"></List>
            <List textName="Refund Policy"></List>
          </ul>
        </div>
        <div className="w-1/6">
          <h6 className="text-white">Touch Us</h6>
          <p className="mt-4 text-indigo-600 leading-loose">
            Micro Centre <br />
            Alleysi Block X No. 12 <br />
            Jakarta Selatan, Indonesia <br />
            +21 2020 5555
          </p>
        </div>
        <div className="w-2/6">
          <h6 className="text-white">Promotions</h6>
          <p className="mt-4 text-indigo-600 leading-loose">
            Submit your email for new updates
          </p>
          <form onSubmit={submit}>
            <input
              type="email"
              className="bg-white focus:outline-none border-0  px-6 py-3 w-1/2"
              placeholder="Your email address"
            />
            <button
              className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none
            shadow-inner text-white px-6 py-3 mt-5"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="border-t pt-8 mt-8 border-indigo-1000 text-center">
        <p className="text-indigo-600">
          2020 Copyright LearningIt by Indraawagin. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
