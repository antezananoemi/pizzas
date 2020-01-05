import Observer from "@researchgate/react-intersection-observer";
import React from "react";
import spinner from "../../assets/spinner.gif";

const Loading = ({ onChange, options = {} }) => {
  let handler = onChange || options.onChange;
  if (handler !== undefined) {
    return (
      <div className="empty text-gray">
        <Observer onChange={handler} rootMargin="0px" threshold={1}>
          <img
            src={spinner}
            style={{ width: "200px", margin: "auto", display: "block" }}
            alt="Loading..."
          />
        </Observer>
      </div>
    );
  }
  return (
    <div className="empty text-gray">
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};

export default Loading;
