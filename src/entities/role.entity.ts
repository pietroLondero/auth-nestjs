import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Group } from "./group.entity";

// role.entity.ts
@Entity({ name: 'role' })
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @Column({ unique: true })
    code: string;

    @ManyToMany(() => Group, group => group.roles)
    @JoinTable({ name: 'group_roles' })
    groups: Group[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
