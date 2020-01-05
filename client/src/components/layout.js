import React from "react";
import { connect } from "redux-bundler-react";
import Crash from "./crash";
import { getNavHelper } from "internal-nav-helper";
import NavBar from "./NavBar";
class Layout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error, errorInfo: errorInfo });
  }
  render() {
    const { route, doUpdateUrl } = this.props;

    const { error, errorInfo } = this.state;
    const hasError = error && errorInfo;

    const Page = route;

    return (
      <div onClick={getNavHelper(doUpdateUrl)}>
        <NavBar />
        <section className="landing">
          <div className="dark-overlay">
            <div className="landing-inner">
              <h1 className="x-large">Pizza Menu App</h1>
              <p className="lead">Build your ouw delicious pizza</p>
            </div>
          </div>
        </section>
        <section className="container">
          {hasError ? (
            <Crash
              summary="Something went wrong"
              error={error && error.toString()}
              errorInfo={errorInfo && errorInfo.componentStack}
              full
            />
          ) : (
            <Page />
          )}
        </section>
      </div>
    );
  }
}

export default connect("selectRoute", "selectPathname", "doUpdateUrl", Layout);
