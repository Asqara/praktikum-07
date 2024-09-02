document.getElementById('calcForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let r = parseFloat(document.getElementById('r').value);
    let v0 = parseFloat(document.getElementById('v0').value);
    let delt_v = parseFloat(document.getElementById('delt_v').value);
    let pCairan = parseFloat(document.getElementById('liquid').value);

    let R = r / 1000; // Konversi mm ke m
    let V = v0 / 100; // Konversi cm/s ke m/s
    let g = 9.8; // Gravitasi
    let pB = 2700; // Massa jenis benda (kg/m^3)
    let delt_r = 0.005 / 1000; // Toleransi radius, dikonversi ke m

    // Menghitung viskositas
    let viskositas = (2 * Math.pow(R, 2) * (pB - pCairan) * g) / (9 * V);

    // Menghitung kesalahan ukur viskositas
    let akar = Math.sqrt(Math.pow((2 * R / V), 2) * Math.pow(((2/3) * delt_r), 2) + Math.pow((Math.pow(R, 2) / Math.pow(V, 2)), 2) * Math.pow(delt_v / 100, 2));
    let delta_n = (2 / 9) * (pB - pCairan) * g * akar;

    // Fungsi untuk membulatkan ke satu angka penting
    function roundToSignificantFigures(num, n) {
        if (num === 0) return 0;
        const d = Math.ceil(Math.log10(num < 0 ? -num : num));
        const power = n - d;
        const magnitude = Math.pow(10, power);
        const shifted = Math.round(num * magnitude);
        return shifted / magnitude;
    }

    // Membulatkan kesalahan ukur ke satu angka penting
    let delta_n_rounded = roundToSignificantFigures(delta_n, 1);

    // Menentukan jumlah desimal untuk viskositas berdasarkan kesalahan ukur
    let decimalPlaces = Math.max(0, -Math.floor(Math.log10(delta_n_rounded)));

    // Membulatkan viskositas sesuai dengan jumlah desimal
    let viskositas_rounded = viskositas.toFixed(decimalPlaces);

    document.getElementById('result').textContent = `Viskositas: ${viskositas_rounded} Pa.s`;
    document.getElementById('errorResult').textContent = `Kesalahan Ukur: ${delta_n_rounded.toPrecision(1)} Pa.s`;
});




function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const tombol = document.getElementById('tombolkecil');
    const content = document.getElementById('container');
 
    sidebar.classList.toggle('open');
    tombol.classList.toggle('close');
    content.classList.toggle('shifted');
}