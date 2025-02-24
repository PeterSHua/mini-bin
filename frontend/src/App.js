import { useEffect, useState } from "react";

import PayloadDetails from "./components/PayloadDetails";
import PayloadList from "./components/PayloadList";
import "./App.css";

import binService from "./services/bin";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function App() {
  let [binIds, setBinIds] = useState([]);
  let [payloads, setPayloads] = useState([]);
  let [displayedPayload, setDisplayPayload] = useState();
  let [url, setUrl] = useState();

  useEffect(() => {
    (async () => {
      try {
        let data = await binService.getAllBins();
        setBinIds(data.map((pair) => pair["endpoint"]));
      } catch {
        console.log("Couldn't fetch payloads");
      }
    })();
  }, []);

  async function onSelect(event) {
    let uuid = event.target.value;
    setDisplayPayload();
    if (uuid) {
      try {
        let data = await binService.getAllPayloads(uuid);
        setPayloads(data);
      } catch (error) {
        console.log("Couldn't fetch payloads");
      }
    }
  }

  async function createURL(event) {
    try {
      let data = await binService.createBin();
      setUrl(`https://psh.pp.ua/hook/${data}`);
    } catch (error) {
      console.log("URL not created");
    }
  }

  return (
    <div className="container">
      <PayloadList
        setDisplayPayload={setDisplayPayload}
        payloads={payloads}
      ></PayloadList>
      <PayloadDetails payload={displayedPayload}></PayloadDetails>
      <Form.Select aria-label="Default select example" onChange={onSelect}>
        <option></option>
        {binIds.map((bin) => {
          return <option>{bin}</option>;
        })}
      </Form.Select>
      <Button onClick={createURL}>Create Bin</Button>
      {url && <span className="url">{url}</span>}
    </div>
  );
}

export default App;
