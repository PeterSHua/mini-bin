function PayloadList({ setDisplayPayload, payloads }) {
  function removeSelected() {
    [...document.querySelectorAll("li.http")].forEach((li) =>
      li.classList.remove("selected")
    );
  }

  function updateDisplay(event) {
    removeSelected();
    let string = event.target.textContent.split("/ ");
    let timeStamp = string[string.length - 1];
    let payload = payloads.filter(
      (payload) => payload.http_timestamp === timeStamp
    )[0];
    event.target.classList.add("selected");
    setDisplayPayload(payload.http_request);
  }

  return (
    <ul className="request">
      {payloads.map((request, index) => (
        <li key={index} onClick={updateDisplay} className="http">
          HTTP {request.http_request.method} / {request.http_timestamp}
        </li>
      ))}
    </ul>
  );
}

export default PayloadList;
