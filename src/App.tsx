import * as React from "react";

import { useLivePrograms } from "./hooks/useLivePrograms";
import { Typography } from "@material-ui/core";
import { ProgramWithThumbnails } from "./types";
import { useTodaySchedule } from "./hooks/useTodaySchedule";
import { SearchBar } from "./components/SearchBar";
import { Programs } from "./components/Programs";
import { getLiveProgramsWithThumbnails } from "./utils";

function App() {
  const [
    { data: liveSchedules, error: liveSchedulesError }
  ] = useLivePrograms();
  const [
    { data: todaySchedules, error: todaySchedulesError }
  ] = useTodaySchedule();
  const [search, setSearch] = React.useState("");
  const [searchedPrograms, setSearchedPrograms] = React.useState<
    ProgramWithThumbnails[] | undefined
  >();

  React.useEffect(() => {
    if (liveSchedules && todaySchedules) {
      const livePrograms = getLiveProgramsWithThumbnails(
        liveSchedules.schedule,
        todaySchedules.schedule
      );
      if (search) {
        setSearchedPrograms(
          livePrograms.filter(e =>
            e.name.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else {
        setSearchedPrograms(livePrograms);
      }
    }
  }, [liveSchedules, todaySchedules, search]);

  let headline = `What's streaming now?`;
  if (liveSchedulesError || todaySchedulesError) {
    headline = "Sorry, an error occured, please check back later..";
  } else if (!searchedPrograms) {
    headline = "Loading...";
  }

  return (
    <div>
      <SearchBar
        value={search}
        onChange={event => {
          setSearch(event.target.value);
        }}
      />
      <Typography align="center" variant="h5" style={{ padding: "30px" }}>
        {headline}
      </Typography>
      {searchedPrograms && <Programs searchedPrograms={searchedPrograms} />}
    </div>
  );
}

export default App;
