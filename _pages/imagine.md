---
layout: default
title: Imagine
permalink: /imagine/
description: Describe a piece. The shop will sketch it.
script: /assets/js/imagine-feedback.js?v=1
---

<div class="page page--imagine">
  <header class="page__header">
    <p class="eyebrow">Beta sketch</p>
    <h1 class="page__title">Imagine</h1>
    <p class="page__lede">Say what it is, how it should look and work, and what a store version gets wrong. Everyday words are enough.</p>
    <p class="page__note">Limited daily sketches while we learn. If the shop puts the pencil down, try again tomorrow.</p>
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
          <option value="cutting board">cutting board</option>
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
          <option value="patio">patio</option>
          <option value="somewhere else">somewhere else</option>
        </select>
      </label>
      <label class="madlib__field madlib-other" data-other-for="room" hidden>
        <span class="visually-hidden">if somewhere else, where</span>
        <input class="madlib-blank madlib-blank--mid" type="text" name="roomOther" maxlength="40" autocomplete="off" placeholder="which room">
      </label>.
      It should be for
      <label class="madlib__field">
        <span class="visually-hidden">purpose</span>
        <select name="purpose" required>
          <option value="eating meals" selected>eating meals</option>
          <option value="working">working</option>
          <option value="sitting">sitting</option>
          <option value="storage">storage</option>
          <option value="display">display</option>
          <option value="gathering">gathering</option>
          <option value="lighting">lighting</option>
          <option value="sleeping">sleeping</option>
          <option value="food prep">food prep</option>
          <option value="something else">something else</option>
        </select>
      </label>
      <label class="madlib__field madlib-other" data-other-for="purpose" hidden>
        <span class="visually-hidden">if something else, purpose</span>
        <input class="madlib-blank madlib-blank--wide" type="text" name="purposeOther" maxlength="60" autocomplete="off" placeholder="what it should do">
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
          <option value="mid-century">mid-century</option>
          <option value="something else">something else</option>
        </select>
      </label>
      <label class="madlib__field madlib-other" data-other-for="style" hidden>
        <span class="visually-hidden">if something else, style</span>
        <input class="madlib-blank madlib-blank--mid" type="text" name="styleOther" maxlength="40" autocomplete="off" placeholder="which style">
      </label>,
      a look that feels
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
          <option value="reclaimed wood">reclaimed wood</option>
          <option value="metal">metal</option>
          <option value="stone">stone</option>
          <option value="fabric">fabric</option>
          <option value="leather">leather</option>
          <option value="I’m not sure">I’m not sure</option>
          <option value="something else">something else</option>
        </select>
      </label>
      <label class="madlib__field madlib-other" data-other-for="wood" hidden>
        <span class="visually-hidden">if something else, material</span>
        <input class="madlib-blank madlib-blank--mid" type="text" name="woodOther" maxlength="40" autocomplete="off" placeholder="which material">
      </label>,
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
      finish,
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
      Include
      <label class="madlib__field">
        <span class="visually-hidden">features to include</span>
        <select name="include" required>
          <option value="drawers">drawers</option>
          <option value="shelves">shelves</option>
          <option value="storage">storage</option>
          <option value="cable management">cable management</option>
          <option value="foldable parts">foldable parts</option>
          <option value="knockdown joinery">knockdown joinery</option>
          <option value="few visible joints">few visible joints</option>
          <option value="wood joints you can see" selected>wood joints you can see</option>
          <option value="nothing extra">nothing extra</option>
          <option value="something else">something else</option>
        </select>
      </label>
      <label class="madlib__field madlib-other" data-other-for="include" hidden>
        <span class="visually-hidden">if something else, include</span>
        <input class="madlib-blank madlib-blank--wide" type="text" name="includeOther" maxlength="80" autocomplete="off" placeholder="what it must have">
      </label>.
      I do not want
      <label class="madlib__field">
        <span class="visually-hidden">unwanted features</span>
        <input class="madlib-blank madlib-blank--wide" type="text" name="avoid" maxlength="80" autocomplete="off" placeholder="optional — chrome, sharp corners">
      </label>.
      <span id="imagine-hold-verb">It needs to support</span>
      <label class="madlib__field">
        <span class="visually-hidden">what it must support</span>
        <select name="support" required>
          <option value="two people">two people</option>
          <option value="a family" selected>a family</option>
          <option value="heavy objects">heavy objects</option>
          <option value="daily bags and keys">daily bags and keys</option>
          <option value="a computer and papers">a computer and papers</option>
          <option value="a picture or artwork">a picture or artwork</option>
          <option value="a shade and bulb">a shade and bulb</option>
          <option value="something else">something else</option>
        </select>
      </label>
      <label class="madlib__field madlib-other" data-other-for="support" hidden>
        <span class="visually-hidden">if something else, what it holds</span>
        <input class="madlib-blank madlib-blank--wide" type="text" name="supportOther" maxlength="80" autocomplete="off" placeholder="what it holds">
      </label>,
      <label class="madlib__field">
        <span class="visually-hidden">how much use</span>
        <select name="wear" required>
          <option value="light">light</option>
          <option value="moderate" selected>moderate</option>
          <option value="heavy">heavy</option>
        </select>
      </label>
      use by
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
      A realistic range for this would be
      <label class="madlib__field">
        <span class="visually-hidden">budget</span>
        <select name="budget" required>
          <option value="not sure yet" selected>not sure yet</option>
          <option value="under $800">under $800</option>
          <option value="$800–2,000">$800–2,000</option>
          <option value="$2,000–5,000">$2,000–5,000</option>
          <option value="$5,000 or more">$5,000 or more</option>
        </select>
      </label>.
      Closest store piece
      <label class="madlib__field">
        <span class="visually-hidden">reference item</span>
        <input class="madlib-blank madlib-blank--wide" type="text" name="reference" maxlength="120" autocomplete="off" placeholder="optional — brand or link">
      </label>.
      I like
      <label class="madlib__field">
        <span class="visually-hidden">what you like about it</span>
        <input class="madlib-blank madlib-blank--wide" type="text" name="like" maxlength="80" autocomplete="off" placeholder="optional">
      </label>,
      but I would change
      <label class="madlib__field">
        <span class="visually-hidden">what you would change</span>
        <input class="madlib-blank madlib-blank--wide" type="text" name="change" maxlength="80" autocomplete="off" placeholder="optional">
      </label>.
      Most important is
      <label class="madlib__field">
        <span class="visually-hidden">top priority</span>
        <select name="priority">
          <option value="" selected>not sure yet</option>
          <option value="appearance">appearance</option>
          <option value="durability">durability</option>
          <option value="function">function</option>
          <option value="uniqueness">uniqueness</option>
          <option value="sustainability">sustainability</option>
          <option value="local craft">local craft</option>
          <option value="price">price</option>
          <option value="easy care">easy care</option>
        </select>
      </label>.
    </p>

    <label class="imagine-risk">
      <input type="checkbox" name="unusual">
      Take a design risk — distinctive stance, not a catalog silhouette
    </label>

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
    <form class="imagine-real" id="imagine-real" novalidate>
      <p class="imagine-real__lede">How this landed</p>
      <p class="madlib">
        I am
        <label class="madlib__field">
          <span class="visually-hidden">how surprised you are</span>
          <select name="surprise" required>
            <option value="" selected>…</option>
            <option value="pleasantly surprised">pleasantly surprised</option>
            <option value="unpleasantly surprised">unpleasantly surprised</option>
            <option value="not surprised">not surprised</option>
          </select>
        </label>.
        <span class="madlib-other" data-other-for="surprise" hidden>
          It betrayed
          <label class="madlib__field">
            <span class="visually-hidden">which field missed</span>
            <select name="betrayed">
              <option value="" selected>…</option>
              <option value="piece">the piece type</option>
              <option value="room">the room</option>
              <option value="purpose">what it’s for</option>
              <option value="size">the size</option>
              <option value="style">the style</option>
              <option value="look">the look</option>
              <option value="wood">the material</option>
              <option value="finish">the finish</option>
              <option value="sheen">the sheen</option>
              <option value="include">what to include</option>
              <option value="avoid">what to avoid</option>
              <option value="support">what it holds</option>
              <option value="wear">how hard it gets used</option>
              <option value="users">who uses it</option>
              <option value="priority">what matters most</option>
              <option value="unusual">the design risk</option>
              <option value="overall">the whole sketch</option>
            </select>
          </label>.
        </span>
      </p>
      <div class="imagine-actions">
        <button class="btn" type="submit" id="imagine-real-submit">Send this</button>
      </div>
      <p class="imagine-status" id="imagine-real-status" role="status"></p>
    </form>
  </figure>
</div>

<script type="application/json" id="imagine-config">
{"api":{{ site.imagine.api | jsonify }},"email":{{ site.email | jsonify }},"turnstile":{{ site.imagine.turnstile_site_key | jsonify }}}
</script>
