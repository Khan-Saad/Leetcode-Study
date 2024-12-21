import React from 'react';

export function formatDescription(description) {
  if (!description) return "No description available";

  const desc = description.trim();
  const regex = /Example\s+(\d+):?/gi;
  const parts = desc.split(regex);

  // If no examples found, just return the description
  if (parts.length === 1) {
    return <p>{desc}</p>;
  }

  // parts looks like: [mainDescription, "1", example1Content, "2", example2Content, ...]
  const mainDescription = parts[0].trim();
  let content = [<p key="main">{mainDescription}</p>];

  // Iterate over pairs of (exampleNumber, exampleContent)
  for (let i = 1; i < parts.length; i += 2) {
    const exampleNumber = parts[i];
    const exampleContent = parts[i + 1] ? parts[i + 1].trim() : "";

    content.push(
      <h3 key={`example-title-${exampleNumber}`}>Example {exampleNumber}</h3>
    );
    content.push(
      <pre key={`example-content-${exampleNumber}`} style={{ whiteSpace: "pre-wrap" }}>
        {exampleContent}
      </pre>
    );
  }

  return <>{content}</>;
}