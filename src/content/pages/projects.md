---
template: projects-page
slug: /projects
title: Projects - Past, Present and Future
---
![Projects](../assets/projectboard.jpg "looking at project board")

Thanks for checking out what I’m up to.  I just finished up working on a CyberSecurity product by Moot inc after working with Microsoft for a year and a half. Before that, I maintained an open-source microservice monitor, Venus, maintained by OsLabs while working on developing applications with colleagues and on blockchain with GimbaLabs. 

# Microsoft | Full stack Engineer

![Microsoft Logo](../assets/MicrosoftLogo.jpg "logo for Mirosoft")

I was extremely fortunate to work with *Microsoft* as a Full Stack Software Engineer. While there, I saw my team almost double and had the opportunity to mentor the engineers who joined as we built, tested, and shipped a new payment app worldwide to improve the latency on our payment forms by 400%. This role involved a deep understanding of React and React Native as we built out the RN sdk with customizable components that were used to create the user stories. On the backend, I worked in C# and .Net making sure that the REST calls and data for different payment operations were correct. This was the payment system that was integrated throughout the company, so all deployments involved heavy monitoring of user telemetry and code changes involved robust testing. I also built out and created automation testing on our internal tool for testing the UI/UX of user stories that are used in over 100+ countries and by 100 million+ users on Xbox. 

# OsLabs | Project Venus
![Venus Logo](../assets/venus3.png "logo for Venus")

*OsLabs* is an open source community that brings together talented engineers to work together on developer-facing products.  I had the opportunity to be part of their front-end team for *Venus*, a service endpoint monitoring application in Node.js/Electron.  My responsibilities entailed producing rich data visualizations for the view along with designing the component hierarchy/flux architecture pattern.


This application was built in React and contained a variety of charts and graphs based on endpoint performance metrics.  For example, if you were pinging Google’s weather API with our product, *Venus* would be serving you both real time (short time interval) and historic (long time interval) data.  The data visualization libraries we used to present this information were Visx/D3/React Charts and Ant Design Charts.  

![Aggregated data](../assets/venusshot.png "logo for Venus")


The highlight of this project for me was a VisX/D3 dependency graph with endpoint nodes that changed color based on the real-time error rate.  I got to construct an algorithm to parse the giant backend object of endpoints and manipulate the data into the proper format for compatiblility with the VisX/D3 graph.  This dependency graph contained cartesian and polar layouts along with various orientations and link types.  The other graphs compared the historic data of various endpoint metrics in React and Ant Design Charts.

![Venus Logo](../assets/chartfocus.png "logo for Venus")

My other task was constructing the component/state architecture.  The decision was primarily between Redux and Context API…MobX was not on the table.  We decided on context API to implement SoC by storing the real-time, historic and global states as seperate contexts.  Using React hooks also made it easy to manipulate state in the contexts throughout the component architecture.

It was an honor to work with such talented engineers on a project putting the power of monitoring back into the hands of developers instead of paid services.  That being said, I did later find out about the open source monitoring tools [**Prometheus**](https://prometheus.io/) and [**Grafana**](https://grafana.com/) which I now use.

All in All, I'm grateful to have deepened my experience in data visualization in Node and broadening my knowledge from the matplotlib in Python with which I was familiar with from physics.  Going forward, making real-time and historic data and being able to create visualizations that show relationships that weren’t readily apparent is an underrated talent in data analytics, I urge you to check out my favorite data visualization artist Shirley Wu.

**[Monitoring Service Endpoints with Venus -Medium](https://oproldan1.medium.com/monitoring-service-endpoints-with-venus-cb74713de01)**

**[Venus Github](https://github.com/oslabs-beta/venus)**

# GimbaLabs | Educating and Growing the Cardano Community


![Blockchain](../assets/blockchain.png "blockchain")

I'm proud contributor to the open-source community and this blockchain development team. 

For a bit of background, Bitcoin was the first generation blockchain then Ethereum was second gen.  Cardano is the third generation blockchain and is predicted to be a major disruptor.  It focuses on solving problems in cryptocurrency related to scaling, interoperability and sustainability.  It also aims to democratize access to capital thereby ameliorating wealth discrepancy between 1st and 3rd world countries.  I won’t go into how it does all this but I will leave some links down below.

GimbaLabs is an educational open source community that recently received its second round of funding through Project Catalyst.  Project Catalyst allows Ada, Cardano's cyrpto, holders to vote in the development of Cardano based platforms and is funded by Cardano itself.  These Cardano-based platforms are organizations like GimbaLabs who submit a proposal on their project.  Since the funding, Gimbalabs has expanded its engineering team to create a host of tools for developers.

![Gimbalabs](../assets/gimbalabslearn.png "gimbalabs")

Within the developer team at Gimbalabs, we focus on creating simple dapps (decentralized apps) and dev tools to teach engineers how to interact with the Cardano blockchain in their own application development.  For example, our first project focuses on using NFTs as tickets to events.  So rather than an NFT as something of value, this aims to treat the NFT as merely a verification for the user.  We're doing this by utilizing an in house developer tool to use and access metadata on the Cardano blockchain.

While this is just our first project, we are hoping to produce a rich ecosystem of developer tools as we see Cardano release smart contracts and other features later this year.  Stay tuned!

**[Deep Dive Into Cardano](https://coinmarketcap.com/alexandria/article/a-deep-dive-into-cardano)**

**[Cardano homesite](https://cardano.org/)**

**[Gimbalabs homesite](https://gimbalabs.com/)**

**[in-house meta-data tool](https://github.com/repsistance/cardano-meta-handler)**

**[GimbaLabs receives funding!](https://iohk.io/en/blog/posts/2021/01/12/project-catalyst-the-first-winning-proposals/)**
