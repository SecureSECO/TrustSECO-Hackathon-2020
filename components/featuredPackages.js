import { Container, Row, Col } from "react-bootstrap";
import {
  InputGroup,
  FormControl,
  Button,
  Card,
  CardDeck,
} from "react-bootstrap";


export default FeaturedPackages() {
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