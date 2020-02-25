import {
  ChannelSchedule,
  ChannelScheduleWithThumbnails,
  ProgramWithThumbnails
} from "./types";

export function getLiveProgramsWithThumbnails(
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

export const getRandomNumber = () => {
  return Math.floor(Math.random() * 400 + 200);
};
