import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "src/parts/Sidebar";

import SettingForm from "src/parts/SettingForm";

export default function Settings() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const DETAILS = useSelector((state) => state.users);

  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <main className="flex-1">
        <div className="px-16">
          <div className="flex flex-col mt-8">
            <section className="flex flex-col mt-8">
              <h1 className="text-4xl text-gray-900 font-medium">Settings</h1>
              <p className="text-lg text-gray-600">Secure your data information</p>
            </section>
            <SettingForm details={DETAILS}></SettingForm>
          </div>
        </div>
      </main>
    </div>
  );
}
