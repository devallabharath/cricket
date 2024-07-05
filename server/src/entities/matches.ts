import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Matches extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	timestamp!: string

	@Column()
	teamA!: number

	@Column()
	teamB!: number

	@Column("simple-array")
	squadA!: number[]

	@Column("simple-array")
	squadB!: number[]

	@Column("int", {nullable: true})
	common!: number | null

	@Column()
	won!: string

	@Column()
	by!: number

	@Column()
	with!: string
}
