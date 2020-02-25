import useAxios, { ResponseValues } from "axios-hooks";
import { ChannelSchedule } from "../types";
import { AxiosPromise } from "axios";

export interface LiveProgramsResponse {
  timezone: string;
  schedule: ChannelSchedule[];
}

export const useLivePrograms = (): [
  ResponseValues<LiveProgramsResponse | undefined>,
  () => AxiosPromise<LiveProgramsResponse | undefined>
] => {
  const [responseValues, getData] = useAxios<LiveProgramsResponse | undefined>({
    url: `https://rest-api.elisaviihde.fi/rest/epg/schedule/live`,
    method: "GET"
  });
  return [responseValues, getData];
};
