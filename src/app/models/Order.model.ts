import { Sender } from './Sender.interface';
import { Receiver } from './Receiver.interface';
import { Good } from './Good.interface';


export interface Order {

	_id: number;
	sender: Sender | null;
	goods?: Good[];
	receiver?: Receiver | null;
	id: number;
}