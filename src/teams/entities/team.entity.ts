import { Match } from '../../matches/entities/match.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({ name: 'teams' })
export class Team {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id!: number;

  @Column({ name: 'name', length: 30 })
  name!: string;

  @OneToMany(() => Match, match => match.team)
  matchesWithMessi: Relation<Match>[];

  @OneToMany(() => Match, match => match.opponent)
  matchesAgainstMessi: Relation<Match>[];

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
