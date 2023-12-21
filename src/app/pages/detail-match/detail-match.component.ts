import { Component, ElementRef, ViewChild } from '@angular/core';
import { GameMatchService } from 'src/app/services/data-manager/game-match.service';
import { ActivatedRoute } from '@angular/router';  
import { DetailGameMatch, DetailSerieMatch, H2HMatch, Team } from 'src/app/services/interfaces/match.interface';
import { Utils } from 'src/app/services/utils/utils';


@Component({
  selector: 'app-detail-match',
  templateUrl: './detail-match.component.html',
  styleUrls: ['./detail-match.component.css']
})
export class DetailMatchComponent {

  idMatch!: number;
  idGame!: number;
  idTeamHome: number = 0;
  idTeamAway: number = 0;
  matchIndex: number = 0;
  response: any;
  detailGameMatch: Partial<DetailGameMatch> = {};
  detailSerieMatch: Partial<DetailSerieMatch> = {};
  heroesImages: any[] = [];
  playersHome: any[] =[];
  playersAway: any[] =[];
  listH2H: any;

  constructor(private _gameMatchService:GameMatchService, private route: ActivatedRoute ) {
    this.route.params.subscribe(res => this.response = res);
    this.idMatch = this.response.matchid;
    this.idGame = this.response.seriesid;
    this.matchIndex = this.response.matchindex;
  }

  ngOnInit(): void {
    this.getDetailSerieForMatch();
    this.getDetailGameForMatch();
    this.getHeroesImages();
    this.getDetailH2H();
  }


  getDetailSerieForMatch() {
    this._gameMatchService.getDetailSerieForMatch(this.idGame).subscribe(data => {
      this.mapDetailSerieMatch(data)
    })
  }

  private mapDetailSerieMatch(data: any): void {
      const serieMatch: DetailSerieMatch = {
        id: data.id,
        league_name: `${data.tournament.name} - ${data.name}`,
        teamHomeName: data.participants[0].team_name,
        teamHomeLogo: Utils.getTeamLogo(data.participants[0].team_logo),
        teamHomeScore: data.participants[0].score,
        teamAwayName: data.participants[1].team_name,
        teamAwayLogo: Utils.getTeamLogo(data.participants[1].team_logo),
        teamAwayScore: data.participants[1].score,
        teamHomePlayers: data.participants[0].players,
        teamAwayPlayers: data.participants[1].players,
        best_of: data.best_of,
        broadcast: data.broadcasters[0].broadcasts[0].external_id
      };
      this.setDetailMatch(serieMatch)
  }

  setDetailMatch(value: DetailSerieMatch): void {
    this.detailSerieMatch = value
  }


  getHeroesImages() {
    this._gameMatchService.getHeroesImages().subscribe(data => {
      this.heroesImages = data
    })
  }

  getDetailGameForMatch() {
    this._gameMatchService.getDetailGameForMatch(this.idMatch, this.idGame).subscribe(data => {
      if(!this.isEmptyObject(data)) {
        this.mapDetailGameMatch(data)
      }
    })
  }

  private mapDetailGameMatch(data: any): void {
    const gameMatch: DetailGameMatch = {
      playersHome: data.teams.home.players,
      playersAway: data.teams.away.players,
      idRosterHome: data.teams.home.roster.id,
      idRosterAway: data.teams.away.roster.id
    };
    this.setDetailGameMatch(gameMatch)
}

  setDetailGameMatch(value: DetailGameMatch): void {
    this.getRosters(value.idRosterHome, value.idRosterAway, value.playersHome, value.playersAway);
    this.detailGameMatch = value
    console.log(this.detailGameMatch);
  }
  
  getRosters(idRosterHome: number, idRosterAway: number, playersHome: Team[], playersAway: Team[]) {
    this._gameMatchService.getPlayers(idRosterHome, idRosterAway).subscribe(data => {
      var playersDataHome = [];
      var playersDataAway = [];
      if(data[0].id == idRosterHome){
        playersDataHome = data[0].players
      } else {
        playersDataHome = data[1].players
      }
      if(data[1].id == idRosterAway){
        playersDataAway = data[1].players
      } else {
        playersDataAway = data[0].players
      }

      playersDataHome.map((playerHome: any) => {
        this.heroesImages.map((hero: any) => {
          playersHome.map((player: any) => {
            if(player.hero.id == Number(hero.id)){
                player.hero.url_image = hero.url_image
                player.hero.url_icon = hero.url_icon
                player.hero.name = hero.heroe_name
              }

              if(player.id == playerHome.id){
                player.nick_name = playerHome.nick_name
              }
            })
          })
      })

      playersDataAway.map((playerAway: any) => {
        this.heroesImages.map((hero: any) => {
          playersAway.map((player: any) => {
            if(player.hero.id == Number(hero.id)){
                player.hero.url_image = hero.url_image
                player.hero.url_icon = hero.url_icon
                player.hero.name = hero.heroe_name
              }

              if(player.id == playerAway.id){
                player.nick_name = playerAway.nick_name
              }
            })
          })
      })
    })
  }

  
  getDetailH2H() {
    this.idTeamHome = this.response.teamidhome;
    this.idTeamAway= this.response.teamidaway;
    this._gameMatchService.getDetailH2H(this.idTeamHome, this.idTeamAway).subscribe(response => {
      this.mapDetailH2H(response.data.matches)
    })
  }

  private mapDetailH2H(h2hMatch: any[]): void {
    const matches: H2HMatch[] = h2hMatch.map(match => ({
      tournament: match.stageName,
      endDate: match.endDate,
      teamHomeName: match.participants[0].team_name,
      teamHomeLogo: Utils.getTeamLogo(match.participants[0].team_logo),
      teamHomeScore: match.participants[0].score,
      teamAwayName: match.participants[1].team_name,
      teamAwayLogo: Utils.getTeamLogo(match.participants[1].team_logo),
      teamAwayScore: match.participants[1].score,
    }))
    this.setDetailH2H(matches)
  }

  setDetailH2H(matches: H2HMatch[]): void {
    this.listH2H = matches
  }

  isEmptyObject(obj: any) {
    return (obj && (Object.keys(obj).length === 0));
  }

}
