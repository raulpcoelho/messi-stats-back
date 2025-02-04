import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

@ApiTags('Matches')
export class FindMatchBetweenYearsDto {
  @ApiPropertyOptional({
    name: 'startYear',
    type: Number,
    description: 'The starting year of the match search range',
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  startYear!: number;

  @ApiPropertyOptional({
    name: 'endYear',
    type: Number,
    description: 'The ending year of the match search range',
  })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  endYear!: number;
}
