import * as React from "react";
import styled from "styled-components";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { Card } from "@material-ui/core";
import { ProgramWithThumbnails } from "../types";
import { getRandomNumber } from "../utils";

const ProgramsView = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  /* background-image: linear-gradient(to top, #00c6fb 0%, #bce0ee 100%); */
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

interface Props {
  searchedPrograms: ProgramWithThumbnails[];
}

export function Programs(props: Props) {
  return (
    <ProgramsView>
      {props.searchedPrograms
        .filter((_, i) => i < 100)
        .map((program, idx) => (
          <Card
            key={idx}
            style={{
              margin: "18px",
              justifyContent: "space-around",
              width: "340px",
              height: "450px",
              backgroundImage:
                "linear-gradient(to bottom, #2f80ed, #2872d8, #2165c4, #1958b0, #104c9d)",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            {" "}
            <CardMedia
              image={
                // assume thumbnails always has three items in size order
                program.thumbnails && program.thumbnails[2].url
                  ? program.thumbnails[2].url
                  : `https://source.unsplash.com/random/${getRandomNumber()}x${getRandomNumber()}`
              }
              style={{ height: "220px" }}
            />
            <CardContent>
              <ProgramCard>
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
  );
}
