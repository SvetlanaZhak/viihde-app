import * as React from "react";
import Clock from "react-live-clock";
import InputBase from "@material-ui/core/InputBase";
import Elisa from "../image/Elisa.png";
import SearchIcon from "@material-ui/icons/Search";
import { AppBar, Typography } from "@material-ui/core";
import styled from "styled-components";

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  align-items: center;
  text-align: center;
`;

interface Props {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export function SearchBar(props: Props) {
  return (
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
        <img src={Elisa} alt="Elisa" style={{ height: "55px" }} />
      </Typography>
      <Search>
        <SearchIcon />
        <InputBase
          {...props}
          style={{ color: "white", textAlign: "center", padding: "5px" }}
          placeholder="Search…"
        />
      </Search>

      <Clock format={"HH:mm:ss"} ticking={true} timezone={"Europe/Helsinki"} />
    </AppBar>
  );
}
