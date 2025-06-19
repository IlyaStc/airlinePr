import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Destination } from "./Destination"
import { Booking } from "./Booking"

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  flightNumber!: string

  @ManyToOne(() => Destination, (destination: Destination) => destination.departingFlights)
  from!: Destination

  @ManyToOne(() => Destination, (destination: Destination) => destination.arrivingFlights)
  to!: Destination

  @Column()
  departureTime!: Date

  @Column()
  arrivalTime!: Date

  @Column()
  cabinClass!: string

  @Column({ nullable: true, type: "float" })
  price?: number

  @Column({ nullable: true, type: "int" })
  popularity?: number

  @Column({ nullable: true, type: "int" })
  duration?: number

  @Column({ nullable: true, type: "int" })
  stops?: number

  @Column({ nullable: true, type: "simple-array" })
  amenities?: string[]

  @OneToMany(() => Booking, (booking: Booking) => booking.flight)
  bookings!: Booking[]
}