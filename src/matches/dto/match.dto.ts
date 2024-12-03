import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

@ApiTags('Matches')
export class MatchDto {
  @ApiProperty({
    name: 'matchDate',
    type: Date,
    description: 'Date of the match',
  })
  @IsDate()
  matchDate: Date;

  @ApiProperty({
    name: 'season',
    type: String,
    description: 'The season the match was played in',
  })
  @IsString()
  season: string;

  @ApiProperty({
    name: 'competition',
    type: String,
    description: 'The competition the match was played in',
  })
  @IsString()
  competition: string;

  @ApiProperty({
    name: 'home',
    type: Boolean,
    description: 'Whether the match was played at home or away',
  })
  @IsBoolean()
  home: boolean;

  @ApiProperty({
    name: 'team',
    type: String,
    description: 'The team that Messi played for in the match',
  })
  @IsString()
  team: string;

  @ApiProperty({
    name: 'opponent',
    type: String,
    description: 'The opponent team in the match',
  })
  @IsString()
  opponent: string;

  @ApiProperty({
    name: 'teamScore',
    type: Number,
    description: "Messi's team score in the match",
  })
  @IsNumber()
  teamScore: number;

  @ApiProperty({
    name: 'opponentScore',
    type: Number,
    description: 'The opponent score in the match',
  })
  @IsNumber()
  opponentScore: number;

  @ApiProperty({
    name: 'goals',
    type: Number,
    description: 'The number of goals scored by Messi in the match',
  })
  @IsNumber()
  goals: number;

  @ApiProperty({
    name: 'assists',
    type: Number,
    description: 'The number of assists by Messi in the match',
  })
  @IsNumber()
  assists: number;

  @ApiProperty({
    name: 'started',
    type: Boolean,
    description: 'Whether Messi started the match or not',
  })
  @IsBoolean()
  started: boolean;

  @ApiProperty({
    name: 'minutesPlayed',
    type: Number,
    description: 'The number of minutes Messi played in the match',
  })
  @IsNumber()
  minutesPlayed: number;

  @ApiProperty({
    name: 'pensScored',
    type: Number,
    description: 'The number of penalties scored by Messi in the match',
  })
  @IsNumber()
  pensScored: number;

  @ApiProperty({
    name: 'pensMissed',
    type: Number,
    description: 'The number of penalties missed by Messi in the match',
  })
  @IsNumber()
  pensMissed: number;

  @ApiProperty({
    name: 'hatTricks',
    type: Number,
    description: 'The number of hat tricks scored by Messi in the match',
  })
  @IsNumber()
  hatTricks: number;

  @ApiProperty({
    name: 'freeKicks',
    type: Number,
    description: 'The number of free kicks scored by Messi in the match',
  })
  @IsNumber()
  freeKicks: number;

  @ApiProperty({
    name: 'insideBox',
    type: Number,
    description: 'The number of goals scored by Messi in the match from inside the box',
  })
  @IsNumber()
  insideBox: number;

  @ApiProperty({
    name: 'outsideBox',
    type: Number,
    description: 'The number of goals scored by Messi in the match from outside the box (does not include free kicks)',
  })
  @IsNumber()
  outsideBox: number;

  @ApiProperty({
    name: 'left',
    type: Number,
    description: 'The number of goals scored by Messi in the match with his left foot',
  })
  @IsNumber()
  left: number;

  @ApiProperty({
    name: 'right',
    type: Number,
    description: 'The number of goals scored by Messi in the match with his right foot',
  })
  @IsNumber()
  right: number;

  @ApiProperty({
    name: 'head',
    type: Number,
    description: 'The number of goals scored by Messi in the match with his head',
  })
  @IsNumber()
  head: number;

  @ApiProperty({
    name: 'other',
    type: Number,
    description: 'The number of goals scored by Messi in the match with other parts of his body',
  })
  @IsNumber()
  other: number;

  @ApiProperty({
    name: 'successfulDribbles',
    type: Number,
    description: 'The number of successful dribbles by Messi in the match',
  })
  @IsNumber()
  successfulDribbles: number;

  @ApiProperty({
    name: 'motm',
    type: Boolean,
    description: 'Whether Messi was the Man of the Match or not',
  })
  @IsBoolean()
  motm: boolean;
}
