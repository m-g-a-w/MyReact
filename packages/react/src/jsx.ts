//ReactElement
import { REACT_ELEMENT_TYPE } from '../shared/ReactSymbols';
import { Type, Key, Ref, Props, ReactElementType } from '../shared/ReactTypes';

const ReactElement = function (
	type: Type, //组件的type，即标签名
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'mgaw'
	};
	return element;
};

export const jsx = (type: Type, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;
	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val != undefined) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val != undefined) {
				ref = val;
			}
			continue;
		}
		//如果是自己的props就赋值，如果是原型上的props就不进行赋值
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}
	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		//说明有多余的children
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else props.children = maybeChildren;
	}
};

export const jsxDEV = jsx;
