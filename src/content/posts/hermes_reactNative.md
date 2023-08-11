---
template: blog-post
title: A Deeper Dive on How Hermes Works in React Native
slug: /hermes-react-native
date: 2023-06-07T00:00:00.000Z
description: Hermes - React Native
featuredImage: /assets/hermes_rn.png
---
**How does Hermes work and what's different now that it's the default engine for RN**

As software engineers, it is essential to not only understand the frameworks we are working with but also the underlying mechanisms of those technologies. By getting to know these mechanics, it aids in understanding how our applications will operate and how to fix them as we experience bugs or breaking changes in development. In this article, we will focus on Hermes, the JavaScript engine used in React Native and its advantages. React Native is a JavaScript framework developed by Facebook for building native mobile applications on both iOS and Android devices. It was released in 2015 and has been going through various upgrades since then. The JavaScript engine in this framework is the component that compiles the JavaScript source code to bytecode.

![Hermes Stats](../assets/hermes.stats.png "stats directly from official Hermes site")

Hermes was introduced in 2019 and has since replaced JavaScriptCore and Chakra (used in RN for windows) as the default javascript engine for React Native starting from version 0.70. Hermes provides a number of benefits to React Native compared to the aforementioned engines such as smaller app size, reduced memory usage and improved start-up times. It achieves these performance advantages by using a compiler ahead of time, this converts the source code into bytecode at build time rather than at run time.

![React Native without Hermes](../assets/hermes.withoutHermes.png "Interpretation without Hermes")

![React Native with Hermes](../assets/hermes.withHermes.png "Interpretation with Hermes")

This process is further enhanced with several components of Hermes. The Hermes Intermediate Representation (IR) is used to represent the JavaScript source code, while the Hermes optimizer transforms the IR into a more efficient representation that preserves the original semantics of the program. This more efficient representation is then provided to the Hermes Virtual Machine (VM), which then deserializes the bytecode from the file and interprets it at runtime. Finally, the Hermes VM plays host to the Hades garbage collector (GC), which monitors memory allocation and reclaims any blocks of memory no longer needed. Hades was created to improve the pause times observed with GenGC, and it does so by running its GC work on a separate thread concurrently with the interpreter managing the Javascript code — in comparison, GenGC runs on a single thread shared with the interpreter. This has resulted in pause times up to thirty times shorter on 64 bit devices. By combining the IR, optimizer, HadesGC, and VM, Hermes enables shorter build times, improved startup speed, smaller app size, and decreased memory usage during development of React Native applications.

In conclusion, Hermes is a JavaScript engine that was included in React Native in 2019 and has been implemented as the default engine since version 0.70. Hermes provides a number of advantages such as improved start up time, decreased memory usage, smaller app size, and a reduced build time due to its IR, optimizer, and Hades garbage collector. These elements combine to make Hermes a powerful and efficient tool that software engineers use everyday to effectively build applications for React Native. Knowing these tools that make up the framework come in handy not only for a full understanding of the operation of the framework, but also in development, debugging and issues such as breaking changes in version upgrades of dependencies. As such, finer knowledge of our frameworks are an invaluable resource for software engineers today and their development will continue to make React Native quicker, easier, and more effective to use in upcoming years.


# Resources

[Design Overview | Hermes (hermesengine.dev)​](https://hermesengine.dev/docs/design/)

[Andrew's study - We have done some internal tests of Hermes on a RN experience within Microsoft O… | Hacker News (ycombinator.com)](https://news.ycombinator.com/item?id=20413046)

[RN site runtime engine studies Toward Hermes being the Default · React Native](https://reactnative.dev/blog/2021/10/26/toward-hermes-being-the-default)

[Bytes #109 — what exactly are the differences between JSC and V8?](https://bytes.dev/archives/109)

[vjeux ✪ on Twitter: “@jarredsumner Fwiw, JSC greatly outperformed V8 7 years ago in the context of React Native.” / Twitter](https://twitter.com/Vjeux/status/1546440856059666432?s=20&t=IeIL3nYIDtbdBkaSfU8-Yw)
