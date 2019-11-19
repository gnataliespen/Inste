import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "semantic-ui-react";

const PrivateRoute = ({
  component: Component,
  user: { user, loading, isAuth },
  ...rest
}) => {
  if (loading) {
    return <Loader active />;
  }
  return (
    <Route
      {...rest}
      render={props =>
        !isAuth && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);
