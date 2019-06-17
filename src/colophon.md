---
layout: page
title: Colophon
permalink: /colophon/
include: false
about: true
---

*Digital Analysis of Syriac Handwriting (DASH)* is a bespoke web application that enables scholars to build custom scriptcharts from and view Syriac manuscripts. On the front-end, the scriptchart is a [React](https://reactjs.org/) application housed within a static website built with [Jekyll](https://jekyllrb.com/). It uses [Webpack](https://webpack.js.org/) to build the Javascript bundle and [Bulma](https://bulma.io/) as a CSS framework.

A [Django](https://www.djangoproject.com/) application provides an API that supplies data from a MySQL database to the Scriptchart application. The same Django application provides an administrative interface for project participants to manage data about the manuscripts and letter examples, and allows investigators to identify new letter examples. 

DASH is hosted on shared hosting from [Reclaim Hosting](https://reclaimhosting.com/). 

Feel free to check out the [front-end code](https://github.com/sul-cidr/scriptchart/) and the [back-end](https://github.com/sul-cidr/scriptchart-backend) code. Both are under MIT license.


