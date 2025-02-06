import { User } from 'src/user/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  accountId: string

  @Column()
  agency: string

  @Column()
  ammount: string

  @ManyToOne(() => User, (user) => user.accounts)
  user: User
}
