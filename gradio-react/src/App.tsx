import { useRef, useState } from "react";
import "./App.css";
import { client } from "@gradio/client";

function App() {
  const [message, setMessage] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const getMessage = async (text: string) => {
    const app = await client("http://localhost:7860/", {});
    app
      .submit("/chat", [
        text,
        "", // string  in 'Message' Textbox component
      ])
      .on("data", (data) => {
        const messages = data.data as string[];
        if (messages?.length) {
          setMessage(messages[0]);
        }
        console.log(data);
      });
  };

  return (
    <div style={{ width: "100%" }}>
      <div>
        <p>{message}</p>
      </div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (ref.current?.value) {
            getMessage(ref.current.value);
            ref.current.value = "";
          }
        }}
        style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
      >
        <input
          style={{ padding: "0.25rem 0.5rem" }}
          ref={ref}
          type="text"
          placeholder="what is your question?"
        />
        <button type="submit">SEND!</button>
      </form>
    </div>
  );
}

export default App;
