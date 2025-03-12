---
outline: deep
---

# popover 配置说明

类型为 "popover" 的组件为弹出框类的组件，这类组件一般分为两部分，触发弹出框和框体本身，触发部分一般不带本身的dom元素，以子组件的dom元素为触发事件来源。

```typescript
@ExtensionComponent({
  ideusage: {
    "idetype": "popover"
  }
}）
```

下文以 vue 模板为例，展示配置和翻译器生层代码的匹配关系。React 相似。

示例

以 react 的下拉菜单组件 Dropdown 为例：

<img src="../../../images//popover_202411201804_1.png" class="imgStyle" style="width:400px" />

```typescript
@ExtensionComponent({
        "ideusage": {
            "idetype": "popover",   
            "structured": true,
            "namedSlotOmitWrapper": ["menuItem"],
            "childAccept": {
                "default": "this.getDefaultElements().length < 1",
                "menuItem": "target.tag === 'MenuItem'"
            },
            "additionalAttribute": {
                "menu": "{{ triggerSubMenuAction: 'click' }}",
                "trigger": "{['click']}"
            },
        } 
})
```

翻译后的模板为：

```typescript
<Dropdown key="component-7ce766fcfbea49b2a4e05497bda00fc5" 
    menu={{ triggerSubMenuAction: 'click' }} 
    trigger={['click']}
    menuItem={(()=> (<>
        <MenuItem data-nodepath="905aaedc246942ab960e37dac8c04456"
            data-anonymous-nodepath="de07f9185b2b4143b8df73699f7a8214" label="导航项目" path="https://www.baidu.com"
            key="component-905aaedc246942ab960e37dac8c04456" labelSlot={(()=> (<>
            <div data-nodepath="bb28a4999c1748e08c4f2c67dbd1316e">
                <EmptySlot data-emptyslot-nodepath="bb28a4999c1748e08c4f2c67dbd1316e"></EmptySlot>
            </div>
        </>))()} ></MenuItem>
        <MenuItem data-nodepath="f63421583fac4df78ecd8aa45a35488a"
            data-anonymous-nodepath="de07f9185b2b4143b8df73699f7a8214" label="导航项目2"
            key="component-f63421583fac4df78ecd8aa45a35488a" labelSlot={(()=> (<>
            <div data-nodepath="3a69cfcc46124eb299b760f70d29f807">
                <EmptySlot data-emptyslot-nodepath="3a69cfcc46124eb299b760f70d29f807"></EmptySlot>
            </div>
        </>))()} ></MenuItem>
    </>))()} >
    <Link data-nodepath="9cc435699e93484e80bfaa584e637567" 
        data-anonymous-nodepath="7ce766fcfbea49b2a4e05497bda00fc5"
        data-enable-interaction={bindref} 
        data-enable-events="click" 
        icon="RiArrowDownSLine" 
        children="按钮"
        key="component-9cc435699e93484e80bfaa584e637567" 
        data-editable="true">
    </Link>
</Dropdown>
```

由于Dropdown没有自己对应的dom元素，所以通过data-anonymous-nodepath附着在了内部的Link上，Dropdown的 menuItem 只接受 MenuItem 组件，所以通过namedSlotOmitWrapper去除了原本会注入的外层div元素。

## 配置项说明


### parentAccept

选配，定义可以放入当前组件的父组件。书写格式为`"parentAccept"："判断表达式"`，例如要求组件只能置入到面包屑组件 u-crumb 中：

```typescript
"parentAccept": "target.tag === 'u-crumb'"
```

### childAccept

选配，定义可以放入子组件的组件。书写格式为`"parentAccept"："判断表达式"`或`"parentAccept"：Object`。

- 表达式形式：

```typescript
 "childAccept": "target.tag === 'Radio'",
```

- 对象形式：key为slot中配置的名字，value是表达式

```typescript
"childAccept": {
    "default": "this.getDefaultElements().length < 1",
    "menuItem": "target.tag === 'MenuItem'"
  }
```

### selector

选配，若存在无法将data-nodepath 传入顶层DOM节点，可以通过设置此项绕行，绕行是通过向具体组件内部放入一个能够根据css选择器向上查找DOM节点的组件X。书写格式为：

```typescript
"selector": [
    {
        "expression": String,
        "cssSelector": String
    },
]
```

selector 中可以为包含 expression 和 cssSelector 的对象或对象的数组。

- expression: 从当前节点查找塞入组件X的位置；
- cssSelector: X组件所使用的css选择器。

### structured

选配，定义当前组件的子组件的插入方式。书写格式为`"structured"：true`或`"structured"： false`。

- true：表示通过设计器内菜单中"+"插入；
- false：表示通过拖拽插入。


### additionalAttribute

选配，定义设计器内组件展示时额外传入的属性。书写格式为`"additionalAttribute"： { key: value }` 。

**示例**

要求取消 react modal 在设计器里的弹出动画：

```typescript
@ExtensionComponent({
    "ideusage": {
      "idetype": "modal",
      ...
      "additionalAttribute": {
        "transitionName": "''", 
        "maskStyle": "{{opacity: 1,animationDuration: '0s'}}"
      },
      "cacheOpenKey": "open"
    }
})
```

> 需要注意，传入的键值对将直接放入模板翻译结果，需要对 " 等特殊符号做转义。

**IDE 中的效果**

拖拽生成组件后，在页面设计器中生成的代码如下：

```typescript
<Modal okText="确定" cancelText="取消" 
        key="component-24445f4bd7be4acdb923d4e53c06fe58" 
        open={true} 
        transitionName=''
        maskStyle={{opacity: 1,animationDuration: '0s'}} 
        title={...} 
        footer={...}>
        ...
</Modal>
```
