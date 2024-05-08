import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from 'react-router-dom';
import LoginBox from "../views/Login/components/LoginBox";

describe("LoginBox component", async () => {

    it("handles login form input and button clicks", async () => {
        const setUsername = vi.fn();
        const setPassword = vi.fn();
        const handleLogin = vi.fn();

        const { getByPlaceholderText, getByRole, getByText } = render(
            <MemoryRouter>
                <LoginBox setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
            </MemoryRouter>
        );

        const usernameInput = getByPlaceholderText("Username");
        const passwordInput = getByPlaceholderText("Password");
        const loginButton = getByRole("button", { name: "Log In" });
        const signupButton = getByRole("button", { name: "Sign Up" });

        // Simulate user input
        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(passwordInput, { target: { value: "password" } });

        // Simulate button clicks
        fireEvent.click(loginButton);
        fireEvent.click(signupButton);

        // Assertions
        expect(setUsername).toHaveBeenCalledWith("testuser");
        expect(setPassword).toHaveBeenCalledWith("password");
        expect(handleLogin).toHaveBeenCalled();
    });

});
