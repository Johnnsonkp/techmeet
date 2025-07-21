import './control.css';

import React from 'react';

function CircularControl3() {
  return (
    <div id="container">
      <div id="circle">
        <svg
          width={300}
          height={300}
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="circlePath"
              d="M 150,150 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
            />
          </defs>
          <circle cx={150} cy={150} r={60} fill="none" />
          <g>
            <text fill="#fff" fontSize="16" fontFamily="Arial">
              <textPath href="#circlePath">
                ABCDE ~ EFGHI JKLMNOPQ ~ ABCDE ~ EFGHI JKLMNOPQ ~ ABCDE ~ EFGHI JKLMNOPQ ~
              </textPath>
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default CircularControl3;