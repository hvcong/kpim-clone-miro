'use client';
import React, { useState } from 'react';
import ToolList from './ToolList';
import Undo from './Undo';

type Props = {};

export default function LeftMenuList({}: Props) {
  return (
    <div className=" absolute top-1/2 left-2 -translate-y-1/2 flex flex-col ">
      <ToolList />
      <Undo />
    </div>
  );
}
