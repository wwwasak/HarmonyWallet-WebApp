import { render, fireEvent, waitFor } from "@testing-library/react";
import ExchangeRecordDetail from "../views/ExchangeRecordDetail/ExchangeRecordDetail";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("ExchangeRecordDetail component", () => {
    const axiosMock = new MockAdapter(axios);

    afterEach(() => {
        axiosMock.reset();
    });

    it("renders exchange records correctly", async () => {

        const { getByText, getByRole } = render(<ExchangeRecordDetail />);

        expect(getByText("My Exchange Records")).toBeDefined();
        expect(getByRole("button", { name: "Back" })).toBeDefined();
        expect(getByRole("link", { name: "Back" })).toBeDefined();

        expect(getByRole("button", { name: "One Week" })).toBeDefined();
        expect(getByRole("button", { name: "Two Weeks" })).toBeDefined();
        expect(getByRole("button", { name: "One Month" })).toBeDefined();
        expect(getByRole("button", { name: "One Year" })).toBeDefined();
    });

    // it("handles click events correctly", async () => {
    //     const mockData = [{ amount: 100, date: "2024-04-28" }];
    //     axiosMock.onPost().reply(200, mockData);

    //     const { getByRole } = render(<ExchangeRecordDetail />);

    //     fireEvent.click(getByRole("button", { name: "One Week" }));
    //     fireEvent.click(getByRole("button", { name: "Two Weeks" }));
    //     fireEvent.click(getByRole("button", { name: "One Month" }));
    //     fireEvent.click(getByRole("button", { name: "One Year" }));

    //     await waitFor(() => {
    //         expect(axiosMock.history.post.length).toBe(4);
    //     });
    // });
});
