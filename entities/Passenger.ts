import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Booking } from "./Booking"

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @Column()
  dateOfBirth!: Date

  @Column()
  passportNumber!: string

  @Column({ nullable: true })
  nationality?: string

  @Column({ nullable: true })
  specialRequests?: string

  @ManyToOne(() => Booking, (booking: Booking) => booking.passengers)
  booking!: Booking
}