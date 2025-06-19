import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { Flight } from "./Flight"
import { Passenger } from "./Passenger"
import { Payment } from "./Payment"

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  bookingReference!: string

  @ManyToOne(() => User, (user: User) => user.bookings)
  user!: User

  @ManyToOne(() => Flight, (flight: Flight) => flight.bookings)
  flight!: Flight

  @OneToMany(() => Passenger, (passenger: Passenger) => passenger.booking)
  passengers!: Passenger[]

  @OneToMany(() => Payment, (payment: Payment) => payment.booking)
  payments!: Payment[]

  @Column()
  status!: string
}