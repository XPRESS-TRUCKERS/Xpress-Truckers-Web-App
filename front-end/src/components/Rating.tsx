import { useState, useEffect } from "react";
export const Rating = ({
  value,
  text = false,
  className = "",
}: {
  value: number | undefined;
  text?: boolean;
  className?: string;
}) => {
  let [rating, setRating] = useState<number>(0);
  useEffect(() => {
    try {
      setRating(Number(value));
    } catch (e: unknown) {}
  }, []);
  return (
    <span>
      {!value ? (
        <div></div>
      ) : (
        <div style={{ color: "var(--color-secondary)" }} className={`rating`}>
          {text && (
            <span>
              <b className={`${className}`}>Rating:</b>
            </span>
          )}
          &nbsp;
          <span>
            <i
              className={
                rating >= 1
                  ? "fa-solid fa-star"
                  : rating >= 0.5
                  ? "fa-solid fa-star-half-stroke"
                  : "fa-regular fa-star"
              }
            ></i>
          </span>
          <span>
            <i
              className={
                rating >= 2
                  ? "fa-solid fa-star"
                  : rating >= 1.5
                  ? "fa-solid fa-star-half-stroke"
                  : "fa-regular fa-star"
              }
            ></i>
          </span>
          <span>
            <i
              className={
                rating >= 3
                  ? "fa-solid fa-star"
                  : rating >= 2.5
                  ? "fa-solid fa-star-half-stroke"
                  : "fa-regular fa-star"
              }
            ></i>
          </span>
          <span>
            <i
              className={
                rating >= 4
                  ? "fa-solid fa-star"
                  : rating >= 3.5
                  ? "fa-solid fa-star-half-stroke"
                  : "fa-regular fa-star"
              }
            ></i>
          </span>
          <span>
            <i
              className={
                rating >= 5
                  ? "fa-solid fa-star"
                  : rating >= 4.5
                  ? "fa-solid fa-star-half-stroke"
                  : "fa-regular fa-star"
              }
            ></i>
          </span>
          <span> {text || ""} </span>
        </div>
      )}
    </span>
  );
};
