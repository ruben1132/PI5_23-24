import Image from "next/image";
import styles from "./meeko-loader.module.css"; // Import the CSS module
import Container from 'react-bootstrap/Container';

export default function MeekoLoader() {
  return (
    <>
      <Container className={styles.pageContainer}>
        <div className={styles.loaderContainer}>
          <Image
            src="/meeko.png"
            width={80}
            height={100}
            alt="Meeko"
            className={styles.spinImage} // Pass the class name
          />
          <p>
            Oh! Don't mind me here!
            <br />
            I'm just making u company while we wait for this to load!{" "}
          </p>
        </div>
      </Container>
    </>
  );
}
