import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Header from "../containers/Header";
import SapCar from "../screens/SapCar";

import { AuthContext } from "../context/AuthContext";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Returns from "../screens/Returns";
import Sales from "../screens/Sales";
import Reservation from "../screens/Reservation";

const RootRoute = () => {
  const { isLoggedIn, checkAuthState } = useContext(AuthContext);
  console.log(isLoggedIn);

  useEffect(() => {
    checkAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Header />
      <Box px="25px" pt="80px" pb="40px">
        {isLoggedIn ? (
          <>
            <Route exact path="/sales" component={Sales} />
            <Route exact path="/reservation" component={Reservation} />
            <Route exact path="/returns" component={Returns} />
            <Route exact path="/" component={Home} />
          </>
        ) : (
          <Switch>
            <Route component={Login} />
          </Switch>
        )}
      </Box>
    </Router>
  );
};

export default RootRoute;
