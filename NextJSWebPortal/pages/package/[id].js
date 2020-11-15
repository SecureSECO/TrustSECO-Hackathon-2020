import Head from "next/head";
import Link from "next/link";
import {
  getPackageData,
  getPackagePaths,
  getAllPackageIds,
} from "../../lib/packageData";
import Footer from "../../components/footer";
import styles from "../../styles/Home.module.css";
import { Container, Row, Col, Card, CardDeck } from "react-bootstrap";

export default function Package({ postData }) {
  try {
    if (
      postData &&
      postData.packageName != null &&
      postData.repository.url != null
    ) {
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
                    <Row>
                      <Col md={8}>
                        <Card>
                          <Card.Header>{postData.packageName}</Card.Header>
                          <Card.Body>
                            <Card.Subtitle>
                              {postData.description}
                            </Card.Subtitle>
                            <Card.Text>
                              Repository:{" "}
                              <Link href={postData.repository.url}>
                                <a>{postData.repository.url}</a>
                              </Link>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                        {/* <Card>
                          <Card.Header>Package versions</Card.Header>
                          <Card.Body>
                            <Card.Text>
                              {postData.versions.map((value, index) => {
                                return (
                                  <div>
                                    <p>
                                      Version: {value.versionNumber}
                                      <br></br>
                                      <span> {"  "}</span> trustscore:{" "}
                                      {value.trustScore}
                                    </p>
                                  </div>
                                );
                              })}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4}>
                        <Card>
                          <Card.Body>
                            <Link href="https://secureseco.github.io/Votingsystem/#/">
                              <a>Vote score</a>
                            </Link>
                          </Card.Body>{" "}
                        </Card>
                        <Card>
                          <Card.Header>
                            TrustScore <strong>{postData.trustScore}</strong>
                          </Card.Header>
                          <Card.Body>
                            <Card.Text>
                              <strong>Sourcerank:</strong>
                              <div>
                                basic_info_present:{" "}
                                {postData.sourceRank["basic_info_present"]}
                              </div>
                              <div>
                                repository_present:{" "}
                                {postData.sourceRank["repository_present"]}
                              </div>
                              <div>
                                readme_present:{" "}
                                {postData.sourceRank["readme_present"]}
                              </div>
                              <div>
                                license_present:{" "}
                                {postData.sourceRank["license_present"]}
                              </div>
                              <div>
                                versions_present:{" "}
                                {postData.sourceRank["versions_present"]}
                              </div>
                              <div>
                                follows_semver:{" "}
                                {postData.sourceRank["follows_semver"]}
                              </div>
                              <div>
                                recent_release:{" "}
                                {postData.sourceRank["recent_release"]}
                              </div>
                              <div>
                                not_brand_new:{" "}
                                {postData.sourceRank["not_brand_new"]}
                              </div>
                              <div>
                                one_point_oh:{" "}
                                {postData.sourceRank["one_point_oh"]}
                              </div>
                              <div>
                                dependent_projects:{" "}
                                {postData.sourceRank["dependent_projects"]}
                              </div>
                              <div>
                                dependent_repositories:{" "}
                                {postData.sourceRank["dependent_repositories"]}
                              </div>
                              <div>stars: {postData.sourceRank["stars"]}</div>
                              <div>
                                contributors:{" "}
                                {postData.sourceRank["contributors"]}
                              </div>
                              <div>
                                subscribers:{" "}
                                {postData.sourceRank["subscribers"]}
                              </div>
                              <div>
                                all_prereleases:{" "}
                                {postData.sourceRank["all_prereleases"]}
                              </div>
                              <div>
                                any_outdated_dependencies:{" "}
                                {
                                  postData.sourceRank[
                                    "any_outdated_dependencies"
                                  ]
                                }
                              </div>
                              <div>
                                is_deprecated:{" "}
                                {postData.sourceRank["is_deprecated"]}
                              </div>
                              <div>
                                is_unmaintained:{" "}
                                {postData.sourceRank["is_unmaintained"]}
                              </div>
                              <div>
                                is_removed: {postData.sourceRank["is_removed"]}
                              </div>
                            </Card.Text>
                          </Card.Body>
                        </Card> */}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}></Col>
                    </Row>
                    {/* <div>
                  <pre>{JSON.stringify(postData, undefined, 2)}</pre>
                </div> */}
                  </main>
                </Col>
              </Row>
            </Container>
          </div>
          <Footer />
        </div>
      );
    } else {
      return <div></div>;
    }
  } catch (err) {
    return <div></div>;
  }
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
