<!-- ============================ -->
<!-- assets/js/main.js -->
<!-- ============================ -->
// Load total generus
async function loadTotal(api) {
  const res = await fetch(api + "?action=getMaster");
  const data = await res.json();
  document.getElementById("total").innerHTML = data.data.length;
}

// Load aggregation per kelompok
async function loadAgg(api) {
  const res = await fetch(api + "?action=agg");
  const data = await res.json();

  let html = "";
  data.data.forEach(item => {
    html += `
      <div>
        <a href="kelompok.html?nama=${item.kelompok}">
          ${item.kelompok} — ${item.total} orang
        </a>
      </div>`;
  });

  document.getElementById("list").innerHTML = html;
}

// Load anggota per kelompok
async function loadKelompok(api) {
  const p = new URLSearchParams(location.search);
  const kelompok = p.get("nama");
  const token = localStorage.getItem("token") || "";

  document.getElementById("title").innerText = "Kelompok " + kelompok;

  const res = await fetch(`${api}?action=group&kelompok=${kelompok}&token=${token}`);
  const data = await res.json();

  if (data.status === "error") {
    document.getElementById("content").innerHTML = `<p>Akses terbatas: ${data.message}</p>`;
    return;
  }

  let html = "<ul>";
  data.data.forEach(o => {
    html += `<li>${o.nama} — ${o.jenjang} — ${o.desa}</li>`;
  });
  html += "</ul>";

  document.getElementById("content").innerHTML = html;
}



