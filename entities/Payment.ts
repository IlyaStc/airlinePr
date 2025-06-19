import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Booking } from "./Booking"

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Booking, (booking: Booking) => booking.payments)
  booking!: Booking

  @Column()
  amount!: number

  @Column()
  method!: string

  @Column()
  status!: string

  @Column()
  paidAt!: Date
}