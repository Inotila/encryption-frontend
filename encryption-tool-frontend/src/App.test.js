import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders the app and handles input changes", () => {
    render(<App />);
    const inputField = screen.getByLabelText(/Input Text/i);
    fireEvent.change(inputField, { target: { value: "Hello" } });
    expect(inputField.value).toBe("Hello");

    const keyField = screen.getByLabelText(/Encryption Key/i);
    fireEvent.change(keyField, { target: { value: "1234567812345678" } });
    expect(keyField.value).toBe("1234567812345678");
});

test("renders Encrypt and Decrypt buttons", () => {
    render(<App />);
    expect(screen.getByText("Encrypt")).toBeInTheDocument();
    expect(screen.getByText("Decrypt")).toBeInTheDocument();
});
