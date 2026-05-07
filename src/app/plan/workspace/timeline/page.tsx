"use client";

import { useState } from "react";
import React from "react";
const TimeLine = () => {
  const [timeScale, setTImeScale] = useState(10);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            {[...Array(24)].map((_, hour) => (
              <React.Fragment key={"hour:" + hour}>
                <th>{hour.toString().padStart(2, "0")}</th>
                {Array.from({ length: 60 / timeScale }).map((_, minute) => (
                  <th key={"minute:" + minute}></th>
                ))}
              </React.Fragment>
            ))}
          </tr>
          <tr>
            <th>ยานพาหนะ</th>
            {[...Array(24)].map((_, hour) => (
              <React.Fragment key={"hour:" + hour}>
                {[...Array(60 / timeScale)].map((_, minute) => (
                  <th key={minute}>{minute.toString().padStart(2, "0")}</th>
                ))}
              </React.Fragment>
            ))}
            {/* <th>00</th>
            <th>10</th>
            <th>20</th>
            <th>30</th>
            <th>40</th>
            <th>50</th> */}
          </tr>
        </thead>
        <tbody>
          <td></td>
        </tbody>
      </table>
    </div>
  );
};

export default TimeLine;
