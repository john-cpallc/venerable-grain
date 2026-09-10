(function () {
  var form = document.getElementById("imagine-form");
  if (!form) return;

  var preview = document.getElementById("imagine-preview");
  var statusEl = document.getElementById("imagine-status");
  var submit = document.getElementById("imagine-submit");
  var result = document.getElementById("imagine-result");
  var image = document.getElementById("imagine-image");
  var download = document.getElementById("imagine-download");
  var emailLink = document.getElementById("imagine-email");
  var config = {};
  var SELECT_KEYS = [
    "piece",
    "room",
    "purpose",
    "style",
    "look",
    "wood",
    "finish",
    "sheen",
    "include",
    "support",
    "wear",
    "users",
    "budget",
    "when",
    "feel"
  ];
  var TEXT_KEYS = [
    "pieceOther",
    "roomOther",
    "purposeOther",
    "styleOther",
    "woodOther",
    "length",
    "width",
    "height",
    "avoid",
    "reference",
    "like",
    "change",
    "whenNote",
    "because",
    "links"
  ];
  var OTHER = {
    piece: "pieceOther",
    room: "roomOther",
    purpose: "purposeOther",
    style: "styleOther",
    wood: "woodOther"
  };

  try {
    config = JSON.parse(document.getElementById("imagine-config").textContent);
  } catch (err) {
    config = {};
  }

  function resolveChoice(select, other) {
    if (select === "something else" || select === "somewhere else") {
      return other || select;
    }
    return select;
  }

  function joinList(items) {
    if (!items.length) return "";
    if (items.length === 1) return items[0];
    if (items.length === 2) return items[0] + " and " + items[1];
    return items.slice(0, -1).join(", ") + ", and " + items[items.length - 1];
  }

  function slotsFromForm(forDisplay) {
    var data = new FormData(form);
    var slots = {};
    SELECT_KEYS.forEach(function (key) {
      slots[key] = data.get(key) || "";
    });
    TEXT_KEYS.forEach(function (key) {
      slots[key] = (data.get(key) || "").trim();
    });
    slots.priorities = data.getAll("priority");
    if (forDisplay) {
      Object.keys(OTHER).forEach(function (key) {
        slots[key] = resolveChoice(slots[key], slots[OTHER[key]]);
      });
    }
    return slots;
  }

  function sentenceFromSlots(s) {
    var parts = [
      "I am looking for a " + s.piece + " to use in my " + s.room + ".",
      "Its main purpose would be " +
        s.purpose +
        ", and it should be about " +
        s.length +
        " by " +
        s.width +
        " by " +
        s.height +
        " inches.",
      "The style I prefer is " + s.style + ", with a look that feels " + s.look + ".",
      "I am most interested in " +
        s.wood +
        ", with a " +
        s.finish +
        " finish and a " +
        s.sheen +
        " sheen.",
      "I would like it to include " +
        s.include +
        (s.avoid ? ", but I do not want " + s.avoid : "") +
        ".",
      "The piece needs to support " +
        s.support +
        " and will get " +
        s.wear +
        " use from " +
        s.users +
        "."
    ];
    if (s.reference || s.like || s.change) {
      var ref = "The closest store-bought piece I have seen";
      ref += s.reference ? " is " + s.reference : " is something I have in mind";
      if (s.like) ref += "; I like " + s.like;
      if (s.change) ref += ", but I would change " + s.change;
      ref += ".";
      parts.push(ref);
    }
    var timing =
      "My target budget is " + s.budget + ", and I would need it " + s.when;
    if (s.whenNote) timing += " (" + s.whenNote + ")";
    timing += ".";
    parts.push(timing);
    if (s.priorities && s.priorities.length) {
      parts.push("The most important priorities are " + joinList(s.priorities) + ".");
    }
    var success = "A successful piece would make me feel " + s.feel;
    if (s.because) success += " because it would " + s.because;
    success += ".";
    parts.push(success);
    if (s.links) parts.push("Inspiration: " + s.links + ".");
    return parts.join(" ");
  }

  function turnstileToken() {
    var input = form.querySelector('[name="cf-turnstile-response"]');
    return input ? input.value : "";
  }

  function setStatus(text) {
    statusEl.textContent = text || "";
  }

  function refreshPreview() {
    preview.textContent = sentenceFromSlots(slotsFromForm(true));
  }

  form.querySelectorAll('input[name="priority"]').forEach(function (box) {
    box.addEventListener("change", function () {
      var checked = form.querySelectorAll('input[name="priority"]:checked');
      if (checked.length > 3) box.checked = false;
      refreshPreview();
    });
  });

  form.addEventListener("input", refreshPreview);
  form.addEventListener("change", refreshPreview);
  refreshPreview();

  if (!config.api) {
    submit.disabled = true;
    setStatus("Sketching is not connected yet.");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var slots = slotsFromForm(false);
    var sentence = sentenceFromSlots(slotsFromForm(true));

    submit.disabled = true;
    setStatus("Drawing…");
    result.hidden = true;

    fetch(config.api.replace(/\/$/, "") + "/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slots: slots,
        turnstileToken: turnstileToken()
      })
    })
      .then(function (res) {
        return res.json().then(function (body) {
          if (!res.ok) {
            throw new Error(body.error || "The sketch did not come through.");
          }
          return body;
        });
      })
      .then(function (body) {
        if (!body.imageUrl) throw new Error("The sketch did not come through.");
        image.src = body.imageUrl;
        download.href = body.imageUrl;
        var subject = encodeURIComponent("Venerable Grain sketch");
        var bodyText = encodeURIComponent(
          "I used Imagine on the site.\n\n" + sentence + "\n"
        );
        emailLink.href =
          "mailto:" +
          (config.email || "") +
          "?subject=" +
          subject +
          "&body=" +
          bodyText;
        result.hidden = false;
        setStatus("");
      })
      .catch(function (err) {
        var msg = err.message || "The sketch did not come through.";
        if (err.name === "TypeError" || msg === "Failed to fetch") {
          msg = "The sketch tool is not connected yet.";
        }
        setStatus(msg);
      })
      .then(function () {
        submit.disabled = false;
      });
  });
})();
