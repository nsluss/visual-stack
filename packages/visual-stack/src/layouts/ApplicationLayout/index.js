import React from 'react';
import R from 'ramda';
import './style.css';

const ApplicationLayout = ({ sideNav, sideNavState, slidingPanelState, children }) => {
  const sideNavStyles = (sideNavState || R.isNil(sideNavState)) ? 'application-layout-side' : 'application-layout-side-collapsed';
  const filterStyles = (slidingPanelState) ? 'application-layout-filter' : 'application-layout-filter-collapsed';
  return (
      <div className="application-layout">
        <div className="application-layout-container">
          <div className={sideNavStyles}>
            { sideNav }
          </div>
          <div className="application-layout-content">
            { children }
          </div>
          <div className={filterStyles}>
          </div>
        </div>
    </div>
  );
};

export default ApplicationLayout;

