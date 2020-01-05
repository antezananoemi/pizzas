import React, { useEffect } from "react";
import Loading from "../loading/";
import { connect } from "redux-bundler-react";
import Empty from "../empty";

const fetchToppings = async ({ doFetchToppings }) => {
  await doFetchToppings;
};
const handleClick = (id, props) => {
  props.doRemoveToppings({ id });
};
const ListToppings = props => {
  const { doFetchToppings, doClearToppings, toppingsIsLoading } = props;
  let toppings = props.toppingsData;

  useEffect(() => {
    fetchToppings(doFetchToppings());
    return () => {
      doClearToppings();
    };
  }, [doClearToppings, doFetchToppings]);
  if (toppingsIsLoading) {
    return <Loading />;
  }
  if (!props.toppingsData) {
    return <Empty />;
  }
  if (props.toppingsData.msg) {
    toppings = props.doFetchToppings();
    return <Empty />;
  }
  return (
    <>
      <h2 href="#" className="text-primary">
        List of Toppings
      </h2>
      <ul>
        {toppings.map(topping => (
          <li key={topping._id}>
            <a
              href="#"
              className="text-warning"
              onClick={() => handleClick(topping._id, props)}
              id={topping._id}
            >
              X
            </a>{" "}
            {topping.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default connect(
  "doFetchToppings",
  "doClearToppings",
  "selectToppingsData",
  "selectToppingsIsLoading",
  "doRemoveToppings",
  ListToppings
);
