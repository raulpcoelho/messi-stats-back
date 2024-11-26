import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindMatchDto {
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  matchDate?: Date;

  @IsOptional()
  @IsString()
  season?: string;

  @IsOptional()
  @IsString()
  competition?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => JSON.parse(value))
  home?: boolean;

  @IsOptional()
  @IsString()
  team?: string;

  @IsOptional()
  @IsString()
  opponent?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  goals?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  assists?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => JSON.parse(value))
  started?: boolean;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  pensScored?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  pensMissed?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  hatTricks?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  freeKicks?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  insideBox?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  outsideBox?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  left?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  right?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  head?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => JSON.parse(value))
  motm?: boolean;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  year?: number;
}
