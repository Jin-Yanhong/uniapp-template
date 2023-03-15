## 项目代码说明

-   本项目是基于 `vue2.0` 版本的 `uniapp模板` 项目，使用 `npm`作为包管理器
-   接口路径位于 `/api/apiUrls.js` 下，并统一默认导出
-   全局方法在 `/utils/index.js` 下
-   页面公用 CSS 样式位于 `/style/globel.less` 文件下
-   部分字段的常量在 `/static/constant.js` 下，统一维护
-   `httpBaseurl` 、`ImageBaseUrl` 在 `/app.js` 下
-   封装的方法有

    -   isLogin
    -   httpRequest
    -   fileUpload
    -   handleRedirect
    -   navTo
    -   switchTab
    -   redirectTo
    -   navBack
    -   showToast
    -   showLoading
    -   hideLoading
    -   confirmModal
    -   startRefresh
    -   stopRefresh
    -   reachBottom
    -   pageShare
    -   listHttpRequest
    -   getDictData
    -   setStorageItem
    -   getStorageItem
    -   removeStorageItem
    -   dateFormater
    -   fieldTranslate

## 功能说明

1. 其中页面导航功能可根据业务需要添加用户登录校验，具体用法参考文档注释或源码

2. 列表页面 `listHttpRequest` 具备触底加载更多，下拉刷新功能，具体用法参照 `/pages/list` 页面

## 项目启动方式

1. 在项目根目录下执行

    ```
    npm i
    ```

2. 使用 `HBuilderX` 直接运行
    > 目前 HBuilderX ，后续会调整使用命令行的方式运行

## 代码风格检查

1.  在项目根目录下执行

    ```
    npm run lint
    ```
