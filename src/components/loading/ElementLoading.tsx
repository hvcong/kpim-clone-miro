import React from 'react';

type Props = {};

export default function ElementLoading({}: Props) {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300/60 flex justify-center items-center">
      loading...
    </div>
  );
}
