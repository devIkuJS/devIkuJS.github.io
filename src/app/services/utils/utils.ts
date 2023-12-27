import { Opponent, Opponents, Stream } from "../interfaces/match.interface"

export class Utils {
  static teamNameDefault = "TBD";
  static teamLogoDefault = "./assets/img/placeholder-team.png";
  static getStream(streamUrl: Stream[]): string {
    if (!streamUrl.length) {
      return ""
    } else {
      return streamUrl[0].raw_url
    }
  }

  static getTeamLogo(team_logo: string): string {
    return team_logo ? team_logo : Utils.teamLogoDefault;
  }

  static validateIfScoreNull(score: any): any {
    return score == null ? 0 : score;
  }

  static isEmpty(obj: any): any {
    return Object.keys(obj).length === 0;
  }

  static getOpponents(opponents: Opponents[]): Opponent[] {
    var arrayAux: any[] = [
      {
        id: 1234,
        name: "TBD",
        image_url: "./assets/img/dota-logo.jpg"

      },
      {
        id: 5678,
        name: "TBD",
        image_url: "./assets/img/dota-logo.jpg"

      }
    ];
    if (!opponents.length) {
      return opponents = arrayAux
      
    } else {
      return opponents.map(opponent => ({
        id: opponent.opponent.id,
        name: opponent.opponent.name,
        image_url: opponent.opponent.image_url == null ? "./assets/img/dota-logo.jpg" : opponent.opponent.image_url
      }));

    }
  }

}
