import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "src/parts/Sidebar";
import formatThousand from "src/helpers/formatThousand";
import formatDate from "src/helpers/formatDate";

import orders from "src/constans/api/orders";

import Loading from "src/parts/Loading";
import Congratulation from "src/parts/Congratulation";
import EmptyState from "src/parts/EmptyState";

import { statusOrders, messageOrder, fetchOrders } from "src/store/actions/orders";

export default function Transactions() {
  const dispatch = useDispatch();
  const ORDERS = useSelector((state) => state.orders);

  const location = useLocation();

  const params =
    location?.search.length > 0 &&
    location?.search
      ?.substring(1, location.length)
      ?.split?.("&")
      ?.reduce?.((acc, item) => {
        let [key, value] = item.split("=");
        value = value.split("-").shift();
        acc[key] = value;
        return acc;
      }, {});

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(statusOrders("loading"));
    orders
      .all()
      .then((res) => {
        dispatch(fetchOrders(res.data));
      })
      .catch((err) => {
        dispatch(messageOrder(err?.response?.data?.message ?? "error"));
      });
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <main className="flex-1">
        <div className="px-4 sm:px-16">
          {ORDERS.status === "loading" && <Loading />}
          {ORDERS.status === "error" && ORDERS.message}
          {ORDERS.status === "ok" &&
            (params.order_id ? (
              <Congratulation data={ORDERS?.data[params.order_id]} />
            ) : ORDERS?.total > 0 ? (
              <>
                <section className="flex flex-col mt-8 pl-12 sm:pl-0">
                  <h1 className="text-xl sm:text-4xl text-gray-900 font-medium">Transactions</h1>
                  <p className="text-sm sm:text-lg text-gray-600">
                    Keep on tract what you've invested
                  </p>
                </section>
                <section className="flex flex-wrap flex-col mt-8">
                  {Object.values(ORDERS.data)?.map?.((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flex flex-wrap justify-start items-center -mx-4 mt-5 mb-4 sm:mb-6"
                      >
                        <div className="w-full sm:w-2/12 px-4">
                          <img
                            src={item?.metadata?.course_thumbnail ?? ""}
                            alt={item?.metadata?.course_name ?? "Class name"}
                          />
                        </div>
                        <div className="w-auto sm:w-3/12 px-4">
                          <h6 className="text-gray-900 text-lg">
                            {item?.metadata?.course_name ?? "Class name"}
                          </h6>
                          <p className="text-gray-600">{item?.metadata?.course_level ?? "Level"}</p>
                        </div>
                        <div className="w-full sm:w-2/12 px-4">
                          <h6 className="text-gray-900 text-lg">
                            Rp.
                            {formatThousand(item?.metadata?.course_price ?? 0)}
                          </h6>
                        </div>
                        <div className="w-auto sm:w-2/12 px-4">
                          <h6 className="text-gray-900 text-lg">
                            {item?.created_at ? formatDate(item?.created_at) : "-"}
                          </h6>
                        </div>
                        <div className="w-3/12 px-4 flex justify-center">
                          {item?.status === "pending" && (
                            <Link
                              className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none text-white px-6 py-3 mt-0 sm:mt-4 whitespace-no-wrap ml-4 sm:ml-0"
                              to={`/joined/${item?.course_id}`}
                            >
                              Lunasi
                            </Link>
                          )}
                          {item?.status === "success" && (
                            <Link
                              className="bg-gray-250 hover:bg-gray-300 transition-all duration-200 focus:outline-none px-6 py-3 mt-0 sm:mt-4 whitespace-no-wrap ml-4 sm:ml-0"
                              to={`/courses/${item?.course_id}`}
                            >
                              Lihat kelas
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </section>
              </>
            ) : (
              <EmptyState />
            ))}
        </div>
      </main>
    </div>
  );
}
