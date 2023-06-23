"use client";
import { useState } from "react";

import Draw from "./Draw";
import Gashapon from "./Gashapon";
import PrizeLists from "./PrizeLists";

export default function StateInput() {
  const [state, setState] = useState<any>("");
  const [draw, setDraw] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col h-full w-full">
        <div>在下方表格中貼上轉蛋內容</div>
        <textarea
          title="GachaLists"
          placeholder="複製轉蛋內容..."
          value={state}
          className="h-[50px] w-full border-solid border-2 border-black"
          onChange={(e) => setState(e.target.value)}
        />
        <Draw state={state} draw={draw} setDraw={setDraw} />
      </div>
      <div className="flex flex-col h-[500px] lg:flex-row lg:gap-5 lg:justify-center">
        <div className="relative mt-10 basis-[50%] h-full hidden lg:block lg:overflow-scroll">
          <PrizeLists state={state} />
        </div>
        <div
          className={
            draw
              ? "flex flex-col m-5 lg:hidden"
              : "group flex flex-col m-5 lg:hidden "
          }
        >
          <span className="text-xl text-center border-solid border-black border-2 bg-white text-black cursor-pointer ">
            查看獎池/機率
          </span>
          <div className="relative group h-0 duration-500 overflow-scroll group-hover:h-[500px]">
            <PrizeLists state={state} />
          </div>
        </div>
        <div className="relative h-full lg:h-[600px] w-full lg:basis-[calc(50%-20px)]">
          <Gashapon draw={draw} />
        </div>
      </div>
    </>
  );
}
