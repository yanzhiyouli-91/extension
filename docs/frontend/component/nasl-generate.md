---
outline: deep
---

# 实体自动化行为扩展

向页面拖拽实体后支持选择已经定义的示例。
![](/images/nasl-gen.png)

![](/images/gen-preview.gif){data-zoomable}

## 实现步骤

1. 在 ide 目录下创建 blocks 相关文件。

```
|-- ide
|----- blocks
|------- genLibrarayBlock.ts 
|------- index.ts
|---- index.js           // ide 扩展打包入口文件
```

2. 编写通过实体生成区块模板逻辑。

```typescript
// blocks/index.ts
import { genGetBlock } from './genLibrarayBlock';
export default [
  {
    scope: 'pc',  // pc，h5
    title: '依赖库测试',
    image: '', // 显示截图 base64,
    genBlock: (naslNode, refElement) => genGetBlock(naslNode, refElement), // 通过实体生成代码片段 
  },
];

```

`genBlock` 函数返回代码模板示例参考 [实体自动化行为扩展完整示例](#实体自动化行为扩展完整示例)

3. 入口文件导出 `blocks`

```typescript
// ide/index.js 
import genBlocks from './blocks/index';
export const blocks = genBlocks;
```

## 实体自动化行为扩展完整示例

代码片段分页页面部分和服务端逻辑部分：

```typescript
// 页面相关
export function view(id： Long) { // 页面输入参数
    // 页面变量
    // 生命周期
    // 页面逻辑
    // 页面组件
}

// 服务端逻辑
export namespace app.logics {}
```

完成代码片段示例：

```typescript
export function view(id: Long) {
  // 页面输入参数
  // 页面变量
  let entity1: app.dataSources.defaultDS.entities.Entity1;
  let input: app.dataSources.defaultDS.entities.Entity1;
  let filter: app.dataSources.defaultDS.entities.Entity1;
  let isUpdate: Boolean;

  // 生命周期
  const $lifecycles = {
    onCreated: [
      function init(event) {
        nasl.util.Clear(filter);
        return;
      },
    ],
  };

  // 页面组件: jsx编写
  return (
    <ULinearLayout direction="vertical">
      <ULinearLayout>
        <UForm layout="inline">
          <UFormItem
            layout="center"
            slotLabel={<UText text="property1"></UText>}
          >
            <UInput
              value={$sync(filter.property1)}
              placeholder="请输入property1"
            ></UInput>
          </UFormItem>
          <UFormItem
            layout="center"
            slotLabel={<UText text="property2"></UText>}
          >
            <UInput
              value={$sync(filter.property2)}
              placeholder="请输入property2"
            ></UInput>
          </UFormItem>
          <UFormItem
            layout="center"
            labelSize="auto"
          >
            <UButton
              color="primary"
              text="查询"
              onClick={function reload(event) {
                $refs.tableView_2.reload();
              }}
            ></UButton>
          </UFormItem>
        </UForm>
      </ULinearLayout>
      <ULinearLayout
        mode="flex"
        alignment="start"
        justify="end"
      >
        <UButton
          color="primary"
          text="创 建"
          onClick={function create(event) {
            isUpdate = false;
            input = nasl.util.Clone(entity1);
            $refs.saveModal_2.open();
          }}
        ></UButton>
      </ULinearLayout>
      <UTableView
        ref="tableView_2"
        dataSource={app.logics.loadTestBlock5TableView_2(elements.$ce.page, elements.$ce.size, elements.$ce.sort, elements.$ce.order, filter)}
        valueField="entity1.id"
        pagination={true}
        showSizer={true}
        pageSize={20}
        pageNumber={1}
      >
        <UTableViewColumn
          type="index"
          width={60}
          slotTitle={<UText text="序号"></UText>}
          slotExpander={(current) => <UTableViewExpander item={current.item}></UTableViewExpander>}
        ></UTableViewColumn>
        <UTableViewColumn
          field="entity1.createdTime"
          slotTitle={<UText text="创建时间"></UText>}
          slotCell={(current) => (
            <ULinearLayout gap="small">
              <UText text={current.item.entity1.createdTime}></UText>
            </ULinearLayout>
          )}
          slotExpander={(current) => <UTableViewExpander item={current.item}></UTableViewExpander>}
        ></UTableViewColumn>
        <UTableViewColumn
          field="entity1.updatedTime"
          slotTitle={<UText text="更新时间"></UText>}
          slotCell={(current) => (
            <ULinearLayout gap="small">
              <UText text={current.item.entity1.updatedTime}></UText>
            </ULinearLayout>
          )}
          slotExpander={(current) => <UTableViewExpander item={current.item}></UTableViewExpander>}
        ></UTableViewColumn>
        <UTableViewColumn
          field="entity1.property1"
          slotTitle={<UText text="property1"></UText>}
          slotCell={(current) => (
            <ULinearLayout gap="small">
              <UText text={current.item.entity1.property1}></UText>
            </ULinearLayout>
          )}
          slotExpander={(current) => <UTableViewExpander item={current.item}></UTableViewExpander>}
        ></UTableViewColumn>
        <UTableViewColumn
          field="entity1.property2"
          slotTitle={<UText text="property2"></UText>}
          slotCell={(current) => (
            <ULinearLayout gap="small">
              <UText text={current.item.entity1.property2}></UText>
            </ULinearLayout>
          )}
          slotExpander={(current) => <UTableViewExpander item={current.item}></UTableViewExpander>}
        ></UTableViewColumn>
        <UTableViewColumn
          slotTitle={<UText text="操作"></UText>}
          slotCell={(current) => (
            <ULinearLayout gap="small">
              <ULink
                text="修改"
                onClick={function modify(event) {
                  isUpdate = true;
                  input = nasl.util.Clone(current.item.entity1);
                  $refs.saveModal_2.open();
                }}
              ></ULink>
              <ULink
                text="删除"
                onClick={function remove(event) {
                  app.dataSources.defaultDS.entities.Entity1Entity.delete(current.item.entity1.id);
                  $refs.tableView_2.reload();
                }}
              ></ULink>
            </ULinearLayout>
          )}
          slotExpander={(current) => <UTableViewExpander item={current.item}></UTableViewExpander>}
        ></UTableViewColumn>
      </UTableView>
      <UModal
        ref="saveModal_2"
        slotTitle={
          <>
            <UText
              _if={isUpdate}
              text="修改"
            ></UText>
            <UText
              _if={!isUpdate}
              text="创建"
            ></UText>
          </>
        }
        slotBody={
          <UForm ref="saveModalForm_2">
            <UFormItem
              layout="center"
              slotLabel={<UText text="property1"></UText>}
            >
              <UInput
                value={$sync(input.property1)}
                placeholder="请输入property1"
              ></UInput>
            </UFormItem>
            <UFormItem
              layout="center"
              slotLabel={<UText text="property2"></UText>}
            >
              <UInput
                value={$sync(input.property2)}
                placeholder="请输入property2"
              ></UInput>
            </UFormItem>
          </UForm>
        }
        slotFoot={
          <ULinearLayout>
            <UButton
              _if={isUpdate}
              color="primary"
              text="提交修改"
              onClick={function updateSubmit(event) {
                if ($refs.saveModalForm_2.validate().valid) {
                  app.dataSources.defaultDS.entities.Entity1Entity.update(input);
                  $refs.saveModal_2.close();
                  $refs.tableView_2.reload();
                }
              }}
            ></UButton>
            <UButton
              _if={!isUpdate}
              color="primary"
              text="立即创建"
              onClick={function submit(event) {
                if ($refs.saveModalForm_2.validate().valid) {
                  app.dataSources.defaultDS.entities.Entity1Entity.create(input);
                  $refs.saveModal_2.close();
                  $refs.tableView_2.reload();
                }
              }}
            ></UButton>
          </ULinearLayout>
        }
      ></UModal>
    </ULinearLayout>
  );
}

// 服务端逻辑
export namespace app.logics {
  export function loadTestBlockTableView_1(page: Long, size: Long, sort: String, order: String, filter: app.dataSources.defaultDS.entities.Entity2) {
    let result;
    result = PAGINATE(
      FROM(app.dataSources.defaultDS.entities.Entity2Entity, (Entity2) =>
        $.LEFT_JOIN(app.dataSources.defaultDS.entities.Entity1Entity, (Entity1) => ON(Entity2.property1 == Entity1.property1))
          .WHERE(Entity2.property1 == filter.property1 && LIKE(Entity2.property2, filter.property2))
          .ORDER_BY([sort, order])
          .SELECT({
            entity2: Entity2,
            entity1: Entity1,
          })
      ),
      page,
      size
    );
    return result;
  }
}
```

## JSX和TS语法点说明
### 页面输入参数

![](/images/input-params.png)

**JSX/TS**

```ts
id: Long

// 写在view的输入参数里
export function view(id: Long) { }
```

注意点

* id名需要唯一。

```typescript
(${nameGroup.viewParamId}: Long)
```

### 页面变量

![](/images/gen-var.png)

**JSX/TS**

```typescript
let entity1: app.dataSources.defaultDS.entities.Entity1;

// 写在view的内部
export function view(id： Long) { 
  let entity1: app.dataSources.defaultDS.entities.Entity1;
}
```

**注意点**

* 变量名需要唯一。

```typescript
let ${nameGroup.viewVariableEntity}: ${entity.getNamespace())}.${entity.name}};
```

### 生命周期

![](/images/gen-lifecycle.png)

**JSX/TS**

```typescript
const $lifecycles = {
  onCreated: [
    function init(event) {
      nasl.util.Clear(filter);
      return;
    },
  ]
}
```

**注意点**

* 所有生命周期函数都放于`$lifecycles`变量下。生命周期函数名都以`on`开头，可写`onCreated`、`onMounted`、`onUpdated`、`onDestroyed`。
* 方法名需要唯一。

```typescript
function ${nameGroup.viewLogicInit}(event) {}
```

### 页面逻辑

![](/images/gen-logic.png)

**JSX/TS**

```ts
export function view(id： Long) { 
  function logic1(/*输入参数*/) {
  }
}
```

**注意点**

* 写在view的内部。
* 逻辑名需要唯一。

```typescript
function ${nameGroup.viewLogic1}() {}
```
### 组件

![](/images/gen-component.png)

**JSX/TS**

```tsx
export function view(id： Long) { 
  return (
    <UForm layout="inline" ref="form1">
      <UFormItem
        layout="center"
        slotLabel={
          <UText text="property1"></UText>
        }
      >
        <UInput value={$sync(filter.property1)} placeholder="请输入property1"></UInput>
      </UFormItem>
      <UFormItem
        layout="center"
        slotLabel={
          <UText text="property2"></UText>
        }>
          <UInput value={$sync(filter.property2)} placeholder="请输入property2"></UInput>
        </UFormItem>
      <UFormItem layout="center" labelSize="auto">
        <UButton
          color="primary"
          text="查询"
          onClick={
            function reload(event) {
              $refs.tableView_2.reload()
            }
          }
        >
        </UButton>
      </UFormItem>
    </UForm>
  );
}
```

**注意点**

* 注意节点前需要有`return`关键字。
* `ref`名需要唯一。

```typescript
ref="${nameGroup.viewElementMainView}"
```

### 组件属性

#### 属性值为字符串

**JSX/TS**

```typescript
layout="center"
```

#### 属性值为表达式/数值/布尔

**JSX/TS**

```typescript
text={current.item.entity1.createdTime}
width={60}
value={true}
```

#### 属性值双向绑定

**JSX/TS**

```typescript
value={$sync(input.property1)}
```

**注意点**

* 以`$sync()`函数包裹。

#### 数据源是后端逻辑

**JSX/TS**

```typescript
dataSource={app.logics.loadTestTableBlockSelect_1Entity2(elements.$ce.page, elements.$ce.size)}
```

**注意点**

* `app.logics` 为 `namespace`，所有引用后端逻辑的地方都需要填写完整的 `namespace`。如果参数是组件的`page`、`size`，需要以`elements.$ce`开头。

#### 数据源是枚举列表

**JSX/TS**

```typescript
dataSource = {nasl.util.EnumToList<app.enums.Enum1>()}
```

**注意点**

* 枚举类型写于泛型中。

#### 数据源是变量

**JSX/TS**

```typescript
dataSource = { variable1 }
```

#### 数据源是页面逻辑

**JSX/TS**

```typescript
dataSource={ logic1() }
```

**注意点**

* 页面逻辑不需要写 `namespace`。

### 组件插槽

名称都以 `slot` 作为前缀，后面跟插槽名，如 `slotTitle`。

注意：如果插槽名是中划线形式，如 `picker-top`，插槽名需要写成 `slot-picker-top`。

#### 默认插槽default

**JSX/TS**

```tsx
<UForm>
  <UFormItem></UFormItem>
</UForm>
```

#### 普通插槽

**JSX/TS**

```tsx
slotTitle={
  <UText text="操作"></UText>
}
```

#### 当对外层没有节点包裹时，需要加一个空标签包裹

**JSX/TS**

```tsx
slotTitle={
  <>
    <UText _if={isUpdate} text="修改"></UText>
    <UText _if={!isUpdate} text="创建"></UText>
  </>
}
```

#### slotScope插槽

**JSX/TS**

以函数形式，入参是current。

```tsx
slotCell={
  (current) => <ULinearLayout gap="small">
      <UText text={current.item.entity1.createdTime}></UText>
  </ULinearLayout>
}
```

#### 插槽名为中划线

**JSX/TS**

```tsx
slot-picker-top={
  <>
    <VanPickerActionSlot targetMethod="cancel">
      <VanIconv name="left-arrow" icotype="only"></VanIconv>
    </VanPickerActionSlot>
    <VanPickerActionSlot targetMethod="confirm">
    </VanPickerActionSlot>
  </>
}
```

### 组件事件

以`on`开头，后面跟事件名称。

![](/images/gen-event.png)

**JSX/TS**

`updateSubmit` 为函数名

```tsx
onClick={
  function updateSubmit(event) {
    if ($refs.saveModalForm_2.validate().valid) {
      app.dataSources.defaultDS.entities.Entity1Entity.update(input);
      $refs.saveModal_2.close();
      $refs.tableView_2.reload();
    }
  }
}
```

**注意点**

* `$refs.tableView_2` 需要与组件上绑定的 `ref` 名称对应。

### 组件指令

#### if指令

**JSX/TS**

需要写成`_if`。

```tsx
<UText _if={isUpdate} text="修改"></UText>
```

### 服务端逻辑

**JSX/TS**

```ts
export namespace app.logics {
     export function loadTestBlock5TableView_2(page: Long, size: Long, sort: String, order: String, filter: app.dataSources.defaultDS.entities.Entity1) {
     }
     export function loadTestBlock5TableView_3(page: Long, size: Long, sort: String, order: String, filter: app.dataSources.defaultDS.entities.Entity1) {}
}
```

#### 调用实体逻辑

**JSX/TS**

```ts
app.dataSources.defaultDS.entities.Entity1Entity.update(input)
```

**注意点**

* 实体有`create`、`update`、`get`等方法。调用的写法注意：`app.dataSources.defaultDS.entities`这个是实体的`namespace`。
* `Entity1Entity`，需要`实体名+Entity`结尾。最后调用对应的方法。

#### 数据查询里的实体

**JSX/TS**

```ts
export function loadTestBlockTableView_1(page: Long, size: Long, sort: String, order: String, filter: app.dataSources.defaultDS.entities.Entity2) {
  let result;
  result = PAGINATE(
    FROM(
      app.dataSources.defaultDS.entities.Entity2Entity, Entity2 => 
      $.LEFT_JOIN(app.dataSources.defaultDS.entities.Entity1Entity, Entity1 => ON(Entity2.property1 == Entity1.property1)) 
      .WHERE(Entity2.property1 == filter.property1 && LIKE(Entity2.property2, filter.property2))
      .ORDER_BY([sort, order])
      .SELECT({
          entity2: Entity2,
          entity1: Entity1
      }),
    ),
    page,
    size,
  )
  return result;
}  
```

**注意点**

* `FROM`，`JOIN`：`app.dataSources.defaultDS.entities.Entity2Entity`， 需要加一个`Entity`结尾。

## 逻辑部分TS语法文档

function内的TS部分查看：[NASL-Logic 逻辑](http://nasl.codewave.163.com:8080/docs/current/ast/basics/Logic__)

## 示例代码

### genLibrarayBlock.ts

```ts
import {
  filterProperty,
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
} from './utils';
import { genQueryLogic, genFormItemsTemplate } from './genCommonBlock';

function genCreateFormTemplate(entity, nameGroup, selectNameGroupMap) {
  const namespace = entity.getNamespace();
  const properties = entity.properties.filter(filterProperty('inForm'));
  nameGroup.vModelName = nameGroup.viewVariableEntity;

  return `<UForm ref="${nameGroup.viewElementMainView}">
            ${genFormItemsTemplate(entity, properties, nameGroup, selectNameGroupMap)}
            <UFormItem
                layout="center">
                <UButton
                    color="primary"
                    text="立即创建"
                    onClick={
                        function ${nameGroup.viewLogicSubmit}(event) {
                            if ($refs.${nameGroup.viewElementMainView}.validate().valid) {
                                ${namespace}.${entity.name}Entity.create(${nameGroup.viewVariableEntity})
                                nasl.ui.showMessage('创建成功！')
                            }
                        }
                    }></UButton>
            </UFormItem>
        </UForm>`;
}

export function genCreateBlock(entity, refElement) {
  const likeComponent = refElement?.likeComponent; // 页面或者业务组件
  const dataSource = entity.parentNode; // 数据源
  const module = dataSource.app;
  const namespace = entity.getNamespace();
  const entityName = entity.name;
  const entityFullName = `${namespace}.${entityName}`;

  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    viewElementMainView: likeComponent.getViewElementUniqueName('form1'),
    viewVariableEntity: likeComponent.getVariableUniqueName(firstLowerCase(entity.name)),
    viewLogicSubmit: likeComponent.getLogicUniqueName('submit'),
  };

  // 收集所有和本实体关联的实体
  const selectNameGroupMap = new Map();
  const newLogics = [];
  entity.properties.forEach((property) => {
    // 有外键关联
    if (property.relationEntity) {
      const relationEntity = dataSource?.findEntityByName(property.relationEntity);
      if (relationEntity) {
        const displayedProperty = getFirstDisplayedProperty(relationEntity);
        if (displayedProperty) {
          const viewElementSelect = likeComponent.getViewElementUniqueName('select');
          const selectNameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementSelect, false, relationEntity.name);
          selectNameGroup.viewElementSelect = viewElementSelect;
          // 存在多个属性关联同一个实体的情况，因此加上属性名用以唯一标识
          const key = [property.name, relationEntity.name].join('-');
          selectNameGroupMap.set(key, selectNameGroup);
          const newLogic = genQueryLogic([relationEntity], selectNameGroup, false, false, module);
          newLogics.push(newLogic);
        }
      }
    }
  });

  return `export function view() {
    let ${nameGroup.viewVariableEntity}: ${entityFullName};
    return ${genCreateFormTemplate(entity, nameGroup, selectNameGroupMap)}
  }
    export namespace app.logics {
        ${newLogics.join('\n')}
    }
    `;
}
```

所有插到页面上的输入参数、变量、逻辑名，ref名，都需要根据取名生成一个唯一名称。可以放在nameGroup里，需要的时候使用。实体、页面实例上有一些getViewElementUniqueName等方法可以使用。

### utils.ts

```ts
export const filterProperty = (key) => (property) => {
  if (property.display) {
    return property.display[key];
  }
  return !['id', 'createdTime', 'updatedTime'].includes(property.name);
};

export const firstUpperCase = (value) => value.replace(/^\S/, (letter) => letter.toUpperCase());
export const firstLowerCase = (value) => value.replace(/^\S/, (letter) => letter.toLowerCase());

export function transEntityMetadataTypes(typeAnnotation, app) {
  let { typeName: propertyTypeName } = typeAnnotation || {};
  if (typeAnnotation?.typeNamespace?.endsWith('.metadataTypes')) {
    const referenceNode = app.findNodeByCompleteName(`${typeAnnotation.typeNamespace}.${typeAnnotation.typeName}`) || {};
    const { typeName } = referenceNode.typeAnnotation || {};
    propertyTypeName = typeName;
  }
  return propertyTypeName;
}

export function getFirstDisplayedProperty(entity) {
  let property = entity.properties.find((property) => !property.readonly);
  if (!property) property = entity.properties[0];
  return property;
}

function capFirstLetter(word) {
  if (!word) return word;

  return word[0].toUpperCase() + word.slice(1);
}

/**
 * 生成数据查询唯一的命名组
 * @param viewName 页面名称
 * @param componentName 组件名称
 * @param suffix 其它后缀，比如实体名等等
 * @param defaultInView 是否在页面逻辑中用 load 简写
 */
export function genUniqueQueryNameGroup(
  scope,
  view,
  componentName,
  defaultInView,
  suffix,
) {
  const result = {};
  result.viewLogicLoad = view?.getLogicUniqueName?.(`load${defaultInView ? '' : capFirstLetter(componentName)}${suffix ? capFirstLetter(suffix) : ''}`);
  result.logic = scope?.getLogicUniqueName?.(
    `load${capFirstLetter(view.name)}${componentName ? capFirstLetter(componentName) : ''}${suffix ? capFirstLetter(suffix) : ''}`,
  );
  result.structure = scope?.getStructureUniqueName?.(firstUpperCase(`${result.logic}Structure`));
  return result;
}

export function getEntityPromaryKeyProperty(entity) {
  return entity.properties.find((p) => p.primaryKey)?.name || 'id';
}
```

## 功能演示

![](/images/gen-preview1.gif){data-zoomable}
