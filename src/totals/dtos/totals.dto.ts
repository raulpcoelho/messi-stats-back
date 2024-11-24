import { IsNumber } from 'class-validator';

export class TotalsDto {
  @IsNumber()
  totalGoals: number;

  @IsNumber()
  totalAssists: number;

  @IsNumber()
  totalMatches: number;

  @IsNumber()
  totalMinutes: number;

  @IsNumber()
  homeMatches: number;

  @IsNumber()
  awayMatches: number;

  @IsNumber()
  matchesWon: number;

  @IsNumber()
  matchesLost: number;

  @IsNumber()
  matchesStarted: number;

  @IsNumber()
  totalPensScored: number;

  @IsNumber()
  totalPensMissed: number;

  @IsNumber()
  totalHatTricks: number;

  @IsNumber()
  totalFreeKicks: number;

  @IsNumber()
  totalInsideBox: number;

  @IsNumber()
  totalOutsideBox: number;

  @IsNumber()
  totalLeft: number;

  @IsNumber()
  totalRight: number;

  @IsNumber()
  totalHeaded: number;

  @IsNumber()
  totalOtherBodyPart: number;

  @IsNumber()
  totalSuccessfulDribbles: number;

  @IsNumber()
  totalMotm: number;

  constructor() {
    this.totalGoals = 0;
    this.totalAssists = 0;
    this.totalMatches = 0;
    this.totalMinutes = 0;
    this.homeMatches = 0;
    this.awayMatches = 0;
    this.matchesWon = 0;
    this.matchesLost = 0;
    this.matchesStarted = 0;
    this.totalPensScored = 0;
    this.totalPensMissed = 0;
    this.totalHatTricks = 0;
    this.totalFreeKicks = 0;
    this.totalInsideBox = 0;
    this.totalOutsideBox = 0;
    this.totalLeft = 0;
    this.totalRight = 0;
    this.totalHeaded = 0;
    this.totalOtherBodyPart = 0;
    this.totalSuccessfulDribbles = 0;
    this.totalMotm = 0;
  }
}
