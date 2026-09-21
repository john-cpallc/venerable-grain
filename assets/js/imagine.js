(function () {
  var form = document.getElementById("imagine-form");
  if (!form) return;

  var statusEl = document.getElementById("imagine-status");
  var submit = document.getElementById("imagine-submit");
  var result = document.getElementById("imagine-result");
  var image = document.getElementById("imagine-image");
  var download = document.getElementById("imagine-download");
  var emailLink = document.getElementById("imagine-email");
  var realForm = document.getElementById("imagine-real");
  var realStatusEl = document.getElementById("imagine-real-status");
  var realSubmit = document.getElementById("imagine-real-submit");
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
    "when"
  ];
  var TEXT_KEYS = [
    "pieceOther",
    "roomOther",
    "purposeOther",
    "styleOther",
    "woodOther",
    "includeOther",
    "supportOther",
    "length",
    "width",
    "height",
    "avoid",
    "reference",
    "like",
    "change",
    "whenNote"
  ];
  var OPTIONS = {
    purpose: {
      table: ["eating meals", "working", "gathering", "display", "something else"],
      seating: ["sitting", "gathering", "something else"],
      storage: ["storage", "display", "something else"],
      bed: ["sleeping", "something else"],
      wall: ["display", "something else"],
      lighting: ["lighting", "display", "something else"],
      other: [
        "food prep",
        "display",
        "storage",
        "working",
        "something else"
      ]
    },
    include: {
      table: [
        "drawers",
        "cable management",
        "foldable parts",
        "knockdown joinery",
        "few visible joints",
        "wood joints you can see",
        "nothing extra",
        "something else"
      ],
      seating: [
        "knockdown joinery",
        "few visible joints",
        "wood joints you can see",
        "nothing extra",
        "something else"
      ],
      storage: [
        "drawers",
        "shelves",
        "storage",
        "knockdown joinery",
        "few visible joints",
        "wood joints you can see",
        "nothing extra",
        "something else"
      ],
      bed: [
        "knockdown joinery",
        "few visible joints",
        "wood joints you can see",
        "nothing extra",
        "something else"
      ],
      wall: [
        "few visible joints",
        "wood joints you can see",
        "nothing extra",
        "something else"
      ],
      lighting: [
        "cable management",
        "few visible joints",
        "wood joints you can see",
        "nothing extra",
        "something else"
      ],
      other: [
        "nothing extra",
        "knockdown joinery",
        "few visible joints",
        "wood joints you can see",
        "something else"
      ]
    },
    support: {
      table: [
        "two people",
        "a family",
        "heavy objects",
        "daily bags and keys",
        "a computer and papers",
        "something else"
      ],
      seating: ["two people", "a family", "something else"],
      storage: ["heavy objects", "daily bags and keys", "something else"],
      bed: ["two people", "a family", "something else"],
      wall: ["a picture or artwork", "something else"],
      lighting: ["a shade and bulb", "something else"],
      other: ["heavy objects", "something else"]
    }
  };
  var DEFAULTS = {
    table: {
      purpose: "eating meals",
      include: "wood joints you can see",
      support: "a family",
      dims: ["72", "36", "30"]
    },
    seating: {
      purpose: "sitting",
      include: "wood joints you can see",
      support: "two people",
      dims: ["48", "16", "18"]
    },
    storage: {
      purpose: "storage",
      include: "shelves",
      support: "heavy objects",
      dims: ["36", "14", "72"]
    },
    bed: {
      purpose: "sleeping",
      include: "wood joints you can see",
      support: "two people",
      dims: ["80", "60", "14"]
    },
    wall: {
      purpose: "display",
      include: "wood joints you can see",
      support: "a picture or artwork",
      dims: ["36", "24", "1"]
    },
    lighting: {
      purpose: "lighting",
      include: "wood joints you can see",
      support: "a shade and bulb",
      dims: ["10", "10", "22"]
    },
    other: {
      purpose: "food prep",
      include: "nothing extra",
      support: "heavy objects",
      dims: ["18", "12", "1"]
    }
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

  function fieldOptions(field, klass, piece) {
    var list = (OPTIONS[field] && OPTIONS[field][klass]) || OPTIONS[field].other;
    if (piece === "desk" || /^desk\b/i.test(piece)) {
      if (field === "purpose") return ["working", "gathering", "something else"];
      if (field === "include") {
        return [
          "drawers",
          "cable management",
          "knockdown joinery",
          "few visible joints",
          "wood joints you can see",
          "nothing extra",
          "something else"
        ];
      }
      if (field === "support") {
        return ["a computer and papers", "daily bags and keys", "something else"];
      }
    }
    if (piece === "coffee table" || piece === "side table") {
      if (field === "purpose") return ["display", "gathering", "storage", "something else"];
      if (field === "support") {
        return ["daily bags and keys", "heavy objects", "something else"];
      }
    }
    if (piece === "cutting board" || /\bcutting board\b/i.test(piece)) {
      if (field === "purpose") return ["food prep", "display", "something else"];
      if (field === "include") return ["nothing extra", "something else"];
      if (field === "support") return ["heavy objects", "something else"];
    }
    return list;
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
        (select.value === "something else" ||
          select.value === "somewhere else");
      wrap.hidden = !show;
    });
    if (realForm) {
      var whenWrap = realForm.querySelector('[data-other-for="when"]');
      var whenSelect = realForm.querySelector('[name="when"]');
      if (whenWrap && whenSelect) {
        whenWrap.hidden = whenSelect.value !== "by a set date";
      }
    }
  }

  var lastKind = "";
  var lastSentence = "";
  var lastBriefId = "";

  function adaptForm() {
    var piece = currentPieceName();
    var klass = pieceClass(piece);
    var kind = form.piece.value + "|" + piece + "|" + klass;
    var defaults = DEFAULTS[klass] || DEFAULTS.other;
    if (piece === "desk" || /^desk\b/i.test(piece)) {
      defaults = {
        purpose: "working",
        include: "cable management",
        support: "a computer and papers",
        dims: ["60", "30", "30"]
      };
      kind += "|desk";
    }
    if (piece === "cutting board" || /\bcutting board\b/i.test(piece)) {
      defaults = DEFAULTS.other;
      kind += "|board";
    }
    if (kind !== lastKind) {
      lastKind = kind;
      ["purpose", "include", "support"].forEach(function (field) {
        fillSelect(form[field], fieldOptions(field, klass, piece), defaults[field]);
      });
      form.querySelector('[name="length"]').placeholder = defaults.dims[0];
      form.querySelector('[name="width"]').placeholder = defaults.dims[1];
      form.querySelector('[name="height"]').placeholder = defaults.dims[2];
      var verb = form.querySelector("#imagine-hold-verb");
      if (verb) {
        verb.textContent =
          klass === "wall" || klass === "lighting"
            ? "It is meant to hold"
            : "It needs to support";
      }
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
    var priority = (data.get("priority") || "").trim();
    slots.priorities = priority ? [priority] : [];
    slots.unusual = data.get("unusual") === "on";
    return slots;
  }

  function turnstileToken() {
    var input = form.querySelector('[name="cf-turnstile-response"]');
    return input ? input.value : "";
  }

  function setStatus(text) {
    statusEl.textContent = text || "";
  }

  function setRealStatus(text) {
    if (realStatusEl) realStatusEl.textContent = text || "";
  }

  function realDetails() {
    if (!realForm) return { place: "", when: "", whenNote: "" };
    var when = (realForm.when && realForm.when.value) || "";
    var whenNote = (realForm.whenNote && realForm.whenNote.value.trim()) || "";
    return {
      place: (realForm.place && realForm.place.value.trim()) || "",
      when: when,
      whenNote: when === "by a set date" ? whenNote : ""
    };
  }

  function updateMailto() {
    var extra = [];
    var details = realDetails();
    if (details.place) extra.push("It would be in " + details.place + ".");
    if (details.when) {
      extra.push(
        "Wanted " +
          details.when +
          (details.whenNote ? " (" + details.whenNote + ")" : "") +
          "."
      );
    }
    var bodyText = encodeURIComponent(
      "I used Imagine on the site.\n\n" +
        (lastSentence || "") +
        (extra.length ? "\n\n" + extra.join(" ") : "") +
        "\n"
    );
    emailLink.href =
      "mailto:" +
      (config.email || "") +
      "?subject=" +
      encodeURIComponent("Venerable Grain sketch") +
      "&body=" +
      bodyText;
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
        lastSentence = body.sentence || "";
        lastBriefId = body.briefId || "";
        if (realForm) {
          realForm.reset();
          setRealStatus("");
          toggleOthers();
        }
        updateMailto();
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

  if (realForm) {
    realForm.addEventListener("input", function () {
      toggleOthers();
      updateMailto();
    });
    realForm.addEventListener("change", function () {
      toggleOthers();
      updateMailto();
    });
    realForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var details = realDetails();
      if (!details.place && !details.when && !details.whenNote) {
        setRealStatus("Add a place or a time.");
        return;
      }
      if (!lastBriefId) {
        updateMailto();
        setRealStatus("Added to the note you can send.");
        return;
      }
      realSubmit.disabled = true;
      setRealStatus("Saving…");
      fetch(config.api.replace(/\/$/, "") + "/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefId: lastBriefId,
          place: details.place,
          when: details.when,
          whenNote: details.whenNote
        })
      })
        .then(function (res) {
          return res.json().then(function (body) {
            if (!res.ok) {
              throw new Error(body.error || "Could not add that.");
            }
            return body;
          });
        })
        .then(function () {
          updateMailto();
          setRealStatus("Added.");
        })
        .catch(function (err) {
          var msg = err.message || "Could not add that.";
          if (err.name === "TypeError" || msg === "Failed to fetch") {
            msg = "Could not add that.";
          }
          setRealStatus(msg);
        })
        .then(function () {
          realSubmit.disabled = false;
        });
    });
  }
})();
