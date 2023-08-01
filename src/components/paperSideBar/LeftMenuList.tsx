"use client";
import React, { useState } from "react";
import ToolList from "../paper/ToolList";
import Undo from "../paper/Undo";
import { BugetIcon } from "../svgs";
import usePaperStore from "@/store/paper_store";

type Props = {};

export default function LeftMenuList({}: Props) {
  const { setLeftSideBarType } = usePaperStore();
  return (
    <div className=''>
      <ToolList />
      <Undo />
      <div className=' bg-white rounded mt-3'>
        <div
          className='ct-menu-item bg-white'
          onClick={() => {
            setLeftSideBarType("frame");
          }}
        >
          <BugetIcon className='w-5 h-5 text-gray-700' />
        </div>
      </div>
    </div>
  );
}
