---
layout: default
title: Work
permalink: /work/
description: Furniture in solid hardwood — new work, repair, and modernization.
---

<div class="page">
  <header class="page__header">
    <p class="eyebrow">Gallery</p>
    <h1 class="page__title">Work</h1>
    <p class="page__lede">Finished pieces. Repair and modernization sit beside new work.</p>
  </header>

  <ul class="gallery">
    {% assign pieces = site.pieces | sort: "order" %}
    {% for piece in pieces %}
    <li class="gallery__item">
      <a class="gallery__link" href="{{ piece.url | relative_url }}">
        {% if piece.image %}
        <div class="gallery__media">
          <img class="gallery__img" src="{{ piece.image | relative_url }}" alt="{{ piece.title }}" loading="lazy">
        </div>
        {% endif %}
        <h2 class="gallery__name">{{ piece.title }}</h2>
        <p class="gallery__meta">{{ piece.category }}{% if piece.wood %} · {{ piece.wood }}{% endif %}</p>
      </a>
    </li>
    {% endfor %}
  </ul>
</div>
