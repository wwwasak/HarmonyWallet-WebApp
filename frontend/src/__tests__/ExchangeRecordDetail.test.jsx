import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, expect, it } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import ExchangeRecordDetail from "../views/ExchangeRecordDetail/ExchangeRecordDetail";

describe("ExchangeRecordDetail component", () => {
    const axiosMock = new MockAdapter(axios);

    afterEach(() => {
        axiosMock.reset();
    });

    it("renders exchange records correctly", async () => {

        const { getByText, getByRole } = render(<ExchangeRecordDetail />);

        expect(getByText("My Exchange Records")).toBeInTheDocument();
        expect(getByRole("button", { name: "Back" })).toBeInTheDocument();
        expect(getByRole("link", { name: "Back" })).toBeInTheDocument();

        expect(getByRole("button", { name: "Recent 1 Week" })).toBeInTheDocument();
        expect(getByRole("button", { name: "Recent 2 Weeks" })).toBeInTheDocument();
        expect(getByRole("button", { name: "Recent 1 Month" })).toBeInTheDocument();
        expect(getByRole("button", { name: "Recent 1 Year" })).toBeInTheDocument();
    });

    // it("handles click events correctly", async () => {
    //     const mockData = [{ amount: 100, date: "2024-04-28" }];
    //     axiosMock.onPost().reply(200, mockData);

    //     const { getByRole } = render(<ExchangeRecordDetail />);

    //     fireEvent.click(getByRole("button", { name: "Recent 1 Week" }));
    //     fireEvent.click(getByRole("button", { name: "Recent 2 Weeks" }));
    //     fireEvent.click(getByRole("button", { name: "Recent 1  Month" }));
    //     fireEvent.click(getByRole("button", { name: "Recent 1 Year" }));

    //     await waitFor(() => {
    //         expect(axiosMock.history.post.length).toBe(4);
    //     });
    // });
});
