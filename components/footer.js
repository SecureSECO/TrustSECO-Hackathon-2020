import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-content"]}>
        <Col md={3}>
          <div className={styles["footer-slogan"]}>
            <h4>TrustSECO 2020</h4>
            <p>
              A project by <a href="https://secureseco.org">SecureSECO</a>
            </p>
          </div>
        </Col>
        <Col md={3}>
          <h4>Links</h4>
          <ul>
            <li>
              <Link href="https://github.com/SecureSECO/TrustSECO">
                <a>Github</a>
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com/SecoTrust">
                <a>Twitter</a>
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/company/trustseco/">
                <a>LinkeIn</a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col md={3}></Col>
      </div>
    </footer>
  );
}
