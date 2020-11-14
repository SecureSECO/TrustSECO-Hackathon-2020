import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import {
  getAllPackageIds,
  getPackageData,
  getFeaturedData,
  getAllPackageNames,
} from "../lib/packageData";
import data from "../testData/data.json";
import Searchbar from "../components/searchbar";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import FeaturedPackages from "../components/featuredPackages";
import Footer from "../components/footer";

export async function getStaticProps() {
  const featuredPackageData = getFeaturedData();
  const allPackages = getAllPackageNames();
  return {
    props: {
      featuredPackageData,
      allPackages,
    },
  };
}

export default class Trust extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }

  handleChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };
  handleSubmit = () => {
    if (this.state.searchValue) {
      alert("Searching for " + this.state.searchValue);
      event.preventDefault();
    }
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Head>
            <title>TrustSECO</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Container>
            <Row className={styles.content}>
              <Col
                offset={2}
                md={{ span: 10, offset: 1 }}
                className={styles.contentInside}
              >
                <main className={styles.main}>
                  <Jumbotron className={styles.headerJumbo}>
                    <h1 className={styles.title}>TrustSECO</h1>

                    <p className={styles.description}>
                      A project by{" "}
                      <a href="https://secureseco.org">SecureSECO</a>
                    </p>
                  </Jumbotron>
                  <Row className={styles.searchRow}>
                    <Searchbar packageNames={this.props.allPackages} />
                  </Row>
                  <div>
                    <FeaturedPackages
                      featuredPackageData={this.props.featuredPackageData}
                    />
                  </div>
                </main>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}
