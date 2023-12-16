import { Component, OnInit } from '@angular/core';
import { BetsService } from 'src/app/services/data-manager/bets.service';
import { ApiMatch, Match , TopMatch } from 'src/app/services/interfaces/match.interface';
import { Utils } from 'src/app/services/utils/utils';

@Component({
  selector: 'app-upcoming-matches',
  templateUrl: './upcoming-matches.component.html',
  styleUrls: ['./upcoming-matches.component.css']
})
export class UpcomingMatchesComponent implements OnInit {

  upComingMatchesToday: Match[] = [];
  upComingMatchesTomorrow: Match[] = [];
  today = new Date();
  tomorrow = new Date(this.today)

  constructor(private _betsService:BetsService ) {}

  ngOnInit(): void {
    this.setTimeDate();
  }

  setTimeDate() {
    this.tomorrow.setDate(this.today.getDate() + 1)
    var initialTodayDate = this.today.setHours(0, 0, 0).toString();
    var finalTodayDate = this.today.setHours(23, 59, 59).toString();
    var initialTomorrowDate = this.tomorrow.setHours(0, 0, 0).toString();
    var finalTomorrowDate = this.tomorrow.setHours(23, 59, 59).toString();
    this.getUpcomingMatchesToday(initialTodayDate, finalTodayDate);
    this.getUpcomingMatchesTomorrow(initialTomorrowDate, finalTomorrowDate);
  }


  getUpcomingMatchesToday(initialDate: string, finalDate: string) {
    return this._betsService.getUpcomingMatches(initialDate, finalDate).subscribe( data => {
      this.mapUpcomingMatchesToday(data.items)
    })
  }

  getUpcomingMatchesTomorrow(initialTomorrowDate: string, finalTomorrowDate: string) {
    return this._betsService.getUpcomingMatches(initialTomorrowDate, finalTomorrowDate).subscribe( data => {
      this.mapUpcomingMatchesTomorrow(data.items)
    })
  }

  setUpcomingMatchesToday(value: Match[]): void {
    this.upComingMatchesToday = value
  }

  setUpcomingMatchesTomorrow(value: Match[]): void {
    this.upComingMatchesTomorrow = value
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

  convertToHour(begin_at: string): string {
    var hourGame = new Date(begin_at);
    return  `${hourGame.getHours().toString()}:00`
  }


  private mapUpcomingMatchesToday(serviceMatch: any[]): void {
    const matches: Match[] = serviceMatch.map(match => ({
      id: match.id,
      league_name: match.tournament.name,
      hour_coming_soon: this.diffMinsToComingGame(match.start_date),
      begin_at: this.convertToHour(match.start_date),
      best_of: match.best_of,
      participants: match.participants.map((participant: any) => ({
        team_name: participant.team_name,
        team_logo:participant.team_logo
      }))
    }))
    this.setUpcomingMatchesToday(matches)
  }

  private mapUpcomingMatchesTomorrow(serviceMatch: any[]): void {
    const matches: Match[] = serviceMatch.map(match => ({
      id: match.id,
      league_name: match.tournament.name,
      hour_coming_soon: this.diffMinsToComingGame(match.start_date),
      begin_at: this.convertToHour(match.start_date),
      best_of: match.best_of,
      participants: this.validateParticipants(match.participants)
    }))
    this.setUpcomingMatchesTomorrow(matches)
  }

  private validateParticipants(participants: any){
    var arrayParticipants: any = [];
    if(participants.length == 0){
      arrayParticipants = [
        {teamHomeName: Utils.teamNameDefault, teamHomeLogo: Utils.teamLogoDefault},
        {teamAwayName: Utils.teamNameDefault, teamAwayLogo: Utils.teamLogoDefault},
      ];
    } else if(participants.length == 1) {
      arrayParticipants = [
        {teamHomeName: participants[0].team_name, teamHomeLogo: Utils.getTeamLogo(participants[0].team_logo)},
        {teamAwayName: Utils.teamNameDefault, teamAwayLogo: Utils.teamLogoDefault},
      ];
    }else {
      arrayParticipants = [
        {teamHomeName: participants[0].team_name, teamHomeLogo: Utils.getTeamLogo(participants[0].team_logo)},
        {teamAwayName: participants[1].team_name, teamAwayLogo: participants[1].team_logo},
      ];
    }
    return arrayParticipants
  }

}
