import { render, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from "vitest";

import Signup from "../views/SignUp/index";

describe("Signup component", async () => {

    it("renders with initial step - keeping in the first step", async () => {
        const user = userEvent.setup();

        const { getByRole, getByText } = render(<Signup />);
        expect(getByText("Enter Username")).toBeInTheDocument();

        const nextButton = getByRole("button", { name: "Next" });
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toBeDisabled();

        await user.click(nextButton);
        expect(nextButton).toBeDisabled();
    });

    it("renders with initial step - allowing to the next step", async () => {
        const user = userEvent.setup();

        const { getByRole, getByText, getByPlaceholderText } = render(<Signup />);
        const hintText = getByText("Enter Username");
        expect(hintText).toBeInTheDocument();

        const nextButton = getByRole("button", { name: "Next" });
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toBeDisabled();

        await user.click(getByRole("textbox", {placeholder: "Username"}));
        await user.keyboard("testuser999");

        await user.click(nextButton);
        // expect(nextButton).toBeEnabled();
        await user.click(hintText);
        expect(nextButton).toBeEnabled();

        await waitFor(()=> {
            expect(nextButton).toBeEnabled();
        });
        await user.click(nextButton);

        
        expect(getByText("Enter Password")).toBeInTheDocument();
        const nextButtonNew = getByRole("button", { name: "Next" });
        expect(nextButtonNew).toBeInTheDocument();
        expect(nextButtonNew).toBeDisabled();

        const backButton = getByRole("button", { name: "Back" });
        expect(backButton).toBeInTheDocument();
        expect(backButton).toBeEnabled();

        await user.click(getByPlaceholderText("Enter password"));
        await user.keyboard("123456");

        await user.click(getByPlaceholderText("Confirm password"));
        await user.keyboard("123456");

        expect(nextButtonNew).toBeEnabled();
        expect(backButton).toBeEnabled();

    });


    //   it("allows step navigation - going back", () => {
    //     const { getByText } = render(<Signup />);
    //    
    //     fireEvent.click(getByText("Previous")); // Previous button from SignupPassword component
    //     expect(getByText("Enter Username")).toBeInTheDocument();
    //   });

});
