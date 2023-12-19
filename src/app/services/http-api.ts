export const PANDASCORE_CONFIG = 'https://api.pandascore.co/dota2/matches/';
export const OPENDOTA_CONFIG = 'https://api.opendota.com/api/';
export const NEPTUNE_CONFIG = 'https://neptune.1337pro.com/';
export class ApiPandaScore {
    static topMatch = `${PANDASCORE_CONFIG}upcoming?sort=begin_at&page[size]=1`;
    static upcomingMatches = `${PANDASCORE_CONFIG}upcoming?sort=begin_at&page[size]=3`;
    static liveMatches = `${PANDASCORE_CONFIG}?search[status]=running`;
}
export class OpenDota {
    static recentMatches = `${OPENDOTA_CONFIG}proMatches`;
}

export class NeptuneApi {
    static liveMatches = `${NEPTUNE_CONFIG}series/grouped/all-and-live`;
    static recentMatches = `${NEPTUNE_CONFIG}series/grouped/all`;
    static detailSerieMatch = `${NEPTUNE_CONFIG}series/`;
    static detailGameMatch = `${NEPTUNE_CONFIG}matches/`;
    static teams = `${NEPTUNE_CONFIG}teams/`;
    static listPlayers = `${NEPTUNE_CONFIG}rosters?ids=`;
}