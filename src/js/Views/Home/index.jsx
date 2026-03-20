import React, { useState, useEffect, Fragment } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setHomeSuccess, setHomeError } from "../../Redux/Reducers/home";
import { getHomeData, getHomeDataError } from "../../Redux/Selectors/home";
//logics
import { homeLogics } from "../../Logics/home";
//components
import NavBar from "../../Components/Navs/NavBar";
import AnimatedProgressBar from "../../Components/Shared/Progress/Bar";
import Banner from "../../Components/Banner/Banner";
import Carrusel from "../../Components/Carrusel/Carrusel";
import InformationSection from "../../Components/InformationSection/InformationSection";
import ContactForm from "../../Components/ContactForm/ContactForm";
import Footer from "../../Components/Footer/Footer";
//react-bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdBugReport } from "react-icons/md";

import "./Home.scss";

export default function Home() {
  const dispatch = useDispatch();
  const homeDataSuccess = useSelector(getHomeData);
  const homeDataError = useSelector(getHomeDataError);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (!homeDataSuccess) {
      homeLogics({ successCallback, errorCallback });
    } else {
      setLoader(false);
    }
  }, []);

  function successCallback(data) {
    dispatch(setHomeSuccess(data));
    setLoader(false);
  }

  function errorCallback(error) {
    dispatch(setHomeError(error));
    setLoader(false);
  }

  function render() {
    return (
      <div className="mainWrapper">
        {
          loader ?
            <div className="verticalAlingWrapper">
              <AnimatedProgressBar />
            </div>
          :
            <Fragment>
              {
                homeDataSuccess?.success &&
                <Fragment>
                  <NavBar />
                  <Banner data={homeDataSuccess?.data?.hero} />
                  <Carrusel data={homeDataSuccess?.data?.benefits} />
                  <InformationSection data={homeDataSuccess?.data?.informationSection} />
                  <ContactForm data={homeDataSuccess?.data?.contactSection} />
                  <Footer data={homeDataSuccess?.data?.footer} />
                </Fragment>
              }

              {
                !homeDataSuccess?.success && !homeDataError?.success &&
                <Container>
                  <Row>
                    <Col sm={12}>
                      <div className="verticalAlingWrapper">
                        <MdBugReport size={`4rem`} />
                        {homeDataError?.error}
                      </div>
                    </Col>
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