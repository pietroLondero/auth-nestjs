import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Role } from "./Role.entity";
import { User } from "./user.entity";

// group.entity.ts
@Entity({ name: 'group' })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ unique: true })
  code: string;

  @ManyToMany(() => Role, role => role.groups, { cascade: true })
  @JoinTable({ name: 'group_roles' })
  roles: Role[];

  @ManyToOne(() => Group, parent => parent.children, { nullable: true })
  parent: Group;

  @OneToMany(() => Group, child => child.parent)
  children: Group[];

  @ManyToMany(() => User, user => user.groups)
  users: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
