"use client";
import { useState, useEffect } from "react";

interface PrizeListsProps {
  state: any;
}

export default function PrizeLists(props: PrizeListsProps) {
  const { state } = props;
  const [display, setDisplay] = useState<any>([]);

  useEffect(() => {
    if (state) {
      let data = state.toString().split("\n");
      let allItems: object[] = [];
      //放入獎品
      data.forEach((item: string) => {
        let getItems = item.split("\t");
        let object = { ...getItems };
        allItems.push(object);
      });

      setDisplay(allItems);
    } else {
      setDisplay([]);
    }
  }, [state]);

  return (
    <div className="absolute left-0 h-full w-full">
      <table className="h-full w-full">
        <thead className="border-solid border-2 border-black">
          <tr className="bg-gray-200">
            <th colSpan={1} className="border-solid border-2 border-black">
              物品
            </th>
            <th colSpan={1} className="border-solid border-2 border-black">
              數量
            </th>
            <th colSpan={1} className="border-solid border-2 border-black">
              轉蛋機率
            </th>
            <th colSpan={1} className="border-solid border-2 border-black">
              備註
            </th>
          </tr>
        </thead>
        <tbody>
          {display.map((value: any, index: number) => (
            <tr key={index} className="odd:bg-white even:bg-gray-200">
              <td className="text-lg border-solid border-2 border-black px-2 whitespace-nowrap">
                {value[0]}
              </td>
              <td className="text-center border-solid border-2 border-black px-5 whitespace-nowrap">
                {value[1]}
              </td>
              <td className="text-center border-solid border-2 border-black px-5 whitespace-nowrap">
                {value[2]}
              </td>
              <td className="text-center border-solid border-2 border-black px-8 whitespace-nowrap">
                {value[3]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
