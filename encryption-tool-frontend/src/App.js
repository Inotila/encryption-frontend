import React, { useState } from "react"; 
import "./App.css";

function App() {

    const [input, setInput] = useState(""); // For storing the input text
    const [key, setKey] = useState(""); // For storing the encryption/decryption key
    const [output, setOutput] = useState(""); // For storing the output (encrypted or decrypted text)
    const [error, setError] = useState(""); // For displaying any errors

    // Function to handle encryption
    const handleEncrypt = async () => {
        try {
            setError(""); // Clear any existing error messages
            //POST request to the backend API for encryption
            const response = await fetch("http://localhost:8080/api/encrypt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: input, key }), // Send input text and key in the request body
            });
            const data = await response.json(); // Parse the response as JSON
            if (response.ok) {
                // If the response is successful, set the output to the encrypted text
                setOutput(data.encryptedText);
            } else {
                // If there's an error, display it
                setError(data.error || "Error during encryption.");
            }
        } catch (err) {
            // If backend is unreachable show error
            setError("Unable to connect to the backend.");
        }
    };

    // Function to handle decryption
    const handleDecrypt = async () => {
        try {
            setError(""); // Clear any existing error messages
            // POST request to the backend API for decryption
            const response = await fetch("http://localhost:8080/api/decrypt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Indicate JSON data
                },
                body: JSON.stringify({ text: input, key }), // Send input text and key in the request body
            });
            const data = await response.json(); // Parse the response as JSON
            if (response.ok) {
                // If the response is successful, set the output to the decrypted text
                setOutput(data.decryptedText);
            } else {
                // If there's an error, display it
                setError(data.error || "Error during decryption.");
            }
        } catch (err) {
            // If backend is unreachable show error
            setError("Unable to connect to the backend.");
        }
    };

    return (
        <div className="App">
            <h1>Encryption/Decryption Tool</h1>
            <div>
                {/* Input text area */}
                <label>
                    Input Text:
                    <textarea
                        value={input} // Controlled component bound to input state
                        onChange={(e) => setInput(e.target.value)} // Update state on user input
                        rows="1"
                        cols="50"
                    />
                </label>
            </div>
            <div>
                {/* Key input */}
                <label>
                    Encryption Key (16 characters):
                    <input
                        type="text"
                        value={key} // Controlled component bound to key state
                        onChange={(e) => setKey(e.target.value)} // Update state on user input
                    />
                </label>
            </div>
            <div>
                <button onClick={handleEncrypt}>Encrypt</button>
                <button onClick={handleDecrypt}>Decrypt</button>
            </div>
            {error && <p className="error">{error}</p>}
            {/* Display the output if present */}
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