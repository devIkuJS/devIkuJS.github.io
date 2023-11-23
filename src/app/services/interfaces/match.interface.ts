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
    league_name: string;
    opponents: Opponent[];
    stream_url: string;
    number_of_games: string;
    results: Results[];
}

export enum StatusGame {
    finished = "finished",
    not_played = "not_played",
    not_started = "not_started",
    running = "running",
}


