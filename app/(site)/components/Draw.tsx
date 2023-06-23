"use client";
import { useState, useEffect } from "react";

import DrawResult from "./DrawResult";

interface DrawProps {
  draw: boolean;
  setDraw: any;
  state: any;
}

export default function Draw(props: DrawProps) {
  const { state, draw, setDraw } = props;
  const [prize, setPrize] = useState<any>([]);
  const [display, setDisplay] = useState<any>([]);
  const [compare, setCompare] = useState<any>([]);
  const [lickBox, setLickBox] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (prize.length > 0) {
      let countedNames = prize.reduce(function (allNames: any, name: any) {
        if (name in allNames) {
          allNames[name] += 1;
        } else {
          allNames[name] = 1;
        }
        return allNames;
      }, {});
      setDisplay([countedNames]);
    }
  }, [prize]);

  useEffect(() => {
    setError("");
  }, [state]);

  useEffect(() => {
    if (state) {
      let data = state.toString().split("\n");
      let allItems: object[] = [];
      let compare: object[] = [];

      //放入獎品
      data.forEach((item: string) => {
        let getItems = item.split("\t");
        let object = { ...getItems };
        allItems.push(object);
      });

      //在resultPage去compare機率用的
      data.forEach((item: string) => {
        let getItems = item.split("\t");
        let object = { ...getItems };
        compare.push(object);
      });

      setCompare(compare);

      //除錯, 發生時不往下執行
      let debug = false;
      allItems.forEach((item: object) => {
        if (Object.keys(item).length < 3) {
          debug = true;
        }
      });

      if (debug) {
        setError("格式錯誤");
        return;
      }

      //取出所有機率, 然後獲得小數點後最長的機率
      let longest = 0;
      let temp = allItems.map((prob: any) => prob["2"]);

      temp.forEach((prob) => {
        let after_point = "";
        let check = prob.includes(".");
        if (check) {
          after_point = prob.split(".")[1].split("%")[0];
        }
        if (after_point.length > longest) {
          longest = after_point.length;
        }
      });

      let mutiple = Math.pow(10, longest);

      //讓機率變整數(加0)
      allItems.forEach((value: any) => {
        value[2] = parseFloat(value[2]) * mutiple;
      });

      //在resultPage去compare機率用的
      compare.forEach((value: any) => {
        value[2] = parseFloat(value[2]) * mutiple;
      });

      let max = mutiple * 100;

      let lickBox: string[] = [];

      let check = allItems.reduce(
        (acc, curr: any) => acc + parseInt(curr[2]),
        0
      );

      if (check !== max) {
        setError("機率不等於100%");
        return;
      }

      for (let i = 0; i < max; i++) {
        allItems.forEach((value: any) => {
          if (value[2] > 0) {
            lickBox.push(value);
            value[2] -= 1;
          }
        });
      }

      setLickBox(lickBox);
    }
  }, [state]);

  function pick(times: number) {
    setDraw(true);
    setTimeout(() => {
      setPrize([]);
      for (let i = 0; i < times; i++) {
        let result = lickBox[Math.floor(Math.random() * lickBox.length)][0];
        setPrize((prev: string[]) => [...prev, result]);
        setModal(true);
      }
    }, 2000);
  }

  return (
    <>
      <>
        {error && (
          <div className="text-center mt-5 text-red-500 font-bold text-2xl">
            {error}
          </div>
        )}
        <br />
        <div className="flex justify-between">
          <button
            className="border-solid border-2 border-black bg-white p-2 rounded-sm hover:bg-[#f7c6c6]"
            onClick={() => pick(1)}
            disabled={error || draw || !state ? true : false}
          >
            抽1次
          </button>
          <button
            className="border-solid border-2 border-black bg-white p-2 rounded-sm hover:bg-[#f7c6c6]"
            onClick={() => pick(10)}
            disabled={error || draw || !state ? true : false}
          >
            抽10次
          </button>
          <button
            className="border-solid border-2 border-black bg-white p-2 rounded-sm hover:bg-[#f7c6c6]"
            onClick={() => pick(100)}
            disabled={error || draw || !state ? true : false}
          >
            抽100次
          </button>
        </div>
        <br />
        {modal && (
          <DrawResult
            setModal={setModal}
            display={display}
            setDraw={setDraw}
            compare={compare}
          />
        )}
      </>
    </>
  );
}
