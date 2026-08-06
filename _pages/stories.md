---
layout: default
title: Stories
permalink: /stories/
description: Process stories — joinery, repair, and the path from timber to piece.
---

<div class="page">
  <header class="page__header">
    <p class="eyebrow">Process</p>
    <h1 class="page__title">Stories</h1>
    <p class="page__lede">How a piece comes together — and how an old one finds a second life.</p>
  </header>

  <ul class="story-list">
    {% assign stories = site.stories | sort: "date" | reverse %}
    {% for story in stories %}
    <li class="story-list__item">
      <a class="story-list__link" href="{{ story.url | relative_url }}">
        <div>
          <h2 class="story-list__title">{{ story.title }}</h2>
          {% if story.subtitle %}
          <p class="story-list__sub">{{ story.subtitle }}</p>
          {% endif %}
        </div>
        <span class="story-list__mark">Read</span>
      </a>
    </li>
    {% endfor %}
  </ul>
</div>
