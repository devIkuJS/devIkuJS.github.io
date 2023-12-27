import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BetsService } from 'src/app/services/data-manager/bets.service';
import { ApiMatch, Livematch, Pastmatch, Recentmatch } from 'src/app/services/interfaces/match.interface';
import { Utils } from 'src/app/services/utils/utils';

@Component({
  selector: 'app-live-recents',
  templateUrl: './live-recents.component.html',
  styleUrls: ['./live-recents.component.css']
})
export class LiveRecentsComponent {

  recentMatches: any[] = [];
  liveMatches: any[] = [];
  teams: any[] = [];
  bsValue = new Date();
  today = new Date();
  public loading = false;

  constructor(private _betsService:BetsService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getLiveMatch();
  }

  getLiveMatch() {
    var initialDate = this.today.setHours(0, 0, 0).toString();
    var finalDate = this.today.setHours(23, 59, 59).toString();
    return this._betsService.getLiveMatches(initialDate, finalDate).subscribe( data => {
      /*data.items = data.items.filter((obj: any) => {
        return obj.lifecycle == "live" && obj.game.id == 1;
      });
      console.log(data.items);
      this.mapLiveMatch(data.items)
      */
      this.mapLiveMatch(data)
    })
  }

  onValueChange(value: Date): void {
    this.today = new Date();
    this.bsValue = value;
    var initialDate = this.bsValue.setHours(0, 0, 0).toString();
    var finalDate = this.bsValue.setHours(23, 59, 59).toString();
    this.getRecentMatches(initialDate, finalDate)
  }

  getRecentMatches(initialDate: string, finalDate: string) {
    this.spinner.show();
    return this._betsService.getRecentMatches(initialDate, finalDate).subscribe( data => {
      this.spinner.hide();
      this.mapRecentMatch(data.items)
    })
  }

  setLiveMatches(value: Livematch[]): void {
    this.liveMatches = value
  }

  setRecentMatches(value: Recentmatch[]): void {
    this.recentMatches = value.filter(obj => {
      return obj.lifecycle != "upcoming" && obj.lifecycle != "live";
    });
  }

  private mapLiveMatch(serviceMatch: any[]): void {
    const matches: Livematch[] = serviceMatch.map(match => ({
      id: match.id,
      lifecycle: match.lifecycle,
      league_name: match.tournament.name,
      best_of: match.best_of,
      start_date: match.start_date,
      participants: match.participants.map((participant: any) => ({
        team_id: participant.team_id,
        roster_id: participant.roster_id,
        team_name: participant.team_name,
        team_logo: Utils.getTeamLogo(participant.team_logo),
        score: Utils.validateIfScoreNull(participant.score)
      })),
      matches: match.matches.map((game: any) => ({
        id: game.id,
      })),
    }))
    console.log("MATCHECITO", matches);
    this.setLiveMatches(matches)
  }

  private mapRecentMatch(serviceMatch: any[]): void {
    const matches: Recentmatch[] = serviceMatch.map(match => ({
      id: match.id,
      lifecycle: match.lifecycle,
      league_name: match.tournament.name,
      best_of: match.best_of,
      participants: match.participants.map((participant: any) => ({
        team_id: participant.team_id,
        roster_id: participant.roster_id,
        team_name: participant.team_name,
        team_logo: Utils.getTeamLogo(participant.team_logo),
        score: participant.score
      })),
      matches: match.matches.map((game: any) => ({
        id: game.id,
      })),
    }))
    this.setRecentMatches(matches)
  }

   titleCase(str: string) {
    str.toLowerCase();
    var strAr = str.split(" ");
    for(var i=0;i<strAr.length;i++)
    {
       strAr[i] = strAr[i].charAt(0).toUpperCase() + strAr[i].substring(1).toLowerCase();     
    }
    str = strAr.join(" ");
    return str;
  }


}
