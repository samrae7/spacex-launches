const fetchLaunchesMock = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            id: "a1",
            name: "BBB launch",
            date_utc: "2021-11-12T12:40:00.000Z",
            details: "some test details",
          },
          {
            id: "2",
            name: "AAA launch",
            date_utc: "2021-09-16T00:02:00.000Z",
            details: "some other test details",
          },
        ]),
      100
    )
  );

export default fetchLaunchesMock;
