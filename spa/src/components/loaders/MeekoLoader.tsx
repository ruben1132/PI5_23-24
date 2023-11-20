import Image from 'next/image';
import styles from './meeko-loader.module.css';
import Container from 'react-bootstrap/Container';

export default function MeekoLoader() {
    return (
        <>
            <Container className={styles.pageContainer}>
                <div className={styles.loaderContainer}>
                    <Image src="/images/meeko.png" width={90} height={100} alt="Meeko" className={styles.spinImage} priority={true} />
                    <p>
                        Oh! Don&apos;t mind me here!
                        <br />
                        I&apos;m just making u company while we wait for this to load!
                    </p>
                </div>
            </Container>
        </>
    );
}
