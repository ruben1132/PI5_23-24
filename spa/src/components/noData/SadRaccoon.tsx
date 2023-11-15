import Image from 'next/image';
import Container from 'react-bootstrap/Container';

export default function SadRaccoon() {
    return (
        <>
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <Image src="/racNoData.png" width={200} height={150} alt="Meeko" priority={true} />
                    <br />
                    <br />
                    <h5>There is no data to show ):</h5>
                </div>
            </Container>
        </>
    );
}
