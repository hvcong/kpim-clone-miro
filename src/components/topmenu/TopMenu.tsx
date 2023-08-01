import React from "react";
import TopLeftMenu from "./TopLeftMenu";
import TopRightMenu from "./TopRightMenu";

type Props = {};

export default function TopMenu({}: Props) {
  return (
    <div className='fixed top-2 left-2 right-0 pointer-events-none'>
      <div className='flex justify-between h-11'>
        <TopLeftMenu />
        <TopRightMenu />
      </div>
    </div>
  );
}
