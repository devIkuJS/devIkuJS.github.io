import { JsonpInterceptor } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, Subject, forkJoin } from 'rxjs';
import { BetsService } from 'src/app/services/data-manager/bets.service';
import { TeamService } from 'src/app/services/data-manager/team.service';
import { ApiMatch, Livematch, Pastmatch } from 'src/app/services/interfaces/match.interface';
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
  recentMatchesOne: any[] = [];


  constructor(private _betsService:BetsService , private _teamService: TeamService) {}

  ngOnInit(): void {
    this.getRecentsMatch();
    this.getLiveMatch();
  }

  getLiveMatch() {
    return this._betsService.getLiveMatches().subscribe( data => {
      this.mapLiveMatch(data)
    })
  }

  

  getRecentsMatch() {
    this._betsService.getRecentMatches().subscribe(dataResult => {
      dataResult.forEach(item => {
        this._teamService.getInfoTeam(item.radiant_team_id).subscribe(data => {
          this.recentMatches.push(
            { 
              match_id: item.match_id,
              league_name: item.league_name,
              radiant_name: item.radiant_name,
              dire_name:item.dire_name,
              radiant_score: item.radiant_score,
              dire_score: item.dire_score,
              radiant_team_id: item.radiant_team_id,
              dire_team_id: item.dire_team_id,
              logo_radiant: data.logo_url,
              logo_dire: "assets/img/tower_dire.png"
          });
        })
      });
   });

  }

  setRecentMatches(value: any[]): void {
    this.recentMatches = value
    console.log(this.recentMatches);
  }

  setLiveMatches(value: Livematch[]): void {
    this.liveMatches = value
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
