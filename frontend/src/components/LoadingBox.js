import React from "react";

/* ==> spinner-icon <==
? - Animating spinner with: (fa-spin, fa-pulse), size icon: (fa-lg)
*/
export default function LoadingBox() {
  return (
    <div className="spinner loading">
      <span>
        <i className="fas fa-spinner fa-pulse fa-lg"></i>
      </span>
      <span>Loading...</span>
    </div>
  );
}
