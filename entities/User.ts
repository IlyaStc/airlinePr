import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Booking } from "./Booking"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @OneToMany(() => Booking, (booking: Booking) => booking.user)
  bookings!: Booking[]
}