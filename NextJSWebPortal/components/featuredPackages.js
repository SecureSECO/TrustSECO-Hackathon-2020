import { Container, Row, Col } from "react-bootstrap";
import { Card, CardDeck } from "react-bootstrap";
import Link from "next/link";
import styles from "./featuredPackages.module.css";

export default function FeaturedPackages({ featuredPackageData }) {
  return (
    <CardDeck>
      {featuredPackageData.map((p) => {
        return (
          // console.log("item:", p.title )
          // <div>{p.title}</div>
          <Card className={styles.featureCard}>
            <Card.Body>
              <Card.Title>{p.packageName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Trustscore: {p.trustScore}
              </Card.Subtitle>
              {/* <Card.Text>{p.description}</Card.Text> */}
              <Link href={`/package/${p.packageName.toLowerCase()}`}>
                <Card.Link>View package trust</Card.Link>
              </Link>
            </Card.Body>
          </Card>
        );
      })}
    </CardDeck>
  );
}
