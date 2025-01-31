import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: false })
  firstName: string

  @Column({ nullable: false })
  lastName: string

  @Column()
  address: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  postalCode: string

  @Column()
  dateOfBirth: Date

  @Column()
  cpf: string
}
