import './circular.css';

import React from 'react';

const SEGMENTS = 5;

function CircularRemote2() {
  return (
    // <div
    //   className="wrapcircles rotate"
    //   style={{
    //     position: 'relative',
    //     top: -380,
    //     left: 500,
    //     width: 500,
    //     height: 500,
    //     borderRadius: '50%',
    //     backgroundSize: 'contain',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: 'center',
    //     padding: 130,
    //     boxSizing: 'border-box',
    //     overflow: 'hidden',
    //   }}
    // >
      <div
        style={{
         position: "absolute",
         top: 150, 
         right: 153,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'transparent',
          boxShadow: '0 0 8px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255,255,255,0.15)',
          border: '4px solid rgba(255,255,255,0.2)',
          overflow: 'hidden',
          margin: '0 auto',
        }}
      >
        {/* Spokes for segment separation */}
        {Array.from({ length: SEGMENTS }).map((_, i) => {
          const angle = i * 72;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: 1,
                height: 90, // half the diameter of inner circle
                background: 'rgba(255,255,255,0.3)',
                transform: `translateX(-50%) rotate(${angle}deg)`,
                transformOrigin: 'bottom center',
                zIndex: 1,
              }}
            />
          );
        })}
        {/* Center circle */}
        <div
          style={{
            position: 'absolute',
            top: '53%',
            left: '50%',
            width: 30,
            height: 30,
            // background: 'rgba(255,255,255,1)',
            // background: 'rgba(255,255,255,0.8)',
            background: 'gray',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            // border: '1px solid #333',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        />
      </div>
    // </div>
  );
}

export default CircularRemote2;