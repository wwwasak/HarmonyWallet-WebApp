import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, expect, it } from "vitest";

import RatesDetailPage from "../views/Detail/RatesDetailPage";

describe("RatesDetailPage component", () => {
  it("renders rate details correctly", () => {
    const { getByText } = render(<RatesDetailPage />);

    expect(getByText("Back")).toBeInTheDocument();
  });
});
