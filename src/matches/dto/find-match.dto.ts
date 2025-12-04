import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

@ApiTags('Matches')
export class FindMatchDto {
  @ApiPropertyOptional({
    name: 'matchDate',
    type: Date,
    description: 'filter matches by date',
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  matchDate?: Date;

  @ApiPropertyOptional({
    name: 'season',
    type: String,
    description: 'filter matches by season',
  })
  @IsOptional()
  @IsString()
  season?: string;

  @ApiPropertyOptional({
    name: 'competition',
    type: String,
    description: 'filter matches by competition',
  })
  @IsOptional()
  @IsString()
  competition?: string;

  @ApiPropertyOptional({
    name: 'home',
    type: Boolean,
    description: 'filter matches by home or away (true for home, false for away)',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => JSON.parse(value))
  home?: boolean;

  @ApiPropertyOptional({
    name: 'team',
    type: String,
    description: 'filter matches by the team that Messi played for',
  })
  @IsOptional()
  @IsString()
  team?: string;

  @ApiPropertyOptional({
    name: 'opponent',
    type: String,
    description: 'filter matches by the opponent team',
  })
  @IsOptional()
  @IsString()
  opponent?: string;

  @ApiPropertyOptional({
    name: 'goals',
    type: Number,
    description: 'filter matches by the number of goals scored by Messi',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  goals?: number;

  @ApiPropertyOptional({
    name: 'assists',
    type: Number,
    description: 'filter matches by the number of assists by Messi',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  assists?: number;

  @ApiPropertyOptional({
    name: 'started',
    type: Boolean,
    description: 'filter matches by whether Messi started the game (true for started, false for not started)',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => JSON.parse(value))
  started?: boolean;

  @ApiPropertyOptional({
    name: 'pensScored',
    type: Number,
    description: 'filter matches by the number of penalties scored by Messi',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  pensScored?: number;

  @ApiPropertyOptional({
    name: 'pensMissed',
    type: Number,
    description: 'filter matches by the number of penalties missed by Messi',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  pensMissed?: number;

  @ApiPropertyOptional({
    name: 'hatTricks',
    type: Number,
    description:
      'filter matches by the number of hat tricks scored by Messi (3, 4, 5 goals: 1 hat trick; 6 goals: 2 hat tricks)',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  hatTricks?: number;

  @ApiPropertyOptional({
    name: 'freeKicks',
    type: Number,
    description: 'filter matches by the number of free kicks scored by Messi',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  freeKicks?: number;

  @ApiPropertyOptional({
    name: 'insideBox',
    type: Number,
    description: 'filter matches by the number of goals scored by Messi from inside the box',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  insideBox?: number;

  @ApiPropertyOptional({
    name: 'outsideBox',
    type: Number,
    description:
      "filter matches by the number of goals scored by Messi from outside the box (desn't include free kicks)",
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  outsideBox?: number;

  @ApiPropertyOptional({
    name: 'left',
    type: Number,
    description: 'filter matches by the number of goals scored by Messi with his left foot',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  left?: number;

  @ApiPropertyOptional({
    name: 'right',
    type: Number,
    description: 'filter matches by the number of goals scored by Messi with his right foot',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  right?: number;

  @ApiPropertyOptional({
    name: 'head',
    type: Number,
    description: 'filter matches by the number of goals scored by Messi with his head',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  head?: number;

  @ApiPropertyOptional({
    name: 'motm',
    type: Boolean,
    description: 'filter matches by whether Messi was the man of the match (true for MOTM, false for not MOTM)',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => JSON.parse(value))
  motm?: boolean;

  @ApiPropertyOptional({
    name: 'year',
    type: Number,
    description: 'filter matches by year',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  year?: number;

  @ApiPropertyOptional({
    name: 'page',
    type: Number,
    description: 'page number for pagination',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page?: number;

  @ApiPropertyOptional({
    name: 'limit',
    type: Number,
    description: 'number of items per page',
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit?: number;
}
