import Head from "next/head";
import Link from "next/link";
import {
  getPackageData,
  getPackagePaths,
  getAllPackageIds,
} from "../../lib/packageData";
import Footer from "../../components/footer";
import styles from "../../styles/Home.module.css";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";

export default function Package({ postData }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Head>
          <title>TrustSECO</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <Row className={styles.content}>
            <Link href="/">
              <a>
                <h2>TrustSECO</h2>
              </a>
            </Link>
            <Col
              offset={2}
              md={{ span: 10, offset: 1 }}
              className={styles.contentInside}
            >
              <main className={styles.main}>
                <div>{/* {postData.title} */}</div>
                <div>{/* {postData.trustScore} */}</div>
                <div>{JSON.stringify(postData, undefined, 2)}</div>
              </main>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllPackageIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPackageData(params.id);
  return {
    props: { postData },
  };
}
