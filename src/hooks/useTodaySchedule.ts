import useAxios, { ResponseValues } from "axios-hooks";
import { ChannelScheduleWithThumbnails } from "../types";
import { AxiosPromise } from "axios";

const dumbChannelIds = Array(999)
  .fill(0)
  .map((_, i) => i + 1);

export interface TodayScheduleResponse {
  timezone: string;
  schedule: ChannelScheduleWithThumbnails[];
}

export const useTodaySchedule = (): [
  ResponseValues<TodayScheduleResponse | undefined>,
  () => AxiosPromise<TodayScheduleResponse | undefined>
] => {
  const today = new Date().toISOString().substring(0, 10);
  const [responseValues, getData] = useAxios<TodayScheduleResponse | undefined>(
    {
      url: `https://rest-api.elisaviihde.fi/rest/epg/schedule?channelId=${dumbChannelIds.join(
        ","
      )}&date=${today}`,
      method: "GET"
    }
  );
  return [responseValues, getData];
};
