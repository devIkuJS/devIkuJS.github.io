import { Component, OnInit } from '@angular/core';
import { BetsService } from 'src/app/services/data-manager/bets.service';
import { ApiMatch, Match, StatusGame, Stream } from 'src/app/services/interfaces/match.interface';
import { Utils } from 'src/app/services/utils/utils';

@Component({
  selector: 'app-upcoming-matches',
  templateUrl: './upcoming-matches.component.html',
  styleUrls: ['./upcoming-matches.component.css']
})
export class UpcomingMatchesComponent implements OnInit {

  topMatch: Match[] = [];
  upComingMatches: Match[] = [];

  constructor(private _betsService:BetsService ) {}

  ngOnInit(): void {
    this.getTopMatch();
    this.getUpcomingMatches();
  }

  getTopMatch() {
    return this._betsService.getTopMatch().subscribe( data => {
      this.mapMatch(data)
    })
  }

  getUpcomingMatches() {
    return this._betsService.getUpcomingMatches().subscribe( data => {
      this.mapUpcomingMatches(data)
    })
  }

  setMatches(value: Match[]): void {
    this.topMatch = value
  }

  setUpcomingMatches(value: Match[]): void {
    this.upComingMatches = value
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

  private convertToHour(begin_at: string): string {
    var hourGame = new Date(begin_at);
    return  `${hourGame.getHours().toString()}:00`
  }

  private mapMatch(serviceMatch: ApiMatch[]): void {
    const matches: Match[] = serviceMatch.map(match => ({
      id: match.id,
      league_name: match.league.name,
      begin_at: this.diffMinsToComingGame(match.begin_at),
      opponents: Utils.getOpponents(match.opponents),
      stream_url: Utils.getStream(match.streams_list),
      number_of_games: String(match.number_of_games)
    }))

    this.setMatches(matches)
  }

  private mapUpcomingMatches(serviceMatch: ApiMatch[]): void {
    const matches: Match[] = serviceMatch.map(match => ({
      id: match.id,
      league_name: match.league.name,
      begin_at: this.convertToHour(match.begin_at),
      opponents: Utils.getOpponents(match.opponents),
      stream_url: Utils.getStream(match.streams_list),
      number_of_games: String(match.number_of_games)
    }))

    this.setUpcomingMatches(matches)
  }

}
