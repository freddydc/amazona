import React from "react";

export default function LoadingBox() {
    return (
        <div>
            {/*//* Animating icon spinner with: "fa-spin, fa-pulse", size icon: "fa-lg" */}
            <div className="spinner">
                <span>
                    <i className="fas fa-spinner fa-pulse fa-lg"></i> 
                </span>
                <span>Loading ...</span>
            </div>
        </div>
    );
}
