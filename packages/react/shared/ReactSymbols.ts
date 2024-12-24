//ReactSymbol的作用：为了防止滥用ReactElement，将ReactElement定义成独一无二的值
const supportSymbol = typeof Symbol === 'function' && Symbol.for;
//判断是否支持Symbol，如果支持则返回Symbol，如果不支持则返回一个数字
export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac7;
