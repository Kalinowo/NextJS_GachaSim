"use client";
import { useState } from "react";

import Draw from "./Draw";
import Gashapon from "./Gashapon";
import PrizeLists from "./PrizeLists";

const defaultState = `擴音器[轉蛋專用]	5	19.500%	
料理箱子[轉蛋專用]	1	19.500%	
狂暴蟻后卷軸[轉蛋專用]	5	19.500%	
隨地倉庫使用券[轉蛋專用]	5	15.000%	
高級戰鬥藥10個箱子	1	15.000%	
高級料理箱[轉蛋專用]	1	1.600%	
力量防護卷軸	5	1.600%	不可交易
服飾精靈合成箱	1	1.200%	
髮型精靈合成箱	1	1.250%	
瀟灑側瀏海禮盒	1	1.200%	
忽克連影子精煉鎚	1	1.050%	
影子技能屬性咒語(物理)	4	0.375%	
影子技能屬性咒語(魔法)	4	0.375%	
(服飾)出遊稻草帽	1	0.225%	可附魔
(服飾)經典羽毛帽	1	0.220%	可附魔
扭曲時光鑰匙	4	0.200%	
海獺微型電扇	1	0.200%	
影子自動唸咒箱	1	0.200%	
時光超越能量	1	0.200%	
古代英雄武器盒	1	0.200%	
影子職業套裝箱II	1	0.200%	
影子技能套裝箱	1	0.175%	
英雄武器-LT物理改造裝置	2	0.150%	
英雄武器-LT魔法改造裝置	2	0.150%	
轟鳴效果石(頭上)	1	0.150%	
影子智慧魔力精靈轉換箱	1	0.110%	
影子力量天然精靈轉換箱	1	0.110%	
信念意志頭盔(皇家禁衛隊)	1	0.060%	
信念意志頭盔II(皇家禁衛隊)	1	0.060%	
影子鎧甲武器轉變箱	1	0.060%	
(服飾)泰國毛小孩	1	0.060%	可附魔
懺悔造物冠冕	1	0.040%	
皇軍圖騰戒	1	0.025%	
古代夢羅克貴族首飾	1	0.020%	
伊美樂心臟能量石	1	0.015%	
天地樹的信仰	1	0.010%	
法老王卡片	1	0.005%	
滅絕古埃及王卡片	1	0.005%	`;

export default function StateInput() {
  const [state, setState] = useState<any>(defaultState);
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
