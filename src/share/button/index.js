// botton组件设置
import React from 'react';
import classnames from 'classnames';
import './index.css';
import {defaultProps} from './defaultProps';
import TouchFeedback from 'rmc-feedback';

// 中文字符的正则表达式
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
// 判断是否是两个字符
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
// test()方法用于检测一个字符串是否匹配某个模式
// 判断是否为字符类型
function isString(str){
    return typeof str === 'string';
}
// 判断若是两个中文字符则插入空格
function insertSpace(child){
    // child.type表示isString(str)中的str的类型
    // child.props.children表示获取isTwoCNChar的所有子节点
    if(isString(child.type)&&isTwoCNChar(child.props.children)){
        return React.cloneElement(
            // React.cloneElement()克隆并返回一个新的 ReactElement
            // React.cloneElement(TYPE，[PROPS]，[CHILDREN])
            // TYPE（ReactElement），[PROPS（object）]，[CHILDREN（ReactElement）]
            child,{},child.props.children.split('').join(' '),
        );
    }
    if(isString(child)){
        if(isTwoCNChar(child)){
            child = child.split('').join(' ');
        }
    }
    return child;
}
// export导出Button组件
export default class Button extends React.Component{
    // static用于定义静态属性或者方法
    static defaultProps = defaultProps;
    handleClick(){
        const { onClick } = this.props;
        // 等价于const onClick = this.props.onClick，ES6简写形式
        if(onClick){
            onClick();
        }
    };
    render(){
        const {prefixCls,type,children,className} = this.props;
        // 使用classnames来动态判断是否为组件添加class
        const wrapCls = classnames(prefixCls,className,{
            ['${prefixCls}-btn']:(type === 'primary'||!type),
            ['${prefixCls}-btn-fill']:type === 'fill',
            ['${prefixCls}-btn-half']:type === 'half',
        });
        const kids = React.Children.map(children,insertSpace);
        return(
            <TouchFeedback activeClassName = {prefixCls + '-active'}>
                <div className = {wrapCls} onClick={() => this.handleClick()}>
                    {kids}
                </div>
            </TouchFeedback>
        )
    }
}