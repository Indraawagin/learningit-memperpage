import React from "react";

export default function EmptyState() {
  return (
    <section className="flex h-screen items-center relative z-50 bg-white">
      <div className="w-full sm:w-5/12 text-center py-12 mx-auto">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/illustration-myclass.jpg`}
          alt="Opps We Lost"
        />
        <p className="text-3xl text-gray-900 mt-12">Time to Invest</p>
        <p className="text-lg text-gray-600 mt-4 mb-8 mx-auto text-center">
          It seems you don’t have any class yet so let’s get them and grow your skills
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-5"
          href={`${process.env.REACT_APP_FRONTPAGE_URL}/courses`}
        >
          Cari Kelas
        </a>
      </div>
    </section>
  );
}
