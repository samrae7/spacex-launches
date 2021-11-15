import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./client/fetchLaunches");

test("renders a list of launches", async () => {
  render(<App />);
  const items = await screen.findAllByRole("listitem");
  expect(items.length).toBe(2);
});

test("each launch should show launch name, date and details", async () => {
  render(<App />);
  const items = await screen.findAllByRole("listitem");
  expect(items[0].innerHTML).toBe(
    "2021-11-12T12:40:00.000Z<br>BBB launch<br>some test details"
  );
});

describe("sorting", () => {
  test("user can sort by launch name and date", async () => {
    // when app loads
    render(<App />);
    // items are in default order (reverse chronological)
    const items = await screen.findAllByRole("listitem");
    expect(items[0].innerHTML).toBe(
      "2021-11-12T12:40:00.000Z<br>BBB launch<br>some test details"
    );
    expect(items[1].innerHTML).toBe(
      "2021-09-16T00:02:00.000Z<br>AAA launch<br>some other test details"
    );
    // when user selects sort by name
    const sortSelect = (await screen.findByRole(
      "combobox"
    )) as HTMLInputElement;
    fireEvent.change(sortSelect, { target: { value: "launchname" } });
    expect(sortSelect.value).toBe("launchname");
    // then the order is alphabetical by name
    const itemsAfterSortingByName = await screen.findAllByRole("listitem");
    expect(itemsAfterSortingByName[0].innerHTML).toBe(
      "2021-09-16T00:02:00.000Z<br>AAA launch<br>some other test details"
    );
    // when user selects sort by date
    fireEvent.change(sortSelect, { target: { value: "launchdate" } });
    // the the order is reverse chronological again
    const itemsAfterSortingByDate = await screen.findAllByRole("listitem");
    expect(itemsAfterSortingByDate[0].innerHTML).toBe(
      "2021-11-12T12:40:00.000Z<br>BBB launch<br>some test details"
    );
  });
});
