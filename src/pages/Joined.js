import React, { useState, useEffect, useCallback } from "react";
import courses from "src/constans/api/courses";
import { Link } from "react-router-dom";

import ServerError from "src/pages/500";
import Loading from "src/parts/Loading";

export default function Joined({ history, match }) {
  const [State, setState] = useState(() => ({
    isLoading: true,
    isError: false,
    data: {},
  }));

  const joining = useCallback(async () => {
    try {
      const details = await courses.details(match.params.class);
      const joined = await courses.join(match.params.class);
      if (joined.data.snap_url) {
        window.location.href = joined.data.snap_url;
      } else {
        setState({ isLoading: false, isError: false, data: details });
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [match.params.class]);

  useEffect(() => {
    joining();
  }, [joining]);

  if (State.isLoading) return <Loading></Loading>;
  if (State.isError) return <ServerError></ServerError>;

  return (
    <section className="h-screen flex flex-col items-center mt-24">
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/illustration-joined.jpg`}
        alt="Success Join Class"
      />
      <p className="text-3xl text-gray-900 mt-12">Welcome to Class</p>
      <span className="text-lg text-gray-600 mt-4 mb-8 lg:w-3/12 xl:w-2/12 mx-auto text-center">
        You have successfully joined our <strong>{State?.data?.name ?? "Class Name"}</strong> class
      </span>
      <Link
        className="cursor-pointer bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner 
          text-white px-6 py-3"
        to={`/courses/${match.params.class}`}
      >
        Start Learn
      </Link>
    </section>
  );
}
