import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class MatchDto {
  @IsDate()
  matchDate: Date;

  @IsString()
  season: string;

  @IsString()
  competition: string;

  @IsBoolean()
  home: boolean;

  @IsString()
  team: string;

  @IsString()
  opponent: string;

  @IsNumber()
  teamScore: number;

  @IsNumber()
  opponentScore: number;

  @IsNumber()
  goals: number;

  @IsNumber()
  assists: number;

  @IsBoolean()
  started: boolean;

  @IsNumber()
  minutesPlayed: number;

  @IsNumber()
  pensScored: number;

  @IsNumber()
  pensMissed: number;

  @IsNumber()
  hatTricks: number;

  @IsNumber()
  freeKicks: number;

  @IsNumber()
  insideBox: number;

  @IsNumber()
  outsideBox: number;

  @IsNumber()
  left: number;

  @IsNumber()
  right: number;

  @IsNumber()
  head: number;

  @IsNumber()
  other: number;

  @IsNumber()
  successfulDribbles: number;

  @IsBoolean()
  motm: boolean;
}
