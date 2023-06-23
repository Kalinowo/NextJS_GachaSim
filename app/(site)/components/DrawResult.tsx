import React, { useEffect } from "react";
import { useRef, useState } from "react";

interface DrawResultProps {
  setModal: any;
  display: Array<any>;
  setDraw: any;
  compare: any;
}

export default function DrawResult(props: DrawResultProps) {
  const { setModal, display, setDraw, compare } = props;
  const modalRef = useRef<HTMLInputElement>(null);

  function closeModal(e: any) {
    if (modalRef.current === e.target) {
      setDraw(false);
      setModal(false);
    }
  }

  return (
    <>
      <div
        ref={modalRef}
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-10"
        onClick={(e) => closeModal(e)}
      >
        <div className="flex justify-center items-center w-full h-auto bg-white border-solid border-2 border-black p-5 mx-2 sm:w-[380px] rounded-md">
          {display.map((value: string, index: number) => (
            <div key={index}>
              {Object.entries(value).map((item) => (
                <div
                  key={item[0]}
                  className="flex flex-col justify-center items-center text-xl"
                  style={{
                    color:
                      compare.filter((obj: any) => obj[0] === item[0])[0][2] <=
                      20
                        ? "red"
                        : "black",
                  }}
                >
                  {item[0]}x{item[1]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
