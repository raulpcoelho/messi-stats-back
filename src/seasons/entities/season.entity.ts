import { Match } from '../../matches/entities/match.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({ name: 'seasons' })
export class Season {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id!: number;

  @Column({ name: 'name', length: 11 })
  name!: string;

  @OneToMany(() => Match, match => match.season)
  matches: Relation<Match>[];

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
