import React, { ChangeEvent, useState } from "react";

interface IProps {
  handleUserInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default ({ handleUserInput }: IProps) => {
  return (
    <div>
      Filter by launch name: <input onChange={handleUserInput} type="text" />
    </div>
  );
};
