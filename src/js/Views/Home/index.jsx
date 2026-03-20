import React, { useState, useEffect, useRef, Fragment } from "react";
//import PropTypes from "prop-types";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setHomeSuccess, setHomeError } from "../../Redux/Reducers/home";
import { getHomeData, getHomeDataError } from "../../Redux/Selectors/home";
import { setHelloWorldSuccess, setHelloWorldError } from "../../Redux/Reducers/helloWorld";
import { getHelloWorldData, getHelloWorldDataError } from "../../Redux/Selectors/helloWorld";
//logics
import { homeLogics } from "../../Logics/home";
import { helloWorldLogic } from "../../Logics/helloWorld";
//components
import NavBar from "../../Components/Navs/NavBar";
import AnimatedProgressBar from "../../Components/Shared/Progress/Bar";
import Form from "../../Components/Form/Form";
//react-bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import { FaDog } from "react-icons/fa"; //font awesome
import { MdBugReport } from "react-icons/md"; //md icon

import "./Home.scss";

//init props
Home.propTypes = {};

export default function Home(props = {}) {
  const dispatch = useDispatch();
  const homeDataSuccess = useSelector(getHomeData);
  const homeDataError = useSelector(getHomeDataError);

  const helloWorldDataSuccess = useSelector(getHelloWorldData);
  const helloWorldDataError = useSelector(getHelloWorldDataError);


  //init states
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (!homeDataSuccess) {
      homeLogics({ successCallback, errorCallback }); //@params(callback, payload)
    } else {
      setLoader(false);
    }
  }, []);

  useEffect (() => {
    if (!helloWorldDataSuccess) {
      helloWorldLogic({successHelloWorldCallback, errorHelloWorldCallback})
    } else {
      setLoader(false);
    }
  }, [])

  function successCallback(data) {
    dispatch(setHomeSuccess(data));
    setLoader(false);
  }

 function errorCallback(error) {
    dispatch(setHomeError(error));
    setLoader(false);
  }

  function successHelloWorldCallback(data) {
    dispatch(setHelloWorldSuccess(data));
    setLoader(false);
  }

  function errorHelloWorldCallback(error) {
    dispatch(setHelloWorldError(error));
    setLoader(false);
  }
      

  function render() {
    return (
      <div className="mainWrapper">
        {
          loader ?
            <div className="verticalAlingWrapper"><AnimatedProgressBar /></div> :
            <Fragment>
              {
                homeDataSuccess?.success && helloWorldDataSuccess?.success &&
                <Fragment>
                  <NavBar />
                  <Container>
                    <Row>
                      <Col sm={8}><div>{homeDataSuccess?.data?.homeContent?.titulo}</div></Col>
                      <Col sm={8}><div>{helloWorldDataSuccess?.data?.message}</div></Col>
                    </Row>
                  </Container>
                </Fragment>
              }
              {
                !homeDataSuccess?.success && !homeDataError?.success && <Container>
                  <Row>
                    <Col sm={12}><div className="verticalAlingWrapper"><MdBugReport size={`4rem`} />{homeDataError?.error}</div></Col>
                  </Row>
                </Container>
              }
              {
                <Container>
                  <Form />
                </Container>
              }
              {
                !helloWorldDataSuccess?.data && !helloWorldDataError?.data && <Container>
                  <Row>
                    <Col sm={12}><div className="verticalAlingWrapper"><MdBugReport size={`4rem`} />{helloWorldDataError?.error}</div></Col>
                  </Row>
                </Container>
              }
            </Fragment>
        }
      </div>
    );
  }

  return render();
}
