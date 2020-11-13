import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import {
  InputGroup,
  FormControl,
  Button,
  Card,
  CardDeck,
} from "react-bootstrap";
// import getPackageData from "../lib/packageData";
import data from "../testData/data.json";
import Autosuggest from "react-autosuggest";
import Searchbar from "../components/searchbar";
import { Container, Row, Col } from "react-bootstrap";

export async function getStaticProps() {
  const featuredPackageData = data;
  const allPackages = ["React", "Vue", "Mocha"];
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

  featuredPackages() {
    return (
      <CardDeck>
        {this.props.featuredPackageData.map((p) => {
          return (
            // console.log("item:", p.title )
            // <div>{p.title}</div>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{p.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Trustscore: {p.trustScore}
                </Card.Subtitle>
                <Card.Text>
                  {p.dependencies.map((dp) => {
                    return <span>{dp.dependency} </span>;
                  })}
                </Card.Text>
                <Link href={`/package/${p.title.toLowerCase()}`}>
                  <Card.Link>View package trust</Card.Link>
                </Link>
              </Card.Body>
            </Card>
          );
        })}
      </CardDeck>
    );
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
      <div className={styles.container}>
        <Head>
          <title>TrustSECO</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <Row>
            <Col offset={2} md={{ span: 10, offset: 1 }}>
              <main className={styles.main}>
                <h1 className={styles.title}>TrustSECO</h1>

                <p className={styles.description}>
                  A project by <a href="https://secureseco.org">SecureSECO</a>
                </p>

                <Searchbar />

                <div>{this.featuredPackages()}</div>
              </main>

              <footer className={styles.footer}></footer>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
