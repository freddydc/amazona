import React from "react";

export default function Rating(props) {
    const { set_rating, set_numReviews } = props;

    return (
        <div className="rating">
            <span>
                <i
                    className={
                        set_rating >= 1
                            ? "fa fa-star" // One star
                            : set_rating >= 0.5
                            ? "fa fa-star-half-alt" // Half star 50%
                            : "far fa-star" // Empty star
                    }
                ></i>
            </span>
            <span>
                <i
                    className={
                        set_rating >= 2
                            ? "fa fa-star"
                            : set_rating >= 1.5
                            ? "fa fa-star-half-alt"
                            : "far fa-star"
                    }
                ></i>
            </span>
            <span>
                <i
                    className={
                        set_rating >= 3
                            ? "fa fa-star"
                            : set_rating >= 2.5
                            ? "fa fa-star-half-alt"
                            : "far fa-star"
                    }
                ></i>
            </span>
            <span>
                <i
                    className={
                        set_rating >= 4
                            ? "fa fa-star"
                            : set_rating >= 3.5
                            ? "fa fa-star-half-alt"
                            : "far fa-star"
                    }
                ></i>
            </span>
            <span>
                <i
                    className={
                        set_rating >= 5
                            ? "fa fa-star"
                            : set_rating >= 4.5
                            ? "fa fa-star-half-alt"
                            : "far fa-star"
                    }
                ></i>
            </span>
            <span>{set_numReviews + " reviews"}</span>
        </div>
    );
}
