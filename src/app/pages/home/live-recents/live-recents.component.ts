import { Component } from '@angular/core';
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
  liveMatches: Livematch[] = [];
  teams: any[] = [];
  bsValue = new Date();
  today!: Date;
  public loading = false;

  constructor(private _betsService:BetsService) {}

  ngOnInit(): void {
    this.getLiveMatch();
  }

  getLiveMatch() {
    return this._betsService.getLiveMatches().subscribe( data => {
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
    this.loading = true;
    return this._betsService.getRecentMatches(initialDate, finalDate).subscribe( data => {
      this.loading = false;
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

  private mapLiveMatch(serviceMatch: ApiMatch[]): void {
    const matches: Livematch[] = serviceMatch.map(match => ({
      id: match.id,
      league_name: `${match.league.name} ${match.serie.full_name}`,
      opponents: match.opponents.map(opponent => ({
        id: opponent.opponent.id,
        name: this.titleCase(opponent.opponent.name),
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
