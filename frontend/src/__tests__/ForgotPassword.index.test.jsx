import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from "vitest";
import userEvent from '@testing-library/user-event';

import Signup from '../views/ForgotPassword';

describe('Signup component', () => {
    it('renders initial step', async () => {
        const { getByText, getByPlaceholderText, getByRole } = render(<Signup />);

        // Check if the initial step is rendered
        expect(getByText("Enter Username")).toBeInTheDocument();
        expect(getByPlaceholderText("Username")).toBeInTheDocument();
        expect(getByRole("button", { name: "Next" })).toBeDisabled();

    });

    it('renders next step after clicking next button', async () => {
        const user = userEvent.setup();

        const { getByText, getByPlaceholderText, getByRole } = render(<Signup />);

        // Click next button
        const nextButton = getByRole("button", { name: "Next" })
        await user.click(nextButton);
        expect(nextButton).toBeDisabled();

        // Check if the next step is rendered
        await user.click(getByPlaceholderText("Username"));
        await user.keyboard("Tom2024");
        expect(nextButton).toBeEnabled();
        await user.click(nextButton);
        expect(getByText("Select Security Question")).toBeInTheDocument();
        
    });

    it('calls checkUsernameQuestion function and renders next step', async () => {
        const user = userEvent.setup();

        const { getByText, getByPlaceholderText, getByRole } = render(<Signup />);

        // Click next button
        const nextButton = getByRole("button", { name: "Next" })
        await user.click(nextButton);
        expect(nextButton).toBeDisabled();

        // Check if the next step is rendered
        await user.click(getByPlaceholderText("Username"));
        await user.keyboard("Tom2024");
        expect(nextButton).toBeEnabled();
        await user.click(nextButton);
        expect(getByText("Select Security Question")).toBeInTheDocument();

        // Select Security Question
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

});
