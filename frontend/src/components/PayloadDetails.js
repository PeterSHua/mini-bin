import { Card } from "react-bootstrap";
import ReactJson from "react-json-view";

function PayloadDetails({ payload }) {
  if (payload) {
    return (
      <div className="payload">
        <Card>
          <Card.Body>
            <Card.Title>HTTP Request</Card.Title>
            <ReactJson src={JSON.parse(JSON.stringify(payload))}></ReactJson>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default PayloadDetails;

///We just need to retrieve from the database
