import React from 'react';
import styled from 'styled-components';

const Iconography = ({ faIcon, numIcons }) => {
  let icons;
  switch (numIcons) {
    case 1:
      icons = <Icon faIcon={faIcon} />;
      break;
    case 2:
      icons = (
        <span>
          <Icon
            faIcon={faIcon}
            style={{
              // XXX Improve the translateX calculation.
              transform: 'translateX(-40px) rotate(90deg)',
            }}
          />
          <Icon
            faIcon={faIcon}
            style={{
              // XXX Improve the translateX calculation.
              transform: 'translateX(40px)',
            }}
          />
        </span>
      );
      break;
    case 3:
      icons = (
        <span>
          <Icon
            faIcon={faIcon}
            style={{
              // XXX Improve the translateX calculation.
              transform: 'translateX(-80px) rotate(90deg)',
            }}
          />
          <Icon
            faIcon={faIcon}
            style={{
              // XXX Improve the translateX calculation.
              transform: 'rotate(-45deg)',
            }}
          />
          <Icon
            faIcon={faIcon}
            style={{
              // XXX Improve the translateX calculation.
              transform: 'translateX(80px)',
            }}
          />
        </span>
      );
      break;
  }

  return (
    <div
      className="text-center"
      style={{
        position: 'absolute',
        // XXX Improve this calculation.
        top: '80px',
      }}
    >
      <span
        className="fa-stack fa-lg"
        style={{
          fontSize: '500%',
          opacity: '0.2',
          // XXX Improve this calculation.
          transform: 'translateX( calc(( 308px / 2) - ( 160px / 2 )) )'
        }}
      >
        {icons}
      </span>
    </div>
  );
};

const Icon = ({ faIcon, style }) => (
  <i
    className={`fa fa-stack-2x ${faIcon}`}
    style={style}
  />
);

export default Iconography;
