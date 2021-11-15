import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./client/fetchLaunches");

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
      "2021-11-12T12:40:00.000Z<br>BBB launch<button>Show details</button>"
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
      "2021-11-12T12:40:00.000Z<br>BBB launch<button>Show details</button>"
    );
    expect((items[1].firstChild as HTMLElement).innerHTML).toBe(
      "2021-09-16T00:02:00.000Z<br>AAA launch<button>Show details</button>"
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
    ).toBe(
      "2021-09-16T00:02:00.000Z<br>AAA launch<button>Show details</button>"
    );
    // when user selects sort by date
    fireEvent.change(sortSelect, { target: { value: "launchdate" } });
    // then the order is reverse chronological again
    const itemsAfterSortingByDate = await screen.findAllByRole("listitem");
    expect(
      (itemsAfterSortingByDate[0].firstChild as HTMLElement).innerHTML
    ).toBe(
      "2021-11-12T12:40:00.000Z<br>BBB launch<button>Show details</button>"
    );
  });
});

describe("clicking to see details", () => {
  test("user can click to see details", async () => {
    // when the page loads
    render(<App />);
    const items = await screen.findAllByRole("listitem");
    // then a button next to each launch says "Show details"
    expect((items[0]?.firstChild as HTMLElement).innerHTML).toBe(
      "2021-11-12T12:40:00.000Z<br>BBB launch<button>Show details</button>"
    );
    // when the user clicks the button
    const detailsButtons = await screen.findAllByRole("button");
    const firstButton = detailsButtons[0];
    fireEvent.click(firstButton);
    // then the details are shown
    expect((items[0]?.firstChild as HTMLElement).innerHTML).toBe(
      "2021-11-12T12:40:00.000Z<br>BBB launch<button>Hide details</button><p>some test details</p>"
    );
  });
});
