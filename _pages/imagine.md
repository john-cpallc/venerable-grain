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
    <p class="page__lede">A few blanks. Generate a sketch. Add a note if you want — the shop can talk through the rest by email.</p>
  </header>

  <form class="imagine" id="imagine-form" novalidate>
    <p class="madlib">
      I am looking for a
      <label class="madlib__field">
        <span class="visually-hidden">type of item</span>
        <select name="piece" required>
          <option value="dining table" selected>dining table</option>
          <option value="kitchen table">kitchen table</option>
          <option value="coffee table">coffee table</option>
          <option value="side table">side table</option>
          <option value="bench">bench</option>
          <option value="cabinet">cabinet</option>
          <option value="bookshelf">bookshelf</option>
          <option value="desk">desk</option>
          <option value="stool">stool</option>
          <option value="chair">chair</option>
          <option value="bed frame">bed frame</option>
          <option value="picture frame">picture frame</option>
          <option value="mirror">mirror</option>
          <option value="lamp">lamp</option>
          <option value="something else">something else</option>
        </select>
      </label>
      <label class="madlib__field madlib-other" data-other-for="piece" hidden>
        <span class="visually-hidden">if something else, what</span>
        <input class="madlib-blank madlib-blank--mid" type="text" name="pieceOther" maxlength="40" autocomplete="off" placeholder="what kind">
      </label>
      for my
      <label class="madlib__field">
        <span class="visually-hidden">room or setting</span>
        <select name="room" required>
          <option value="kitchen">kitchen</option>
          <option value="dining room" selected>dining room</option>
          <option value="living room">living room</option>
          <option value="bedroom">bedroom</option>
          <option value="hallway">hallway</option>
          <option value="office">office</option>
          <option value="entry">entry</option>
          <option value="workshop">workshop</option>
          <option value="somewhere else">somewhere else</option>
        </select>
      </label>
      <label class="madlib__field madlib-other" data-other-for="room" hidden>
        <span class="visually-hidden">if somewhere else, where</span>
        <input class="madlib-blank madlib-blank--mid" type="text" name="roomOther" maxlength="40" autocomplete="off" placeholder="which room">
      </label>,
      about
      <label class="madlib__field">
        <span class="visually-hidden">length in inches</span>
        <input class="madlib-blank madlib-blank--dim" type="text" name="length" inputmode="decimal" maxlength="8" autocomplete="off" placeholder="72">
      </label>
      by
      <label class="madlib__field">
        <span class="visually-hidden">width in inches</span>
        <input class="madlib-blank madlib-blank--dim" type="text" name="width" inputmode="decimal" maxlength="8" autocomplete="off" placeholder="36">
      </label>
      by
      <label class="madlib__field">
        <span class="visually-hidden">height in inches</span>
        <input class="madlib-blank madlib-blank--dim" type="text" name="height" inputmode="decimal" maxlength="8" autocomplete="off" placeholder="30">
      </label>
      inches.
    </p>

    <p class="madlib">
      <label class="madlib__field">
        <span class="visually-hidden">style</span>
        <select name="style" required>
          <option value="modern">modern</option>
          <option value="rustic">rustic</option>
          <option value="farmhouse">farmhouse</option>
          <option value="industrial">industrial</option>
          <option value="traditional">traditional</option>
          <option value="minimalist" selected>minimalist</option>
          <option value="something else">something else</option>
        </select>
      </label>
      <label class="madlib__field madlib-other" data-other-for="style" hidden>
        <span class="visually-hidden">if something else, style</span>
        <input class="madlib-blank madlib-blank--mid" type="text" name="styleOther" maxlength="40" autocomplete="off" placeholder="which style">
      </label>,
      in
      <label class="madlib__field">
        <span class="visually-hidden">wood or material</span>
        <select name="wood" required>
          <option value="walnut" selected>walnut</option>
          <option value="white oak">white oak</option>
          <option value="cherry">cherry</option>
          <option value="maple">maple</option>
          <option value="ash">ash</option>
          <option value="pine">pine</option>
          <option value="I’m not sure">I’m not sure</option>
          <option value="something else">something else</option>
        </select>
      </label>
      <label class="madlib__field madlib-other" data-other-for="wood" hidden>
        <span class="visually-hidden">if something else, material</span>
        <input class="madlib-blank madlib-blank--mid" type="text" name="woodOther" maxlength="40" autocomplete="off" placeholder="which wood">
      </label>,
      with a
      <label class="madlib__field">
        <span class="visually-hidden">finish</span>
        <select name="finish" required>
          <option value="natural" selected>natural</option>
          <option value="light">light</option>
          <option value="medium">medium</option>
          <option value="dark">dark</option>
          <option value="painted">painted</option>
          <option value="reclaimed">reclaimed</option>
        </select>
      </label>
      finish. Include
      <label class="madlib__field">
        <span class="visually-hidden">features to include</span>
        <select name="include" required>
          <option value="drawers">drawers</option>
          <option value="shelves">shelves</option>
          <option value="storage">storage</option>
          <option value="cable management">cable management</option>
          <option value="foldable parts">foldable parts</option>
          <option value="wood joints you can see" selected>wood joints you can see</option>
          <option value="nothing extra">nothing extra</option>
          <option value="something else">something else</option>
        </select>
      </label>
      <label class="madlib__field madlib-other" data-other-for="include" hidden>
        <span class="visually-hidden">if something else, include</span>
        <input class="madlib-blank madlib-blank--wide" type="text" name="includeOther" maxlength="80" autocomplete="off" placeholder="what to include">
      </label>.
    </p>

    <p class="madlib">
      Budget
      <label class="madlib__field">
        <span class="visually-hidden">budget</span>
        <select name="budget" required>
          <option value="under $800">under $800</option>
          <option value="$800–2,000" selected>$800–2,000</option>
          <option value="$2,000–5,000">$2,000–5,000</option>
          <option value="$5,000 or more">$5,000 or more</option>
          <option value="not sure yet">not sure yet</option>
        </select>
      </label>.
      Notes
      <label class="madlib__field">
        <span class="visually-hidden">optional notes</span>
        <input class="madlib-blank madlib-blank--full" type="text" name="like" maxlength="120" autocomplete="off" placeholder="optional — a link, a detail, a no">
      </label>.
    </p>

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
