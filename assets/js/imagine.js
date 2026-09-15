(function () {
  var form = document.getElementById("imagine-form");
  if (!form) return;

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
    "style",
    "wood",
    "finish",
    "include",
    "budget"
  ];
  var TEXT_KEYS = [
    "pieceOther",
    "roomOther",
    "styleOther",
    "woodOther",
    "includeOther",
    "length",
    "width",
    "height",
    "like"
  ];
  var INCLUDE_BY_CLASS = {
    table: [
      "drawers",
      "cable management",
      "wood joints you can see",
      "nothing extra",
      "something else"
    ],
    seating: ["wood joints you can see", "nothing extra", "something else"],
    storage: [
      "drawers",
      "shelves",
      "storage",
      "wood joints you can see",
      "nothing extra",
      "something else"
    ],
    bed: ["wood joints you can see", "nothing extra", "something else"],
    wall: ["wood joints you can see", "nothing extra", "something else"],
    lighting: [
      "cable management",
      "wood joints you can see",
      "nothing extra",
      "something else"
    ],
    other: [
      "drawers",
      "shelves",
      "wood joints you can see",
      "nothing extra",
      "something else"
    ]
  };
  var DIMS = {
    table: ["72", "36", "30"],
    seating: ["48", "16", "18"],
    storage: ["36", "14", "72"],
    bed: ["80", "60", "14"],
    wall: ["36", "24", "1"],
    lighting: ["10", "10", "22"],
    other: ["24", "18", "18"]
  };

  try {
    config = JSON.parse(document.getElementById("imagine-config").textContent);
  } catch (err) {
    config = {};
  }

  function pieceClass(piece) {
    var p = String(piece || "").toLowerCase();
    if (/\b(picture frame|photo frame)\b/.test(p) || /\bmirror\b/.test(p)) {
      return "wall";
    }
    if (/\bframe\b/.test(p) && !/\bbed\b/.test(p)) return "wall";
    if (/\b(lamp|sconce|pendant|lantern|lighting)\b/.test(p) || /\blight\b/.test(p)) {
      return "lighting";
    }
    if (/\b(chair|bench|stool)\b/.test(p)) return "seating";
    if (/\b(cabinet|bookshelf|bookcase|sideboard)\b/.test(p)) return "storage";
    if (/\bbed\b/.test(p)) return "bed";
    if (/\b(table|desk)\b/.test(p)) return "table";
    return "other";
  }

  function currentPieceName() {
    var piece = form.piece.value;
    if (piece === "something else") {
      return (form.pieceOther.value || "").trim() || piece;
    }
    return piece;
  }

  function includeOptions(klass, piece) {
    if (piece === "desk" || /^desk\b/i.test(piece)) {
      return [
        "drawers",
        "cable management",
        "wood joints you can see",
        "nothing extra",
        "something else"
      ];
    }
    return INCLUDE_BY_CLASS[klass] || INCLUDE_BY_CLASS.other;
  }

  function fillSelect(select, values, fallback) {
    var current = select.value;
    select.innerHTML = "";
    values.forEach(function (value) {
      var opt = document.createElement("option");
      opt.value = value;
      opt.textContent = value;
      select.appendChild(opt);
    });
    if (values.indexOf(current) !== -1) {
      select.value = current;
    } else if (values.indexOf(fallback) !== -1) {
      select.value = fallback;
    } else {
      select.value = values[0];
    }
  }

  function toggleOthers() {
    form.querySelectorAll("[data-other-for]").forEach(function (wrap) {
      var name = wrap.getAttribute("data-other-for");
      var select = form.querySelector('[name="' + name + '"]');
      var show =
        select &&
        (select.value === "something else" || select.value === "somewhere else");
      wrap.hidden = !show;
    });
  }

  var lastKind = "";

  function adaptForm() {
    var piece = currentPieceName();
    var klass = pieceClass(piece);
    var kind = form.piece.value + "|" + piece + "|" + klass;
    var dims = DIMS[klass] || DIMS.other;
    var includeFallback = "wood joints you can see";
    if (piece === "desk" || /^desk\b/i.test(piece)) {
      dims = ["60", "30", "30"];
      includeFallback = "cable management";
      kind += "|desk";
    }
    if (klass === "storage") includeFallback = "shelves";
    if (kind !== lastKind) {
      lastKind = kind;
      fillSelect(form.include, includeOptions(klass, piece), includeFallback);
      form.querySelector('[name="length"]').placeholder = dims[0];
      form.querySelector('[name="width"]').placeholder = dims[1];
      form.querySelector('[name="height"]').placeholder = dims[2];
    }
    toggleOthers();
  }

  function slotsFromForm() {
    var data = new FormData(form);
    var slots = {};
    SELECT_KEYS.forEach(function (key) {
      slots[key] = data.get(key) || "";
    });
    TEXT_KEYS.forEach(function (key) {
      slots[key] = (data.get(key) || "").trim();
    });
    return slots;
  }

  function turnstileToken() {
    var input = form.querySelector('[name="cf-turnstile-response"]');
    return input ? input.value : "";
  }

  function setStatus(text) {
    statusEl.textContent = text || "";
  }

  form.addEventListener("input", adaptForm);
  form.addEventListener("change", adaptForm);
  adaptForm();

  if (!config.api) {
    submit.disabled = true;
    setStatus("Sketching is not connected yet.");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var slots = slotsFromForm();

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
          "I used Imagine on the site.\n\n" + (body.sentence || "") + "\n"
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
