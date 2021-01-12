// Import lit-html functions
import { html, render, TemplateResult } from "lit-html";

function renderTurtlePanel(turtle: string): TemplateResult {
  let generateListener = (name: string) => {
    return async () => {
      await fetch(
        `http://51.146.6.229:6969/api/turtles/${turtle}?exec=${name}`,
        {
          method: "GET",
        }
      );
    };
  };

  return html` <div class="turtle-container">
    <button @click=${generateListener("dance")}>Make ${turtle} dance!</button>
  </div>`;
}

fetch("http://51.146.6.229:6969/api/turtles", { method: "GET" })
  .then((r) => r.json())
  .then((turtles: string[]) => {
    render(
      turtles.map((turtle: string) => renderTurtlePanel(turtle)),
      document.body
    );
  });
