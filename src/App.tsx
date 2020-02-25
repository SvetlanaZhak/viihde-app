import * as React from "react";
import "./App.css";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import InputBase from "@material-ui/core/InputBase";
import Elisa from "./image/Elisa.png";
import SearchIcon from "@material-ui/icons/Search";
import { useLivePrograms } from "./hooks/useLivePrograms";
import styled from "styled-components";
import Clock from "react-live-clock";
import { AppBar, Typography, Card } from "@material-ui/core";
import {
  ChannelSchedule,
  ChannelScheduleWithThumbnails,
  ProgramWithThumbnails
} from "./types";
import { useTodaySchedule } from "./hooks/useTodaySchedule";

const ProgramsView = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  /* background-image: linear-gradient(to top, #00c6fb 0%, #bce0ee 100%); */
`;

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;

  align-items: center;
  text-align: center;
`;
const ProgramCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 200px;
  margin: -10px auto 30px auto;
  align-items: center;
  text-align: center;
`;

function getLiveProgramsWithThumbnails(
  liveSchedules: ChannelSchedule[],
  todaysSchedules: ChannelScheduleWithThumbnails[],
  popularity?: boolean
) {
  const liveProgramIds = liveSchedules.reduce<number[]>(
    (acc, schedule) => [...acc, ...schedule.programs.map(p => p.id)],
    []
  );
  return todaysSchedules.reduce<ProgramWithThumbnails[]>((acc, schedule) => {
    const channelPopulars = schedule.programs.filter(program => {
      const isLive = liveProgramIds.includes(program.id);
      const isReal = !program.name.startsWith("Testi ");
      return popularity === undefined
        ? isLive && isReal
        : isLive && isReal && popularity === program.isPopular;
    });
    return [...acc, ...channelPopulars];
  }, []);
}

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

  if (liveSchedulesError || todaySchedulesError) {
    return <div>Sorry, an error occured, please check back later..</div>;
  } else if (!searchedPrograms) {
    return <div>Loading...</div>;
  }
  console.log("render");
  const randomNumber = () => {
    const number = Math.floor(Math.random() * 400 + 200);
    console.log(number);
    return number;
  };

  return (
    <div>
      <AppBar
        style={{
          width: "100%",
          position: "static",
          height: "65px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#2145d1",
          padding: "0 20px",
          borderBottom: "3px solid #EF8633"
        }}
      >
        <Typography variant="h5">
          {" "}
          <img src={Elisa} alt="Elisa" style={{ height: "55px" }} />
          VIIHDE
        </Typography>
        <Search>
          <SearchIcon />
          <InputBase
            style={{ color: "white", textAlign: "center", padding: "5px" }}
            placeholder="Search…"
            value={search}
            onChange={event => {
              setSearch(event.target.value);
            }}
          />
        </Search>

        <Clock
          format={"HH:mm:ss"}
          ticking={true}
          timezone={"Europe/Helsinki"}
        />
      </AppBar>
      <Typography align="center" variant="h5" style={{ padding: "30px" }}>
        What is streaming now?
      </Typography>
      <ProgramsView>
        {searchedPrograms &&
          searchedPrograms
            .filter((_, i) => i < 100)
            .map((program, idx) => (
              <Card
                style={{
                  margin: "18px",
                  justifyContent: "space-around",
                  width: "340px",

                  height: "450px",
                  //backgroundColor: "rgba(239, 134, 51, 0.8)",
                  // backgroundColor: "#2145d1",
                  // color: "white",
                  backgroundImage:
                    "linear-gradient(to bottom, #2f80ed, #2872d8, #2165c4, #1958b0, #104c9d)",

                  // height: "fit-content",

                  alignItems: "center",
                  textAlign: "center"
                }}
              >
                {" "}
                <CardMedia
                  image={
                    program.thumbnails && program.thumbnails[2].url
                      ? program.thumbnails[2].url
                      : `https://source.unsplash.com/random/${randomNumber()}x${randomNumber()}`
                  }
                  style={{ height: "220px" }}

                  // image={program.thumbnails && program.thumbnails[2].url}
                />
                <CardContent>
                  <ProgramCard key={idx}>
                    <h3 style={{ color: "white" }}>{program.name}</h3>
                    <div>
                      <div>
                        {" "}
                        <b>Channel: </b> {program.channel.name}
                      </div>
                      <div>
                        {" "}
                        <b>Starting time:</b>{" "}
                        {program.startTime.split(" ").splice(-1)[0]}
                      </div>
                      <div>
                        {" "}
                        <b>Duration: </b> {program.lengthMinutes} min
                      </div>
                    </div>
                  </ProgramCard>
                </CardContent>
              </Card>
            ))}
      </ProgramsView>
    </div>
  );
}

export default App;
