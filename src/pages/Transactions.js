import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "src/parts/Sidebar";
import formatThousand from "src/helpers/formatThousand";
import formatDate from "src/helpers/formatDate";

import orders from "src/constans/api/orders";

import Loading from "src/parts/Loading";
import Congratulation from "src/parts/Congratulation";
// import EmptyState from "src/parts/EmptyState";

import { statusOrders, messageOrder, fetchOrders } from "src/store/actions/orders";

export default function Transactions() {
  const dispatch = useDispatch();
  const ORDERS = useSelector((state) => state.orders);

  const location = useLocation();
  const params =
    location.search.length > 0 &&
    location?.search
      ?.substring?.(1, location.length)
      ?.split?.("&")
      ?.reduce?.((acc, item) => {
        const [key, value] = item?.split("=");
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
      <Sidebar />
      <main className="flex-1">
        <div className="px-16">
          <div className="flex flex-col mt-8">
            {ORDERS.status === "loading" && <Loading />}
            {ORDERS.status === "error" && ORDERS.message}
            {ORDERS.status === "ok" && params.order_id ? (
              <Congratulation data={ORDERS.data[params.order_id]} />
            ) : ORDERS.total > 0 ? (
              <>
                <section className="flex flex-col mt-8">
                  <h1 className="text-4xl text-gray-900 font-medium">Transactions</h1>
                  <p className="text-lg text-gray-600">Keep on tract what you've invested</p>
                </section>
                <section className="flex flex-col mt-8">
                  {Object?.values?.(ORDERS.data)?.map((item) => {
                    return (
                      <div key={item.id} className="flex justify-start items-center -mx-4 mt-5">
                        <div className="w-auto px-4" style={{ width: 150 }}>
                          <img src={item?.image} alt={item?.name ?? "Class Name"} />
                        </div>
                        <div className="w-3/12 px-4">
                          <h6 className="text-gray-900 text-lg">{item?.name ?? "Name Course"}</h6>
                          <p className="text-gray-600"> {item?.levelType ?? "Level"}</p>
                        </div>
                        <div className="w-2/12 px-4">
                          <h6 className="text-gray-900 text-lg">
                            Rp. {formatThousand(item?.price ?? 0)}
                          </h6>
                        </div>
                        <div className="w-2/12 px-4">
                          <h6 className="text-gray-900 text-lg">
                            {item?.date ? formatDate(item?.date) : "-"}
                          </h6>
                        </div>
                        <div className="w-auto px-4">
                          <button className="bg-gray-250 hover:bg-gray-300 transition-all duration-200 focus:outline-none text-white px-6 py-3 mt-4">
                            Lihat Class
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </section>
              </>
            ) : (
              "No"
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
