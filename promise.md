#介绍
`Promise` 是 `JavaScript` 异步编程的一种流程解决方案， 掌握 `Promise`的使用是我们不可或缺的一项基本技能。但是要想熟练掌握并深入的理解它，还是必须知道它的实现原理的，这节课就是从具体使用角度出发，使用原生手写方式一步一步的带你实现`Promise`库，而且不仅仅只是包含了`Promise`目前使用的功能，还有`Promise`的一些新的特性和未来即将支持的特性的介绍与实现

# 知识要点

Promise 类

Promise 状态

Promise.#resolve 方法

Promise.#reject 方法

Promise.then 方法

Promise.cattch 方法

Promise.finally 方法 （ECMA208 Add）

Promise.resolve 方法

Promise.reject 方法

Promise.all 方法

Promise.race 方法

Promise.allSellted 方法

# 学习目标

* 了解`Promise`基本实现原理

* 深入掌握`Promise`的使用细节

* 了解`Promise`未来新标准新特性

# 学前须知

本次`Promise`源码课程中会涉及到面向对象的使用，所以如果你能知道一些面向对象的知识，会更加有利于理解

# Promise 类

`Promise`的构造函数必须接收一个函数参数（也就是要执行异步任务的函数），该函数将在传入以后立即调用，并传入`Promise`对象下的两个方法`resolve`和`reject`

# Promise 状态

每一个`Promise`对象都存在以下三种状态：

* PENDING：进行中哦，`Promise`对象的初始状态

* FULFILLED：已成功
* REJECTED：已失败

> 每一个Promise 对象只能由 `PENDING` 状态变成`FULFILLED` 或`REJECTED` ，且状态发生变化以后就不能再改变了----记住这个特性

一个`Promise`对象状态的变化并不由`Promise` 对象本身来决定，而应该是由我们传入的异步任务完成情况来决定的，	`Promise` 提供了两个用来改变状态



# Promise.#resolve 方法

将`Promise`对象的状态从`PENDING`	变为`FULFILLD`，并执行成功后的注册任务

> 如果当前状态已经改变过了，则直接return

# Promise.#reject 方法

将`Promise`对象的状态从`PENDING`	变为`FULFILLD`，并执行失败后的注册任务

> 如果当前状态已经改变过了，则直

# Promise.#then 方法

`then`是`Promise` 对象提供的一个方法，它接收两个函数作为参数，分别注册到`resolve`和`reject`

方法执行的任务队列中，我们需要在`Promise`中维护两个队列

* fulfilledQueues

* rejectedQueues

  

  上面是默认情况下的处理情况，其实`then`方法的处理更为复杂

> 当一个`Promise`完成(fulfilled) 或者失败（rejected）, 返回函数将被异步调用（由当前的线程循环来调度		完成）具体的返回值依赖以下规则返回：
>
> 		*	如果then中的回调函数没有返回值，那么then返回的Promise将会成为接收状体，并且该接受状态的回调函				数的参数值为undefined
> 		*	如果then中的回调函数返回一个值，那么then返回的Promise 将为成为接受状态，并且该接收状态的回调函数的		 参数值为undefined
> 		* 如果then中的回调函数返回一个值，那么then返回的Promise将会成为接收状态，并且将返回的值作为接收状态		的回调函数的参数值
> 		* 如果then中的回调函数返回一个错误，那么then返回的Promise将会成为拒绝状态，并且将抛出的错误作为拒绝		状态的回调函数的参数值
> 		*	如果then中的回调函数返回一个已经是接收状态的Promise,那么then返回的Promise也会成为接收状态，并且			将那个Promise的接收状态的回调函数的参数值作为该被返回的Promise的接受状态回调函数的参数值
> 		*	如果then中的回调函数返回一个已经是拒绝状态的Promise,那么then返回的Promise也会成为拒绝状态，并			且将那个Promise的拒绝状态的回调函数的参数值作为该被返回的Promise的拒绝状态回调函数的参数值
> 		*	如果then中的回调函数返回一个已经是未定义状态(pending)的Promise,那么then返回的Promise的状态也是		 未定义的，并且它的终态与那个Promise的终态相同，同时，它变为终态时调用的回调函数参数与那个Promise			变成终态时的回调函数的参数是相同的