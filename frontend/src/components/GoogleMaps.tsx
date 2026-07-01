export default function GoogleMaps() {
  // Ganti pencarian ke nama bangunan spesifik yang terdaftar di Maps
  const namaTempat = "Masjid Sahari, Pacul, Tegal";
  
  // Menggunakan URL https://maps.google.com/maps?q= yang sangat stabil untuk pencarian nama tempat
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(namaTempat)}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full h-100 md:h-125 bg-gray-100 relative">
      <iframe
        title="Lokasi Masjid Sahari - Syubbanul Khoir"
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 grayscale-20 contrast-90" 
      ></iframe>
    </div>
  );
}