export default function Home() {
  const trucks = [
    {
      polisi: "W 7723 AHB",
      jenis: "Truk Kontainer",
      pemilik: "Pancaran Darat",
      rute: "Surabaya–Gresik",
      kirTerakhir: "2025-04-10",
      masaBerlaku: "2027-04-10",
      sisaHari: 288,
      status: "Valid",
    },
    {
      polisi: "S 6614 XYZ",
      jenis: "Truk Kontainer",
      pemilik: "Pancaran Darat",
      rute: "Blitar–Tulungagung",
      kirTerakhir: "2025-01-08",
      masaBerlaku: "2027-01-08",
      sisaHari: 196,
      status: "Valid",
    },
    {
      polisi: "P 8812 KLM",
      jenis: "Truk Kontainer",
      pemilik: "Pancaran Darat",
      rute: "Pasuruan–Probolinggo",
      kirTerakhir: "2024-09-22",
      masaBerlaku: "2026-07-22",
      sisaHari: 26,
      status: "Segera Habis",
    },
    {
      polisi: "B 8821 TBF",
      jenis: "Truk Kontainer",
      pemilik: "Iron Bird",
      rute: "Jakarta–Surabaya",
      kirTerakhir: "2023-06-14",
      masaBerlaku: "2026-06-30",
      sisaHari: 4,
      status: "Segera Habis",
    },
    {
      polisi: "D 3302 MKL",
      jenis: "Truk Kontainer",
      pemilik: "Iron Bird",
      rute: "Bandung–Semarang",
      kirTerakhir: "2022-11-20",
      masaBerlaku: "2023-11-20",
      sisaHari: -949,
      status: "Kadaluarsa",
    },
    {
      polisi: "K 2278 BBA",
      jenis: "Truk Kontainer",
      pemilik: "Iron Bird",
      rute: "Semarang–Yogyakarta",
      kirTerakhir: "-",
      masaBerlaku: "-",
      sisaHari: "-",
      status: "Belum KIR",
    },
  ];

  const statusBadge = (status: string) => {
    if (status === "Valid")
      return "bg-green-500/20 text-green-400 border border-green-500/30";
    if (status === "Segera Habis")
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
    if (status === "Kadaluarsa")
      return "bg-red-500/20 text-red-400 border border-red-500/30";
    return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Monitoring KIR Armada Truk</h1>
        <p className="text-gray-400 text-sm mt-1">
          Periode: Jan–Jun 2025 · Total Armada: {trucks.length} Unit
        </p>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#1B2A4A] rounded-xl p-4 border border-[#2E4A7A]">
            <p className="text-sm text-[#5B9BD5]">Belum KIR</p>
            <p className="text-3xl font-bold text-[#5B9BD5]">3</p>
            <p className="text-sm text-[#5B9BD5]">Unit</p>
          </div>

          <div className="bg-[#4A1B1B] rounded-xl p-4 border border-[#7A2E2E]">
            <p className="text-sm text-[#D55B5B]">Kadaluarsa</p>
            <p className="text-3xl font-bold text-[#D55B5B]">5</p>
            <p className="text-sm text-[#D55B5B]">Unit</p>
          </div>

          <div className="bg-[#4A3B1B] rounded-xl p-4 border border-[#7A5E2E]">
            <p className="text-sm text-[#D5A55B]">Segera Habis</p>
            <p className="text-3xl font-bold text-[#D5A55B]">3</p>
            <p className="text-sm text-[#D5A55B]">Unit</p>
          </div>

          <div className="bg-[#1B4A2A] rounded-xl p-4 border border-[#2E7A4A]">
            <p className="text-sm text-[#5BD57A]">Valid</p>
            <p className="text-3xl font-bold text-[#5BD57A]">5</p>
            <p className="text-sm text-[#5BD57A]">Unit</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 uppercase text-xs tracking-wider">
              <th className="px-4 py-3 text-left">No. Polisi</th>
              <th className="px-4 py-3 text-left">Jenis Truk</th>
              <th className="px-4 py-3 text-left">Pemilik</th>
              <th className="px-4 py-3 text-left">Rute</th>
              <th className="px-4 py-3 text-left">KIR Terakhir</th>
              <th className="px-4 py-3 text-left">Masa Berlaku</th>
              <th className="px-4 py-3 text-left">Sisa Hari</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {trucks.map((t, i) => (
              <tr
                key={i}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium">{t.polisi}</td>
                <td className="px-4 py-3 text-gray-300">{t.jenis}</td>
                <td className="px-4 py-3 text-gray-300">{t.pemilik}</td>
                <td className="px-4 py-3 text-gray-300">{t.rute}</td>
                <td className="px-4 py-3 text-gray-300">{t.kirTerakhir}</td>
                <td className="px-4 py-3 text-gray-300">{t.masaBerlaku}</td>
                <td className="px-4 py-3 text-gray-300">{t.sisaHari}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${statusBadge(t.status)}`}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
