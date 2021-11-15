import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./client/fetchLaunches");

const firstLaunchReturnedHtml = `12/11/2021, 12:40:00<br>BBB launch`;
const secondLaunchReturnedHtml = `16/09/2021, 01:02:00<br>AAA launch`;
const showDetailsButtonHtml = `<button>Show details</button>`;

describe("rendering list", () => {
  test("renders a list of launches", async () => {
    render(<App />);
    const items = await screen.findAllByRole("listitem");
    expect(items.length).toBe(2);
  });

  test("each launch should show launch name, date and details", async () => {
    render(<App />);
    const items = await screen.findAllByRole("listitem");
    expect((items[0].firstChild as HTMLElement).innerHTML).toBe(
      firstLaunchReturnedHtml + showDetailsButtonHtml
    );
  });
});

describe("sorting", () => {
  test("user can sort by launch name and date", async () => {
    // when page loads
    render(<App />);
    // items are in default order (reverse chronological)
    const items = await screen.findAllByRole("listitem");
    expect((items[0].firstChild as HTMLElement).innerHTML).toBe(
      firstLaunchReturnedHtml + showDetailsButtonHtml
    );
    expect((items[1].firstChild as HTMLElement).innerHTML).toBe(
      secondLaunchReturnedHtml + showDetailsButtonHtml
    );
    // when user selects sort by name
    const sortSelect = (await screen.findByRole(
      "combobox"
    )) as HTMLInputElement;
    fireEvent.change(sortSelect, { target: { value: "launchname" } });
    expect(sortSelect.value).toBe("launchname");
    // then the order is alphabetical by name
    const itemsAfterSortingByName = await screen.findAllByRole("listitem");
    expect(
      (itemsAfterSortingByName[0].firstChild as HTMLElement).innerHTML
    ).toBe(secondLaunchReturnedHtml + showDetailsButtonHtml);
    // when user selects sort by date
    fireEvent.change(sortSelect, { target: { value: "launchdate" } });
    // then the order is reverse chronological again
    const itemsAfterSortingByDate = await screen.findAllByRole("listitem");
    expect(
      (itemsAfterSortingByDate[0].firstChild as HTMLElement).innerHTML
    ).toBe(firstLaunchReturnedHtml + showDetailsButtonHtml);
  });
});

describe("clicking to see details", () => {
  test("user can click to see details", async () => {
    // when the page loads
    render(<App />);
    const items = await screen.findAllByRole("listitem");
    // then a button next to each launch says "Show details"
    expect((items[0]?.firstChild as HTMLElement).innerHTML).toBe(
      firstLaunchReturnedHtml + showDetailsButtonHtml
    );
    // when the user clicks the button
    const detailsButtons = await screen.findAllByRole("button");
    const firstButton = detailsButtons[0];
    fireEvent.click(firstButton);
    // then the details are shown
    expect((items[0]?.firstChild as HTMLElement).innerHTML).toBe(
      firstLaunchReturnedHtml +
        `<button>Hide details</button><p>some test details</p>`
    );
  });
});

describe("Filtering by name", () => {
  test("user can filter by name", async () => {
    // when the page loads
    render(<App />);
    const items = await screen.findAllByRole("listitem");
    // then the BBB launch is showing
    expect((items[0]?.firstChild as HTMLElement).innerHTML).toBe(
      firstLaunchReturnedHtml + showDetailsButtonHtml
    );
    // when the user types in the input
    const filterInput = await screen.findByRole("textbox");
    fireEvent.change(filterInput, { target: { value: "AAA" } });
    // then the BBB launch is no longer shown
    const itemsAfterFiltering = await screen.findAllByRole("listitem");
    expect((itemsAfterFiltering[0]?.firstChild as HTMLElement).innerHTML).toBe(
      secondLaunchReturnedHtml + showDetailsButtonHtml
    );
  });

  test("filtering is case-insensitive", async () => {    // when the page loads
    // when the user types in the input
    render(<App />);
    const filterInput = await screen.findByRole("textbox");
    fireEvent.change(filterInput, { target: { value: "aaa" } });
    // then the AAA launch is shown
    const itemsAfterFiltering = await screen.findAllByRole("listitem");
    expect((itemsAfterFiltering[0]?.firstChild as HTMLElement).innerHTML).toBe(
      secondLaunchReturnedHtml + showDetailsButtonHtml
    );
  });
});
