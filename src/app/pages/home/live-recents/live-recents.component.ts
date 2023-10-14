import { Component } from '@angular/core';
import { BetsService } from 'src/app/services/data-manager/bets.service';
import { ApiMatch, Pastmatch } from 'src/app/services/interfaces/match.interface';
import { Utils } from 'src/app/services/utils/utils';

@Component({
  selector: 'app-live-recents',
  templateUrl: './live-recents.component.html',
  styleUrls: ['./live-recents.component.css']
})
export class LiveRecentsComponent {

  recentMatches: Pastmatch[] = [];
  liveMatches: Pastmatch[] = [];

  constructor(private _betsService:BetsService ) {}

  ngOnInit(): void {
    this.getRecentsMatch();
  }

  getLiveMatch() {
    return this._betsService.getLiveMatches().subscribe( data => {
      this.mapLiveMatch(data)
    })
  }

  getRecentsMatch() {
    return this._betsService.getRecentMatches().subscribe( data => {
      this.mapRecentMatch(data)
    })
  }

  setLiveMatches(value: Pastmatch[]): void {
    this.liveMatches = value
  }

  setRecentMatches(value: Pastmatch[]): void {
    this.recentMatches = value
  }

  private diffMinsToComingGame(begin_at: string): string {
    var hourNow = new Date();
    var hourGame = new Date(begin_at);
    var diffMs = (hourGame.getTime() - hourNow.getTime());
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); 
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    var mensajeHrs = diffHrs == 0 ? "" : `${diffHrs} h`;
    return  `${mensajeHrs} ${diffMins} min`
  }

  private mapLiveMatch(serviceMatch: ApiMatch[]): void {
    const matches: Pastmatch[] = serviceMatch.map(match => ({
      id: match.id,
      league_name: match.league.name,
      begin_at: this.diffMinsToComingGame(match.begin_at),
      opponents: match.opponents.map(opponent => ({
        id: opponent.opponent.id,
        name: opponent.opponent.name,
        image_url: opponent.opponent.image_url
      })),
      stream_url: Utils.getStream(match.streams_list),
      number_of_games: String(match.number_of_games),
      results: match.results.map(result => ({
        score: result.score,
        team_id: result.team_id,
      })),
    }))

    this.setLiveMatches(matches)
  }

  private mapRecentMatch(serviceMatch: ApiMatch[]): void {
    const matches: Pastmatch[] = serviceMatch.map(match => ({
      id: match.id,
      league_name: match.league.name,
      begin_at: this.diffMinsToComingGame(match.begin_at),
      opponents: match.opponents.map(opponent => ({
        id: opponent.opponent.id,
        name: opponent.opponent.name,
        image_url: opponent.opponent.image_url
      })),
      stream_url: Utils.getStream(match.streams_list),
      number_of_games: String(match.number_of_games),
      results: match.results.map(result => ({
        score: result.score,
        team_id: result.team_id,
      })),
    }))

    this.setRecentMatches(matches)
  }

  

}
