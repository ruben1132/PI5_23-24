import Image from "next/image";
import styles from "./meeko-loader.module.css"; // Import the CSS module

export default function MeekoLoader() {
  return (
    <>
      <br />
      <Image
        src="/meeko.png"
        width={100}
        height={70}
        alt="Meeko"
        className={styles.spinImage} // Pass the class name
      />
      <p>Oh! Don't mind me here!<br/>I'm just making u company while we wait for this to load! </p>
    </>
  );
}
