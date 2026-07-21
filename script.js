const LOCATION_URL = "https://share.google/dvuONBPlAgeGWWiHf";
const WHATSAPP_NUMBER = "40723544064";

const form = document.querySelector("#rsvp-form");
const nameInput = document.querySelector("#guest-name");
const adultsInput = document.querySelector("#adults");
const childrenInput = document.querySelector("#children");
const noteInput = document.querySelector("#note");
const counts = document.querySelector("#guest-counts");
const preview = document.querySelector("#message-preview");
const attendanceInputs = [...document.querySelectorAll('input[name="attendance"]')];

function selectedAttendance() {
  return attendanceInputs.find((input) => input.checked)?.value || "yes";
}

function buildMessage() {
  const guestName = nameInput.value.trim() || "[numele vostru]";
  const note = noteInput.value.trim();

  if (selectedAttendance() === "no") {
    return `Bună, Maria și Marius! Sunt ${guestName}. Din păcate, nu voi putea participa la nunta voastră din 21 august 2026, ora 16:00, la Experience Lyan Events, Cernica. Vă mulțumesc pentru invitație și vă doresc o zi minunată!${note ? `\n\nMesaj: ${note}` : ""}\n\nLocație: ${LOCATION_URL}`;
  }

  const adults = Number(adultsInput.value);
  const children = Number(childrenInput.value);
  const adultText = adults === 1 ? "1 adult" : `${adults} adulți`;
  const childText = children === 0 ? "" : children === 1 ? " și 1 copil" : ` și ${children} copii`;
  return `Bună, Maria și Marius! Sunt ${guestName}. Confirm cu drag prezența la nunta voastră din 21 august 2026, ora 16:00, la Experience Lyan Events, Cernica. Vom fi ${adultText}${childText}.${note ? `\n\nMesaj: ${note}` : ""}\n\nLocație: ${LOCATION_URL}`;
}

function refresh() {
  const isComing = selectedAttendance() === "yes";
  counts.hidden = !isComing;
  document.querySelectorAll(".choice").forEach((choice) => {
    choice.classList.toggle("is-selected", choice.querySelector("input").checked);
  });
  preview.textContent = buildMessage();
}

form.addEventListener("input", refresh);
form.addEventListener("change", refresh);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
});

refresh();
