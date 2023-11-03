import Spinner from "react-bootstrap/Spinner";

export default function SpinerLoader() {
  return (
    <>
      <br />
      <Spinner animation="border" role="status" >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p>Loading...</p>
    </>
  );
}
