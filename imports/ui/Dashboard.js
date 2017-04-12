import React from "react";
import PrivateHeader from "./PrivateHeader";

export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
      <div className="page-content">
        Dashboard Page Content
      </div>
    </div>
  );
};
