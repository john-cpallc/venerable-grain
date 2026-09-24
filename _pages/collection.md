---
layout: default
title: Collection
permalink: /collection/
description: Work meant to be used and moved — new furniture, repair, and modernization.
---

<div class="page">
  <header class="page__header">
    <p class="eyebrow">Work</p>
    <h1 class="page__title">Collection</h1>
    <p class="page__lede">Work meant to be used and moved. New pieces sit beside repair and modernization.</p>
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
        <p class="gallery__meta">{{ piece.category }}{% if piece.wood %} · {{ piece.wood }}{% endif %}{% if piece.price %} · {{ piece.price }}{% endif %}</p>
      </a>
    </li>
    {% endfor %}
  </ul>
</div>
