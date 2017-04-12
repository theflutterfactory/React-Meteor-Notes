import React from "react";
import { Link } from "react-router";

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view--box" >
        <h1>Page Not Found</h1>
        <p>Hmmm, We were unable to find that page</p>
        <Link to="/" className="button button--link">HEAD HOME</Link>
      </div>
    </div>
  );
};
