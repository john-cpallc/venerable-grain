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

  try {
    config = JSON.parse(document.getElementById("imagine-config").textContent);
  } catch (err) {
    config = {};
  }

  function slotsFromForm() {
    var data = new FormData(form);
    return {
      piece: data.get("piece") || "",
      wood: data.get("wood") || "",
      size: data.get("size") || "",
      room: data.get("room") || "",
      line: data.get("line") || "",
      detail: data.get("detail") || "",
      finish: data.get("finish") || "",
      light: data.get("light") || "",
      note: (data.get("note") || "").trim()
    };
  }

  function sentenceFromSlots(s) {
    var line =
      "I want a " +
      s.piece +
      " in " +
      s.wood +
      ", " +
      s.size +
      ", for a " +
      s.room +
      ". The line is " +
      s.line +
      ", with " +
      s.detail +
      " and a " +
      s.finish +
      " finish. Light from " +
      s.light +
      ".";
    if (s.note) line += " " + s.note + ".";
    return line;
  }

  function turnstileToken() {
    var input = form.querySelector('[name="cf-turnstile-response"]');
    return input ? input.value : "";
  }

  function setStatus(text) {
    statusEl.textContent = text || "";
  }

  function refreshPreview() {
    preview.textContent = sentenceFromSlots(slotsFromForm());
  }

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
    var slots = slotsFromForm();
    var sentence = sentenceFromSlots(slots);

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
