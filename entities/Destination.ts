import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Flight } from "./Flight"
import { Airport } from "./Airport"

@Entity()
export class Destination {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  city!: string

  @Column()
  country!: string

  @Column({ unique: true })
  code!: string

  @ManyToOne(() => Airport, { nullable: true })
  airport?: Airport

  @Column({ nullable: true })
  region?: string

  @Column({ nullable: true, type: "float" })
  price?: number

  @Column({ nullable: true, type: "int" })
  popularity?: number

  @OneToMany(() => Flight, (flight: Flight) => flight.from)
  departingFlights!: Flight[]

  @OneToMany(() => Flight, (flight: Flight) => flight.to)
  arrivingFlights!: Flight[]
}