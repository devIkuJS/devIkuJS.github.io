export interface ApiMatch {
    id: number; 
    league: League;
    begin_at: string;
    opponents: Opponents[];
    streams_list: Stream[];
    number_of_games: number;
    results: Results[];
    serie: Serie;
    status: string;
}

export interface League {
    id: number;
    name: string;
    image_url: string;
}

export interface Serie {
    id: number;
    league_id: number;
    full_name: string;
    name: string;
}

export interface Opponents {
    opponent: Opponent;
}

export interface Opponent {
    id: number;
    name: string;
    image_url: string;
}

export interface Stream {
    raw_url: string;
    embed_url: string;
    language: string;
}

export interface Results {
    score: number;
    team_id: number;
}

export interface Match {
    id: number; 
    hour_coming_soon: string;
    league_name: string;
    begin_at: string;
    best_of: string;
    participants: any;
}

export interface TopMatch {
    id: number; 
    league_name: string;
    begin_at: string;
    opponents: Opponent[];
    stream_url: string;
    number_of_games: string;
}

export interface Pastmatch {
    id: number; 
    league_name: string;
    begin_at: string;
    opponents: Opponent[];
    stream_url: string;
    number_of_games: string;
    results: Results[];
}

export interface Livematch {
    id: number; 
    lifecycle: string;
    league_name: Tournament;
    best_of: number;
    participants: Participant[];
}

export interface Recentmatch {
    id: number; 
    lifecycle: string;
    league_name: Tournament;
    best_of: number;
    participants: Participant[];
    matches: MatchTwo[];
}

export interface Tournament {
    id: number;
    name: string;
}

export interface Participant {
    id: number;
    team_name: string;
    team_logo: string;
    score: number;
}

export interface MatchTwo {
    id: number; 
}

export interface DetailSerieMatch {
    id: number; 
    league_name: string;
    teamHomeName: string;
    teamHomeLogo: string;
    teamHomeScore: number;
    teamAwayName: string;
    teamAwayLogo: string;
    teamAwayScore: number;
    teamHomePlayers: Team[];
    teamAwayPlayers: Team[];
    best_of: number;
    broadcast: any;
}

export interface Hero {
    id: number;
    url_image: string;
    url_icon: string; 
    name: string;
}


export interface Team {
    id: number;
    hero: Hero;
    nick_name: string; 
    level: number;
    kills: any;
    deaths: any;
    assists: any;
    gold: any;
    net_worth: any;
}

export interface DetailGameMatch {
    playersHome: Team[];
    playersAway: Team[];
    idRosterHome: number;
    idRosterAway: number;
}

export interface H2HMatch {
    tournament: string;
    endDate: any;
    teamHomeName: string;
    teamHomeLogo: string;
    teamHomeScore: number;
    teamAwayName: string;
    teamAwayLogo: string;
    teamAwayScore: number;
}

export enum StatusGame {
    finished = "finished",
    not_played = "not_played",
    not_started = "not_started",
    running = "running",
}


