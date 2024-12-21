export const extractDescription = (description) => {
    if (!description) return 'No description available.';
    const exampleIndex = description.toLowerCase().indexOf('example');
    if (exampleIndex === -1) return description; // No "Example" found
    return description.slice(0, exampleIndex).trim(); // Return everything before "Example"
  };
  
  export const formatExamples = (description) => {
    if (!description) return 'No examples available.';
    const exampleRegex = /Example\s+\d+:?/gi;
    const matches = description.match(exampleRegex);
    const examples = description.split(exampleRegex).slice(1);
  
    if (!matches || !examples.length) {
      return 'No examples available.';
    }
  
    return examples.map((example, index) => (
      <div key={index}>
        <h4>{matches[index]}</h4>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{example.trim()}</pre>
      </div>
    ));
  };