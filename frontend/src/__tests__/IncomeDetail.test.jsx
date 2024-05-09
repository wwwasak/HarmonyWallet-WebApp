import { render, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, expect, it } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import IncomeDetailsPage from "../views/IncomeDetail/IncomeDetail";
import { BaseCurrencyContext } from "../stores/BaseCurrencyContext";

const useCurrencyMock = vi.fn(() => ({
    baseCurrency: "USD",
    setBaseCurrency: true
}));

const BaseCurrencyProviderMock = ({ children }) => (
    <BaseCurrencyContext.Provider value={useCurrencyMock}>
        {children}
    </BaseCurrencyContext.Provider>
);

describe("IncomeDetail component", () => {
    const axiosMock = new MockAdapter(axios);

    afterEach(() => {
        axiosMock.reset();
    });

    it("correctly renders expense details", async () => {
        const { getByText, getByRole } = render(
            <BaseCurrencyProviderMock>
                <IncomeDetailsPage />
            </BaseCurrencyProviderMock>
        );

        expect(getByText("My Income Details")).toBeInTheDocument();

        expect(getByRole("button", { name: "Back" })).toBeInTheDocument();

        expect(getByRole("button", { name: "Select" })).toBeInTheDocument();

        expect(getByRole("tab", { name: "Recent 7 days" })).toBeInTheDocument();
        expect(getByRole("tab", { name: "Recent 14 days" })).toBeInTheDocument();
        expect(getByRole("tab", { name: "Recent 30 days" })).toBeInTheDocument();
        expect(getByRole("tab", { name: "Recent 1 year" })).toBeInTheDocument();

        fireEvent.click(getByRole("button", { name: "Back" }));

        await waitFor(() => {
            expect(window.location.pathname).toBe("/");
        });

    });

});
