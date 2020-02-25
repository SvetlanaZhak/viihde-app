export interface Channel {
  id: number;
  name: string;
  recordable: boolean;
  recordableForAuthorized: boolean;
  scrambled: boolean;
  hiddenByUser: boolean;
}

export interface Catchup {
  programId: number;
  validFrom: string;
  validTo: string;
  validFromUTC: any;
  validToUTC: any;
  feature: string;
  drm: boolean;
}

export interface Program {
  id: number;
  name: string;
  status: string;
  startTime: string;
  endTime: string;
  startTimeUTC: any;
  endTimeUTC: any;
  lengthMinutes: number;
  isPopular: boolean;
  shortDescription: string;
  recordable: boolean;
  suggestedWildcardRules: string[];
  suggestedFolderNames: string[];
  channel: Channel;
  ageRating: string;
  catchup: Catchup;
}

export interface ProgramWithThumbnails extends Program {
  thumbnailUrl: string;
  thumbnails: Thumbnail[];
}

export interface Thumbnail {
  width: number;
  height: number;
  url: string;
}

export interface ChannelSchedule {
  programs: Program[];
  channel: Channel;
}

export interface ChannelScheduleWithThumbnails {
  programs: ProgramWithThumbnails[];
  channel: Channel;
}
