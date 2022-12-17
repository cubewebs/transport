import { Sender } from './Sender.interface';
import { Receiver } from './Receiver.interface';
import { Good } from './Good.interface';


export class Order {

	public id: number = 0;
	public goods: Good[];
	public sender: Sender;
	public receiver: Receiver;

	constructor( sender: Sender, receiver: Receiver, goods: Good[] ) {
		this.sender = sender;
		this.receiver = receiver;
		this. goods = goods;
	}
	
}