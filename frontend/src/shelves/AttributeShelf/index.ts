import { makeAutoObservable } from "mobx";

export class AttributeShelf<T> {
	public value: T;

	constructor(value: T) {
		this.value = value;
		makeAutoObservable(this);
	}

	public get noNullValue(): NonNullable<T> {
		return this.value!;
	}

	public set = (value: T): void => {
		this.value = value;
	};
}
