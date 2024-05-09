import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from "vitest";
import userEvent from '@testing-library/user-event';

import RecordingPage from '../views/RecordingPage';

describe("RecordingPage/index component", () => {
    it('renders RecordingPage component', async () => {
        const user = userEvent.setup();

        const { getByText } = render(<RecordingPage />);
        expect(getByText("PROFILE")).toBeInTheDocument();
        expect(getByText("BASE CURRENCY")).toBeInTheDocument();
        expect(getByText("Income Records")).toBeInTheDocument();
        expect(getByText("LAST 5 EXCHANGE RECORDS")).toBeInTheDocument();
        expect(getByText("Expense Records")).toBeInTheDocument();
      });
});
