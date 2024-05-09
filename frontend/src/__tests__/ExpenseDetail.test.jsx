import { render, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, expect, it } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
 
import ExpenseDetail from "../views/ExpenseDetail/ExpenseDetail";
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

describe("ExpenseDetail component", () => {
    const axiosMock = new MockAdapter(axios);

    afterEach(() => {
        axiosMock.reset();
    });

    it("correctly renders expense details", async () => {
        const { getByText, getByRole } = render(
            <BaseCurrencyProviderMock>
                <ExpenseDetail />
            </BaseCurrencyProviderMock>
        );

        expect(getByText("My Expense Details")).toBeInTheDocument();

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

    // it("fetches and displays expense data", async () => {
    //     const mockWeeklyExpense = [{ amount: 100, date: "2024-04-28" }];
    //     const mockFortnightlyExpense = [{ amount: 200, date: "2024-04-21" }];
    //     const mockMonthlyExpense = [{ amount: 300, date: "2024-04-01" }];
    //     const mockYearlyExpense = [{ amount: 400, date: "2023-05-04" }];

    //     axiosMock.onPost().reply(200, mockWeeklyExpense);
    //     axiosMock.onPost().reply(200, mockFortnightlyExpense);
    //     axiosMock.onPost().reply(200, mockMonthlyExpense);
    //     axiosMock.onPost().reply(200, mockYearlyExpense);

    //     const { findByText } = render(
    //         <BaseCurrencyProviderMock>
    //             <ExpenseDetail />
    //         </BaseCurrencyProviderMock>
    //     );

    //     const weeklyExpense = await findByText("Recent 7 days");
    //     const fortnightlyExpense = await findByText("Recent 14 days");
    //     const monthlyExpense = await findByText("Recent 30 days");
    //     const yearlyExpense = await findByText("Recent 1 year");

    //     expect(weeklyExpense).toHaveTextContent("100");
    //     expect(fortnightlyExpense).toHaveTextContent("200");
    //     expect(monthlyExpense).toHaveTextContent("300");
    //     expect(yearlyExpense).toHaveTextContent("400");
    // });
});
