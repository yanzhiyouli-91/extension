---
outline: deep
---

# 环境准备

低代码平台IDE版本 `≧ 3.8`，node版本 `≧ 18.17`

## 安装命令行工具

```bash
npm install -g lcap
```

## 设置运行环境

依赖库全局配置如下：

![](/images/lcap-config.png)

设置可视化平台访问地址，* 为泛指，配置时更换为可视化平台访问地址即可。命令如下所示：

```bash
lcap config set platform *
```

![](/images/lcap-platform.png){data-zoomable}

## 设置身份验证信息

### 方式一：适用于通过账号密码登录平台的开发者

设置用户名信息，`*` 为泛指，配置时更换为平台的登录用户名即可。命令如下所示：

```bash
lcap config set username *
```

设置用户密码信息，`*` 为泛指，配置时更换为平台的登录密码即可。命令如下所示：

```bash
lcap config set password *
```

### 方式二：适用于通过手机号验证登录，或其他方式登录平台的开发者。

设置lcap工具的授权信息，`*` 为占位符，配置该项时更换为token值即可。命令如下所示：

```bash
lcap config set authorization *
```

token值来源：打开浏览器的控制台-应用程序（Application），找到Cookies中当前页面部分，复制出 `authorization` 的 Cookies Value 值，可参考下图：

![](/images/cookie.png){data-zoomable}

注意事项：

* 通常情况token值会一天一过期，所以过期后要重复上述步骤更新authorization设置。

* 通过token设置身份验证信息的方式优先级会高于账户密码，所以后续如果使用账户和密码设置身份验证信息，需要先手动删除authorization的设置，即执行下面的命令。

```bash
lcap config delete authorization
```

设置完成后，查看依赖库全局配置。命令如下所示：

```bash
lcap config list
```
