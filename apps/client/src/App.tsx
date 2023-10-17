import { useEffect, useState } from "react";

function App() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    fetch("/api/v1")
      .then((res) => res.text())
      .then(setGreeting);
  }, []);

  return <main>{greeting}</main>;
}

export default App;
