import React, { useEffect } from "react";
import Loading from "../loading/";
import { connect } from "redux-bundler-react";
import Empty from "../empty";
const defaultImage =
  "https://media.gettyimages.com/photos/high-angle-view-of-pizza-on-table-picture-id1070066930?s=2048x2048";
const fetchPizzaDetail = async ({ doFetchPizzaDetail }) => {
  await doFetchPizzaDetail;
};
const PizzaDetail = props => {
  const {
    doFetchPizzaDetail,
    doClearPizzaDetail,
    pizzaDetailIsLoading,
    pizzaDetail
  } = props;
  useEffect(() => {
    fetchPizzaDetail(doFetchPizzaDetail());

    return () => {
      doClearPizzaDetail();
    };
  }, [doFetchPizzaDetail, doClearPizzaDetail]);

  if (pizzaDetailIsLoading) {
    return <Loading />;
  }
  if (!pizzaDetail) {
    return <Empty />;
  }
  const { name, picture, toppings = [] } = pizzaDetail;
  let areTop;
  if (toppings[0]) {
    areTop = Object.values(toppings[0]).map(topping => {
      return (
        <div className="p-1" key={topping._id}>
          <i className="fa fa-check" /> {topping.name}
        </div>
      );
    });
  }
  return (
    <div className="profile-grid">
      <div className="profile-top bg-primary p-2">
        <img className="round-img" src={picture || defaultImage} alt="" />
        <h1 className="large">{name}</h1>
      </div>
      <div className="profile-about bg-light">
        <h2 className="text-primary">Toppings</h2>
        <div className="skills">{areTop}</div>
      </div>
    </div>
  );
};
export default connect(
  "doFetchPizzaDetail",
  "selectPizzaDetail",
  "doClearPizzaDetail",
  "selectPizzaDetailIsLoading",

  React.memo(PizzaDetail)
);
