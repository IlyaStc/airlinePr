import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Airport {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  city!: string

  @Column()
  country!: string

  @Column()
  iataCode!: string

  @Column()
  icaoCode!: string

  @Column()
  region!: string
}