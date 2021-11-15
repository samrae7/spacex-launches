const fetchLaunches = async () => {
  const requestBody = {
    query: {
      date_utc: {
        $lte: new Date().toISOString(),
      },
    },
    options: {
      limit: 50,
      sort: { date_unix: "desc" },
      select: ["name", "date_utc", "details"],
    },
  };
  const response: Response = await fetch(
    "https://api.spacexdata.com/v4/launches/query",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    }
  );
  const data = await response.json();
  return data.docs;
};

export default fetchLaunches;
