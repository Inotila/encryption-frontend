import React, { useState } from "react";
import "./App.css";

function App() {
    const [input, setInput] = useState("");
    const [key, setKey] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    const handleEncrypt = async () => {
        try {
            setError(""); // Clear previous errors
            const response = await fetch("http://localhost:8080/api/encrypt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: input, key }),
            });
            const data = await response.json();
            if (response.ok) {
                setOutput(data.encryptedText);
            } else {
                setError(data.error || "Error during encryption.");
            }
        } catch (err) {
            setError("Unable to connect to the backend.");
        }
    };

    const handleDecrypt = async () => {
        try {
            setError(""); // Clear previous errors
            const response = await fetch("http://localhost:8080/api/decrypt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: input, key }),
            });
            const data = await response.json();
            if (response.ok) {
                setOutput(data.decryptedText);
            } else {
                setError(data.error || "Error during decryption.");
            }
        } catch (err) {
            setError("Unable to connect to the backend.");
        }
    };

    return (
        <div className="App">
            <h1>Encryption/Decryption Tool</h1>
            <div>
                <label>
                    Input Text:
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows="4"
                        cols="50"
                    />
                </label>
            </div>
            <div>
                <label>
                    Encryption Key (16 characters):
                    <input
                        type="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <button onClick={handleEncrypt}>Encrypt</button>
                <button onClick={handleDecrypt}>Decrypt</button>
            </div>
            {error && <p className="error">{error}</p>}
            {output && (
                <div>
                    <h3>Result:</h3>
                    <p>{output}</p>
                </div>
            )}
        </div>
    );
}

export default App;
