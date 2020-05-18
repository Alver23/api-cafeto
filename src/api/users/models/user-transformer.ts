export class UserTransformer {
	public id: string;

	public name: string;

	public email: string;

	constructor(values: any) {
		({ id: this.id, name: this.name, email: this.email } = values);
	}
}
