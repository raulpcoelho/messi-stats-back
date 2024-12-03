import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

@ApiTags('Totals')
export class TotalsDto {
  @ApiProperty({
    name: 'totalGoals',
    type: Number,
    description: 'Total goals scored',
  })
  @IsNumber()
  totalGoals: number;

  @ApiProperty({
    name: 'totalAssists',
    type: Number,
    description: 'Total assists',
  })
  @IsNumber()
  totalAssists: number;

  @ApiProperty({
    name: 'totalMatches',
    type: Number,
    description: 'Total matches played',
  })
  @IsNumber()
  totalMatches: number;

  @ApiProperty({
    name: 'totalMinutes',
    type: Number,
    description: 'Total minutes played',
  })
  @IsNumber()
  totalMinutes: number;

  @ApiProperty({
    name: 'homeMatches',
    type: Number,
    description: 'Total home matches played',
  })
  @IsNumber()
  homeMatches: number;

  @ApiProperty({
    name: 'awayMatches',
    type: Number,
    description: 'Total away matches played',
  })
  @IsNumber()
  awayMatches: number;

  @ApiProperty({
    name: 'matchesWon',
    type: Number,
    description: 'Total matches won',
  })
  @IsNumber()
  matchesWon: number;

  @ApiProperty({
    name: 'matchesLost',
    type: Number,
    description: 'Total matches lost',
  })
  @IsNumber()
  matchesLost: number;

  @ApiProperty({
    name: 'matchesStarted',
    type: Number,
    description: 'Total matches started',
  })
  @IsNumber()
  matchesStarted: number;

  @ApiProperty({
    name: 'totalPensScored',
    type: Number,
    description: 'Total penalties scored',
  })
  @IsNumber()
  totalPensScored: number;

  @ApiProperty({
    name: 'totalPensMissed',
    type: Number,
    description: 'Total penalties missed',
  })
  @IsNumber()
  totalPensMissed: number;

  @ApiProperty({
    name: 'totalHatTricks',
    type: Number,
    description: 'Total hat tricks',
  })
  @IsNumber()
  totalHatTricks: number;

  @ApiProperty({
    name: 'totalFreeKicks',
    type: Number,
    description: 'Total free kicks scored',
  })
  @IsNumber()
  totalFreeKicks: number;

  @ApiProperty({
    name: 'totalInsideBox',
    type: Number,
    description: 'Total goals scored from inside the box',
  })
  @IsNumber()
  totalInsideBox: number;

  @ApiProperty({
    name: 'totalOutsideBox',
    type: Number,
    description: 'Total goals scored from outside the box (does not include free kicks)',
  })
  @IsNumber()
  totalOutsideBox: number;

  @ApiProperty({
    name: 'totalLeft',
    type: Number,
    description: 'Total goals scored with the left foot',
  })
  @IsNumber()
  totalLeft: number;

  @ApiProperty({
    name: 'totalRight',
    type: Number,
    description: 'Total goals scored with the right foot',
  })
  @IsNumber()
  totalRight: number;

  @ApiProperty({
    name: 'totalHeaded',
    type: Number,
    description: 'Total goals scored with the head',
  })
  @IsNumber()
  totalHeaded: number;

  @ApiProperty({
    name: 'totalOtherBodyPart',
    type: Number,
    description: 'Total goals scored with other body parts',
  })
  @IsNumber()
  totalOtherBodyPart: number;

  @ApiProperty({
    name: 'totalSuccessfulDribbles',
    type: Number,
    description: 'Total successful dribbles',
  })
  @IsNumber()
  totalSuccessfulDribbles: number;

  @ApiProperty({
    name: 'totalMotm',
    type: Number,
    description: 'Total Man of the Match awards',
  })
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
