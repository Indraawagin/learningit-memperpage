import React, { useEffect } from "react";
import Sidebar from "src/parts/Sidebar";
import formatThousand from "src/helpers/formatThousand";

export default function Transactions() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const items = [
    {
      id: "1",
      slug: "2",
      image: "new-class.jpg",
      name: "Apa Saja",
      levelType: "Beginner",
      price: "100000",
      data: "2022-08-12",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <div className="px-16">
          <section className="flex flex-col mt-8">
            <h1 className="text-4xl text-gray-900 font-medium">Transactions</h1>
            <p className="text-lg text-gray-600">Keep on tract what you've invested</p>
          </section>
          <div className="flex flex-col mt-8">
            {items.length > 0
              ? items.map((item) => {
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
                        <p className="text-gray-600"> {item?.levelType ?? "Level"}</p>
                      </div>
                    </div>
                  );
                })
              : "No Transactions"}
          </div>
        </div>
      </main>
    </div>
  );
}
