const GLOBAL_CONFIG = 'https://api.pandascore.co/dota2/matches/';
export class HttpApi {
    static topMatch = `${GLOBAL_CONFIG}upcoming?sort=begin_at&page[size]=1`;
    static upcomingMatches = `${GLOBAL_CONFIG}upcoming?sort=begin_at&page[size]=3`;
    static liveMatches = `${GLOBAL_CONFIG}running?sort=begin_at&page[size]=3`;
    static recentMatches = `${GLOBAL_CONFIG}past?page[size]=3`;
}