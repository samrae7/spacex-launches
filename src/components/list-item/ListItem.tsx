import React, { useState } from "react";
import { Launch } from "../../App";

export default ({ date_utc, name, details }: Launch) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div>
      {date_utc}
      <br />
      {name}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide details" : "Show details"}
      </button>
      {showDetails && <p>{details || "No details yet"}</p>}
    </div>
  );
};
