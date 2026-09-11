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
    <p class="page__lede">Fill the blanks. Dropdowns where the shop has a list; type where only you know. Photos and links can go in the last line, or in an email after you generate. Successful sketches keep the filled paragraph so the shop can see what people ask for.</p>
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
          <option value="something else">something else</option>
        </select>
      </label>
      <label class="madlib__field">
        <span class="visually-hidden">if something else, what</span>
        <input class="madlib-blank madlib-blank--mid" type="text" name="pieceOther" maxlength="40" autocomplete="off" placeholder="what kind">
      </label>
      to use in my
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
      <label class="madlib__field">
        <span class="visually-hidden">if somewhere else, where</span>
        <input class="madlib-blank madlib-blank--mid" type="text" name="roomOther" maxlength="40" autocomplete="off" placeholder="which room">
      </label>.
      Its main purpose would be
      <label class="madlib__field">
        <span class="visually-hidden">purpose</span>
        <select name="purpose" required>
          <option value="eating meals" selected>eating meals</option>
          <option value="working">working</option>
          <option value="sitting">sitting</option>
          <option value="storage">storage</option>
          <option value="display">display</option>
          <option value="gathering">gathering</option>
          <option value="something else">something else</option>
        </select>
      </label>
      <label class="madlib__field">
        <span class="visually-hidden">if something else, purpose</span>
        <input class="madlib-blank madlib-blank--wide" type="text" name="purposeOther" maxlength="60" autocomplete="off" placeholder="to do what">
      </label>,
      and it should be about
      <label class="madlib__field">
        <span class="visually-hidden">length in inches</span>
        <input class="madlib-blank madlib-blank--dim" type="text" name="length" inputmode="decimal" maxlength="8" autocomplete="off" placeholder="72" required>
      </label>
      by
      <label class="madlib__field">
        <span class="visually-hidden">width in inches</span>
        <input class="madlib-blank madlib-blank--dim" type="text" name="width" inputmode="decimal" maxlength="8" autocomplete="off" placeholder="36" required>
      </label>
      by
      <label class="madlib__field">
        <span class="visually-hidden">height in inches</span>
        <input class="madlib-blank madlib-blank--dim" type="text" name="height" inputmode="decimal" maxlength="8" autocomplete="off" placeholder="30" required>
      </label>
      inches.
    </p>

    <p class="madlib">
      The style I prefer is
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
      <label class="madlib__field">
        <span class="visually-hidden">if something else, style</span>
        <input class="madlib-blank madlib-blank--mid" type="text" name="styleOther" maxlength="40" autocomplete="off" placeholder="which style">
      </label>,
      with a look that feels
      <label class="madlib__field">
        <span class="visually-hidden">look</span>
        <select name="look" required>
          <option value="simple" selected>simple</option>
          <option value="cozy">cozy</option>
          <option value="elegant">elegant</option>
          <option value="clean">clean</option>
          <option value="rugged">rugged</option>
          <option value="organic">organic</option>
          <option value="bold">bold</option>
        </select>
      </label>.
      I am most interested in
      <label class="madlib__field">
        <span class="visually-hidden">wood or material</span>
        <select name="wood" required>
          <option value="walnut" selected>walnut</option>
          <option value="white oak">white oak</option>
          <option value="cherry">cherry</option>
          <option value="maple">maple</option>
          <option value="ash">ash</option>
          <option value="I’m not sure">I’m not sure</option>
          <option value="something else">something else</option>
        </select>
      </label>
      <label class="madlib__field">
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
      finish and a
      <label class="madlib__field">
        <span class="visually-hidden">sheen</span>
        <select name="sheen" required>
          <option value="matte" selected>matte</option>
          <option value="satin">satin</option>
          <option value="glossy">glossy</option>
        </select>
      </label>
      sheen.
    </p>

    <p class="madlib">
      I would like it to include
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
        </select>
      </label>,
      but I do not want
      <label class="madlib__field">
        <span class="visually-hidden">unwanted features</span>
        <input class="madlib-blank madlib-blank--wide" type="text" name="avoid" maxlength="80" autocomplete="off" placeholder="shiny metal, sharp corners">
      </label>.
      The piece needs to support
      <label class="madlib__field">
        <span class="visually-hidden">what it must support</span>
        <select name="support" required>
          <option value="two people">two people</option>
          <option value="a family" selected>a family</option>
          <option value="heavy objects">heavy objects</option>
          <option value="daily bags and keys">daily bags and keys</option>
          <option value="a computer and papers">a computer and papers</option>
        </select>
      </label>
      and will get
      <label class="madlib__field">
        <span class="visually-hidden">how much use</span>
        <select name="wear" required>
          <option value="light">light</option>
          <option value="moderate" selected>moderate</option>
          <option value="heavy">heavy</option>
        </select>
      </label>
      use from
      <label class="madlib__field">
        <span class="visually-hidden">who uses it</span>
        <select name="users" required>
          <option value="adults" selected>adults</option>
          <option value="children">children</option>
          <option value="pets">pets</option>
          <option value="customers">customers</option>
          <option value="a mix">a mix</option>
        </select>
      </label>.
    </p>

    <p class="madlib">
      The closest store-bought piece I have seen is
      <label class="madlib__field">
        <span class="visually-hidden">reference item</span>
        <input class="madlib-blank madlib-blank--wide" type="text" name="reference" maxlength="120" autocomplete="off" placeholder="brand, product, or link">
      </label>.
      I like
      <label class="madlib__field">
        <span class="visually-hidden">what you like about it</span>
        <input class="madlib-blank madlib-blank--wide" type="text" name="like" maxlength="80" autocomplete="off" placeholder="the size, the quiet look">
      </label>,
      but I would change
      <label class="madlib__field">
        <span class="visually-hidden">what you would change</span>
        <input class="madlib-blank madlib-blank--wide" type="text" name="change" maxlength="80" autocomplete="off" placeholder="the wood, the height">
      </label>.
      My target budget is
      <label class="madlib__field">
        <span class="visually-hidden">budget</span>
        <select name="budget" required>
          <option value="under $800">under $800</option>
          <option value="$800–2,000" selected>$800–2,000</option>
          <option value="$2,000–5,000">$2,000–5,000</option>
          <option value="$5,000 or more">$5,000 or more</option>
          <option value="not sure yet">not sure yet</option>
        </select>
      </label>,
      and I would need it
      <label class="madlib__field">
        <span class="visually-hidden">timeframe</span>
        <select name="when" required>
          <option value="with no rush" selected>with no rush</option>
          <option value="in a few months">in a few months</option>
          <option value="by a set date">by a set date</option>
        </select>
      </label>
      <label class="madlib__field">
        <span class="visually-hidden">date if you have one</span>
        <input class="madlib-blank madlib-blank--mid" type="text" name="whenNote" maxlength="40" autocomplete="off" placeholder="when">
      </label>.
    </p>

    <fieldset class="imagine-picks">
      <legend class="imagine-picks__legend">Most important — pick up to three</legend>
      <label class="imagine-picks__item"><input type="checkbox" name="priority" value="price"> Price</label>
      <label class="imagine-picks__item"><input type="checkbox" name="priority" value="appearance"> Appearance</label>
      <label class="imagine-picks__item"><input type="checkbox" name="priority" value="durability"> Durability</label>
      <label class="imagine-picks__item"><input type="checkbox" name="priority" value="function"> Function</label>
      <label class="imagine-picks__item"><input type="checkbox" name="priority" value="uniqueness"> Uniqueness</label>
      <label class="imagine-picks__item"><input type="checkbox" name="priority" value="sustainability"> Sustainability</label>
      <label class="imagine-picks__item"><input type="checkbox" name="priority" value="local craft"> Local craft</label>
      <label class="imagine-picks__item"><input type="checkbox" name="priority" value="easy care"> Easy care</label>
    </fieldset>

    <p class="madlib">
      A successful piece would make me feel
      <label class="madlib__field">
        <span class="visually-hidden">feeling</span>
        <select name="feel" required>
          <option value="at ease" selected>at ease</option>
          <option value="proud">proud</option>
          <option value="delighted">delighted</option>
          <option value="grounded">grounded</option>
          <option value="impressed">impressed</option>
        </select>
      </label>
      because it would
      <label class="madlib__field">
        <span class="visually-hidden">what would make it valuable</span>
        <input class="madlib-blank madlib-blank--wide" type="text" name="because" maxlength="100" autocomplete="off" placeholder="last, and look like it belongs">
      </label>.
      Inspiration (links or notes):
      <label class="madlib__field">
        <span class="visually-hidden">inspiration links or notes</span>
        <input class="madlib-blank madlib-blank--full" type="text" name="links" maxlength="200" autocomplete="off" placeholder="https://…">
      </label>.
    </p>

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
