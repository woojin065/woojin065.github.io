---
title: "기타둥둥"
layout: archive
permalink: /categories/etc/
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.etc %}
{% for post in posts %}
{% include archive-single.html type=page.entries_layout %}
{% endfor %}
