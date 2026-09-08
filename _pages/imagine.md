---
layout: default
title: Imagine
permalink: /imagine/
description: Describe a piece. The shop will sketch it.
script: /assets/js/imagine.js
---

<div class="page page--imagine">
  <header class="page__header">
    <p class="eyebrow">Sketch</p>
    <h1 class="page__title">Imagine</h1>
    <p class="page__lede">Fill the line. What you describe is drawn — not a promise of a finished piece, a place to start.</p>
  </header>

  <form class="imagine" id="imagine-form" novalidate>
    <p class="madlib">
      I want a
      <label class="madlib__field">
        <span class="visually-hidden">piece</span>
        <select name="piece" required>
          <option value="bench" selected>bench</option>
          <option value="dining table">dining table</option>
          <option value="side table">side table</option>
          <option value="cabinet">cabinet</option>
          <option value="stool">stool</option>
          <option value="pedestal">pedestal</option>
          <option value="desk">desk</option>
        </select>
      </label>
      in
      <label class="madlib__field">
        <span class="visually-hidden">wood</span>
        <select name="wood" required>
          <option value="walnut" selected>walnut</option>
          <option value="white oak">white oak</option>
          <option value="cherry">cherry</option>
          <option value="maple">maple</option>
          <option value="ash">ash</option>
          <option value="old-growth fir">old-growth fir</option>
        </select>
      </label>,
      <label class="madlib__field">
        <span class="visually-hidden">size</span>
        <select name="size" required>
          <option value="compact">compact</option>
          <option value="for two">for two</option>
          <option value="for a family" selected>for a family</option>
          <option value="long and narrow">long and narrow</option>
        </select>
      </label>,
      for a
      <label class="madlib__field">
        <span class="visually-hidden">room</span>
        <select name="room" required>
          <option value="kitchen">kitchen</option>
          <option value="dining room" selected>dining room</option>
          <option value="hallway">hallway</option>
          <option value="studio">studio</option>
          <option value="porch">porch</option>
          <option value="bedroom">bedroom</option>
        </select>
      </label>.
      The line is
      <label class="madlib__field">
        <span class="visually-hidden">line</span>
        <select name="line" required>
          <option value="Shaker" selected>Shaker</option>
          <option value="Danish">Danish</option>
          <option value="midcentury">midcentury</option>
          <option value="sashimono-inspired">sashimono-inspired</option>
        </select>
      </label>,
      with
      <label class="madlib__field">
        <span class="visually-hidden">detail</span>
        <select name="detail" required>
          <option value="through tenons" selected>through tenons</option>
          <option value="breadboard ends">breadboard ends</option>
          <option value="fitted knockdown joints">fitted knockdown joints</option>
          <option value="a live edge">a live edge</option>
          <option value="visible wedges">visible wedges</option>
        </select>
      </label>
      and a
      <label class="madlib__field">
        <span class="visually-hidden">finish</span>
        <select name="finish" required>
          <option value="oil" selected>oil</option>
          <option value="soap">soap</option>
          <option value="ebonized">ebonized</option>
          <option value="natural">natural</option>
        </select>
      </label>
      finish. Light from
      <label class="madlib__field">
        <span class="visually-hidden">light</span>
        <select name="light" required>
          <option value="a north window" selected>a north window</option>
          <option value="workshop lamps">workshop lamps</option>
          <option value="dusk">dusk</option>
          <option value="soft overcast">soft overcast</option>
        </select>
      </label>.
    </p>

    <label class="imagine-note">
      <span class="imagine-note__label">Anything else</span>
      <input type="text" name="note" maxlength="80" autocomplete="off" placeholder="quiet, low, no metal showing">
    </label>

    <p class="imagine-preview" id="imagine-preview" aria-live="polite"></p>

    {% if site.imagine.turnstile_site_key != "" %}
    <div class="cf-turnstile" data-sitekey="{{ site.imagine.turnstile_site_key }}"></div>
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
    {% endif %}

    <div class="imagine-actions">
      <button class="btn" type="submit" id="imagine-submit">Generate</button>
    </div>
    <p class="imagine-status" id="imagine-status" role="status"></p>
  </form>

  <figure class="imagine-result" id="imagine-result" hidden>
    <img id="imagine-image" alt="Generated sketch of the described piece">
    <figcaption class="imagine-result__actions">
      <a class="btn" id="imagine-download" download="venerable-grain-sketch.jpg" href="#">Download</a>
      <a class="btn" id="imagine-email" href="mailto:{{ site.email }}">Email this sketch</a>
    </figcaption>
  </figure>
</div>

<script type="application/json" id="imagine-config">
{"api":{{ site.imagine.api | jsonify }},"email":{{ site.email | jsonify }},"turnstile":{{ site.imagine.turnstile_site_key | jsonify }}}
</script>
