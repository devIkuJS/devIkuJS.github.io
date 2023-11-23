import { Component, ElementRef, ViewChild } from '@angular/core';
import { GameMatchService } from 'src/app/services/data-manager/game-match.service';
import { ActivatedRoute } from '@angular/router';  

@Component({
  selector: 'app-detail-match',
  templateUrl: './detail-match.component.html',
  styleUrls: ['./detail-match.component.css']
})
export class DetailMatchComponent {
  detailMatch: any;
  idMatch!: number;
  radiantPlayers: any[] = [];
  direPlayers: any[] = [];
  chartOptions: any = {};
  constructor(private _gameMatchService:GameMatchService, private route: ActivatedRoute ) {
    this.route.params.subscribe(res => this.idMatch = Number(res["id"]));
  }

  ngOnInit(): void {
    this.getDetailMatch();
  }

  getDetailMatch() {
    const url_image_hero = "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/"
    return this._gameMatchService.getDetailForMatch(this.idMatch).subscribe( data => {
      this.detailMatch = data;
      console.log(this.detailMatch.players);
      this.detailMatch.players.forEach((obj: any) => {
        obj.max_hero_hit.unit =  obj.max_hero_hit.unit.split("npc_dota_hero_").pop();
        obj.heroe_img =  url_image_hero + obj.max_hero_hit.unit + ".png" ;
        obj.heroe_icon =  url_image_hero + "icons/" + obj.max_hero_hit.unit + ".png" ;
        if(obj.name == null) {
          obj.name = obj.personaname
        }
      });
      this.radiantPlayers = this.detailMatch.players.slice(0, 5).sort((a: any , b: any) => a.lane_role - b.lane_role);
      this.direPlayers = this.detailMatch.players.slice(5, 10).sort((a: any , b: any) => a.lane_role - b.lane_role);
      this.setChartOptions(this.detailMatch.radiant_xp_adv, this.detailMatch.radiant_gold_adv);
    })
  }

  setChartOptions(dataChartExperience: any , dataChartGold: any){
    var dataExperience = this.generateDataPointExperience(dataChartExperience);
    var dataGold = this.generateDataPointGold(dataChartGold);
    var dataRadiant = this.generateDataRadiant(dataChartExperience);
    var dataDire = this.generateDataDire(dataChartExperience);
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: "Estadisticas del juego",
      },
      axisX: {
        valueFormatString: "#':00'",
        interval: 4
      },
      backgroundColor: "transparent",
      theme: "dark1",
      toolTip: {
        shared: true,
        contentFormatter: (e: any) => {
          var contentExp = "";
          var contentGold = "";
          var timeConentExpGold = e.entries[0].dataPoint.x;
          if(e.entries[0].dataPoint.y >= 0) {
            contentExp += "<span style='color:#68c3a3;'>Radiant " + e.entries[0].dataSeries.name + ":</span> " +  Math.abs(e.entries[0].dataPoint.y);
          }else {
            contentExp += "<span style='color:#d64541;'>Dire " + e.entries[0].dataSeries.name + ":</span> " +  Math.abs(e.entries[0].dataPoint.y);
          }
          if(e.entries[1].dataPoint.y >= 0) {
            contentGold += "<span style='color:#68c3a3;'>Radiant " + e.entries[1].dataSeries.name + ":</span> " +  Math.abs(e.entries[1].dataPoint.y);
          }else {
            contentGold += "<span style='color:#d64541;'>Dire " + e.entries[1].dataSeries.name + ":</span> " +  Math.abs(e.entries[1].dataPoint.y);
          }
          return timeConentExpGold +":00" + "<br>" + contentExp + "<br>" + contentGold;
        }
      },
      data: [{
        type:"line",
        name: "Exp",
        showInLegend: true,
        dataPoints: dataExperience,
      },
      {
        type: "line",
        name: "Gold",
        color: "rgb(255,215,0)",
        showInLegend: true,
        dataPoints: dataGold
      },
      {
        type: "rangeArea",
        name: "Radiant",
        markerType: "none",
        color: "rgba(102, 187, 106, 0.2)",
        showInLegend: true,
        dataPoints: dataRadiant
      },
      {
        type: "rangeArea",
        name: "Dire",
        markerType: "none",
        showInLegend: true,
        color: "rgba(255, 76, 76, 0.2)",
        dataPoints: dataDire
      }
    ]
    }
  }

  
  generateDataPointExperience(dataChartExperience: any) {
    var arr = []
    for (var i = 0; i < dataChartExperience.length; i++) {
      arr.push({
          x: i,
          y: dataChartExperience[i]
      });
    }
    return arr;
  }

  generateDataPointGold(dataChartGold: any) {
    var arr = []
    for (var i = 0; i < dataChartGold.length; i++) {
      arr.push({
          x: i,
          y: dataChartGold[i]
      });
    }
    return arr;
  }

  generateDataRadiant(dataChartExperience: any) {
    var arr = []
    let max = Math.max(...dataChartExperience);
    for (var i = 0; i < dataChartExperience.length; i++) {
      arr.push({
        x: i,
        y: [0,max],
      });
    }
    return arr;
  }

  generateDataDire(dataChartExperience: any) {
    var arr = []
    let min = Math.min(...dataChartExperience);
    for (var i = 0; i < dataChartExperience.length; i++) {
      arr.push({
        x: i,
        y: [0,min],
      });
    }
    return arr;
  }

}
