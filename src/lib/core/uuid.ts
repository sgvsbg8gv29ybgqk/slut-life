import { browser } from '$app/environment';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export default function uuid() {
	return browser ? uuidv4() : crypto.randomUUID();
}
