const fetchLaunchesMock = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            name: "BBB launch",
            date_utc: "2021-11-12T12:40:00.000Z",
            details: "some test details",
          },
          {
            name: "AAA launch",
            date_utc: "2021-09-16T00:02:00.000Z",
            details: "some other test details",
          },
        ]),
      100
    )
  );

export default fetchLaunchesMock;
