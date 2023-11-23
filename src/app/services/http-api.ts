export const PANDASCORE_CONFIG = 'https://api.pandascore.co/dota2/matches/';
export const OPENDOTA_CONFIG = 'https://api.opendota.com/api/';
export const NEPTUNE_CONFIG = 'https://neptune.1337pro.com/series/grouped/all?start_after=1700629200000&start_before=1700715599999&game_ids=1';
export class ApiPandaScore {
    static topMatch = `${PANDASCORE_CONFIG}upcoming?sort=begin_at&page[size]=1`;
    static upcomingMatches = `${PANDASCORE_CONFIG}upcoming?sort=begin_at&page[size]=3`;
    static liveMatches = `${PANDASCORE_CONFIG}?search[status]=running`;
}
export class OpenDota {
    static recentMatches = `${OPENDOTA_CONFIG}proMatches`;
}