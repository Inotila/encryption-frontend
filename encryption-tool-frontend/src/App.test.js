import { render, screen, fireEvent } from "@testing-library/react"; // Functions for rendering and testing React components
import App from "./App"; // Importing the main App component

// Test case 1: Ensure the app renders correctly and handles user input changes
test("renders the app and handles input changes", () => {
    render(<App />); // Render the App component in a virtual DOM

    // Find the input field for text by its label
    const inputField = screen.getByLabelText(/Input Text/i);
    // Simulate user typing "Hello" into the input field
    fireEvent.change(inputField, { target: { value: "Hello" } });
    // Assert that the input field's value has updated correctly
    expect(inputField.value).toBe("Hello");

    // Find the key input field by its label
    const keyField = screen.getByLabelText(/Encryption Key/i);
    // Simulate a user typing a 16-character key into the key field
    fireEvent.change(keyField, { target: { value: "1234567812345678" } });
    // Assert that the key field's value has updated correctly
    expect(keyField.value).toBe("1234567812345678");
});

// Test case 2: Ensure the Encrypt and Decrypt buttons render properly
test("renders Encrypt and Decrypt buttons", () => {
    render(<App />); // Render the App component in a virtual DOM

    // Assert that the "Encrypt" button is present in the rendered output
    expect(screen.getByText("Encrypt")).toBeInTheDocument();
    // Assert that the "Decrypt" button is present in the rendered output
    expect(screen.getByText("Decrypt")).toBeInTheDocument();
});
