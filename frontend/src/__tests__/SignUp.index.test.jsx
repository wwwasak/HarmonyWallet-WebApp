import { render, waitFor } from "@testing-library/react";
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

    it("renders with initial step - allowing to the next step setting up a password", async () => {
        const user = userEvent.setup();

        const { getByRole, getByText, getByPlaceholderText } = render(<Signup />);
        const hintText = getByText("Enter Username");
        expect(hintText).toBeInTheDocument();

        const nextButton = getByRole("button", { name: "Next" });
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toBeDisabled();

        await user.click(getByRole("textbox", { placeholder: "Username" }));
        await user.keyboard("testuser999");

        await user.click(nextButton);
        // expect(nextButton).toBeEnabled();
        await user.click(hintText);
        expect(nextButton).toBeEnabled();

        await waitFor(() => {
            expect(nextButton).toBeEnabled();
        });
        await user.click(nextButton);


        expect(getByText("Enter Password")).toBeInTheDocument();
        const nextButtonSecond = getByRole("button", { name: "Next" });
        expect(nextButtonSecond).toBeInTheDocument();
        expect(nextButtonSecond).toBeDisabled();

        const backButton = getByRole("button", { name: "Back" });
        expect(backButton).toBeInTheDocument();
        expect(backButton).toBeEnabled();

        await user.click(getByPlaceholderText("Enter password"));
        await user.keyboard("123456");

        await user.click(getByPlaceholderText("Confirm password"));
        await user.keyboard("12345");

        //Two passwords do not match
        expect(nextButtonSecond).toBeDisabled();
        expect(backButton).toBeEnabled();
        expect(getByText("Two passwords do not match")).toBeInTheDocument();

        await user.click(getByPlaceholderText("Confirm password"));
        await user.keyboard("6");

        // Two passwords match
        expect(nextButtonSecond).toBeEnabled();
        expect(backButton).toBeEnabled();
        expect(getByText("Two passwords match")).toBeInTheDocument();

    });


    it("renders with initial step - allowing to the next step setting up a Security Question", async () => {
        const user = userEvent.setup();

        const { getByRole, getByText, getByPlaceholderText } = render(<Signup />);
        const hintText = getByText("Enter Username");
        expect(hintText).toBeInTheDocument();

        const nextButton = getByRole("button", { name: "Next" });
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toBeDisabled();

        await user.click(getByRole("textbox", { placeholder: "Username" }));
        await user.keyboard("testuser999");

        await user.click(nextButton);
        // expect(nextButton).toBeEnabled();
        await user.click(hintText);

        await waitFor(() => {
            expect(nextButton).toBeEnabled();
        });
        await user.click(nextButton);


        expect(getByText("Enter Password")).toBeInTheDocument();
        const nextButtonSecond = getByRole("button", { name: "Next" });
        expect(nextButtonSecond).toBeInTheDocument();
        expect(nextButtonSecond).toBeDisabled();

        const backButton = getByRole("button", { name: "Back" });
        expect(backButton).toBeInTheDocument();
        expect(backButton).toBeEnabled();

        await user.click(getByPlaceholderText("Enter password"));
        await user.keyboard("123456");

        await user.click(getByPlaceholderText("Confirm password"));
        await user.keyboard("123456");

        await waitFor(() => {
            expect(nextButtonSecond).toBeEnabled();
        });
        await user.click(nextButtonSecond);

        expect(getByText("Select Security Question")).toBeInTheDocument();
        const nextButtonThird = getByRole("button", { name: "Next" });
        expect(nextButtonThird).toBeInTheDocument();
        expect(nextButtonThird).toBeDisabled();

        const backButtonSecond = getByRole("button", { name: "Back" });
        expect(backButtonSecond).toBeInTheDocument();
        expect(backButtonSecond).toBeEnabled();

        // to select security question option
        await user.selectOptions(getByRole("combobox"), ["Q1"]);
        expect(getByRole('option', { name: "What is your mother's maiden name?" }).selected).toBe(true);

        // to check if the buttons' statuses are expected
        expect(nextButtonThird).toBeDisabled();
        expect(backButtonSecond).toBeEnabled();

        // to type an anwser for the selected security question
        await user.click(getByPlaceholderText("Answer"));
        await user.keyboard("McDonald1970$");

        // to check if the buttons' statuses are expected
        expect(nextButtonThird).toBeEnabled();
        expect(backButtonSecond).toBeEnabled();

    });

    it("allows step navigation - going back", async () => {
        const user = userEvent.setup();

        const { getByRole, getByText, getByPlaceholderText } = render(<Signup />);
        const hintText = getByText("Enter Username");
        expect(hintText).toBeInTheDocument();

        const nextButton = getByRole("button", { name: "Next" });
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toBeDisabled();

        await user.click(getByRole("textbox", { placeholder: "Username" }));
        await user.keyboard("testuser999");

        await user.click(nextButton);
        // expect(nextButton).toBeEnabled();
        await user.click(hintText);

        await waitFor(() => {
            expect(nextButton).toBeEnabled();
        });
        await user.click(nextButton);


        expect(getByText("Enter Password")).toBeInTheDocument();
        const nextButtonSecond = getByRole("button", { name: "Next" });
        expect(nextButtonSecond).toBeInTheDocument();
        expect(nextButtonSecond).toBeDisabled();

        const backButton = getByRole("button", { name: "Back" });
        expect(backButton).toBeInTheDocument();
        expect(backButton).toBeEnabled();

        await user.click(getByPlaceholderText("Enter password"));
        await user.keyboard("123456");

        await user.click(getByPlaceholderText("Confirm password"));
        await user.keyboard("123456");

        expect(backButton).toBeEnabled();
        await user.click(backButton);

        // to check if "Enter Username" appears and that specifies if going back works or not
        expect(getByText("Enter Username")).toBeInTheDocument();

    });

});
