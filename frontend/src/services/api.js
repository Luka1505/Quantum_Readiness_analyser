export async function analyzeQuantumSuitability(formData) {
  const response = await fetch("http://127.0.0.1:9800/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return await response.json();
}
