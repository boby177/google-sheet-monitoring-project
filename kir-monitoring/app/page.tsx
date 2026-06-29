"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Search,
  XCircle,
  AlertTriangle,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  const [trucks, setTrucks] = useState([]);

  const [sortKey, setSortKey] = useState("");
  const [search, setSearch] = useState("");

  const [sortDir, setSortDir] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("");

  // Call the API trucks route to fetch the data from Google Sheets
  fetch("/api/trucks")
    .then((res) => res.json())
    .then((data) => setTrucks(data));

  const circleChartData = useMemo(
    () => [
      {
        name: "Belum KIR",
        value: trucks.filter((t) => t["Status"] === "Belum KIR").length,
      },
      {
        name: "Kadaluarsa",
        value: trucks.filter((t) => t["Status"] === "Kadaluarsa").length,
      },
      {
        name: "Segera Habis",
        value: trucks.filter((t) => t["Status"] === "Segera Habis").length,
      },
      {
        name: "Valid",
        value: trucks.filter((t) => t["Status"] === "Valid").length,
      },
    ],
    [trucks],
  );

  const barChartData = useMemo(() => {
    const vendors = [...new Set(trucks.map((t) => t["Pemilik"]))];
    return vendors.map((vendor) => {
      const vendorTrucks = trucks.filter((t) => t["Pemilik"] === vendor);
      return {
        vendor,
        belumKIR: vendorTrucks.filter((t) => t["Status"] === "Belum KIR")
          .length,
        kadaluarsa: vendorTrucks.filter((t) => t["Status"] === "Kadaluarsa")
          .length,
        segeraHabis: vendorTrucks.filter((t) => t["Status"] === "Segera Habis")
          .length,
        valid: vendorTrucks.filter((t) => t["Status"] === "Valid").length,
      };
    });
  }, [trucks]);

  // Sorting data on the table
  const sortedTrucks = useMemo(() => {
    if (!sortKey) return trucks;
    return [...trucks].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortDir === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [trucks, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filteredTrucks = useMemo(() => {
    let result = sortedTrucks;
    if (statusFilter)
      result = result.filter((t) => t["Status"] === statusFilter);
    if (search)
      result = result.filter((t) =>
        Object.values(t).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase()),
        ),
      );
    return result;
  }, [sortedTrucks, search, statusFilter]);

  const renderLabel = useCallback(
    ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={12}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    },
    [],
  );

  const statusBadge = (status: string) => {
    if (status === "Valid")
      return "bg-green-500/20 text-green-400 border border-green-500/30";
    if (status === "Segera Habis")
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
    if (status === "Kadaluarsa")
      return "bg-red-500/20 text-red-400 border border-red-500/30";
    if (status === "Belum KIR")
      return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
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

      {/* Card Data */}
      <div className="mb-6">
        <div className="grid grid-cols-4 gap-4">
          <div
            className="bg-[#1B2A4A] rounded-xl p-4 border border-[#2E4A7A] cursor-pointer"
            onClick={() =>
              setStatusFilter(statusFilter === "Belum KIR" ? "" : "Belum KIR")
            }
          >
            <p className="text-sm text-[#5B9BD5] flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Belum KIR
            </p>
            <p className="text-3xl font-bold text-[#5B9BD5]">
              {circleChartData[0].value}
            </p>
            <p className="text-sm text-[#5B9BD5]">unit</p>
          </div>

          <div
            className="bg-[#4A1B1B] rounded-xl p-4 border border-[#7A2E2E] cursor-pointer"
            onClick={() =>
              setStatusFilter(statusFilter === "Kadaluarsa" ? "" : "Kadaluarsa")
            }
          >
            <p className="text-sm text-[#D55B5B] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Kadaluarsa
            </p>
            <p className="text-3xl font-bold text-[#D55B5B]">
              {circleChartData[1].value}
            </p>
            <p className="text-sm text-[#D55B5B]">unit</p>
          </div>

          <div
            className="bg-[#4A3B1B] rounded-xl p-4 border border-[#7A5E2E] cursor-pointer"
            onClick={() =>
              setStatusFilter(
                statusFilter === "Segera Habis" ? "" : "Segera Habis",
              )
            }
          >
            <p className="text-sm text-[#D5A55B] flex items-center gap-2">
              <Clock className="w-4 h-4" /> Segera Habis
            </p>
            <p className="text-3xl font-bold text-[#D5A55B]">
              {circleChartData[2].value}
            </p>
            <p className="text-sm text-[#D5A55B]">unit</p>
          </div>

          <div
            className="bg-[#1B4A2A] rounded-xl p-4 border border-[#2E7A4A] cursor-pointer"
            onClick={() =>
              setStatusFilter(statusFilter === "Valid" ? "" : "Valid")
            }
          >
            <p className="text-sm text-[#5BD57A] flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Valid
            </p>
            <p className="text-3xl font-bold text-[#5BD57A]">
              {circleChartData[3].value}
            </p>
            <p className="text-sm text-[#5BD57A]">unit</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          {/* Pie Chart Data */}
          <div className="bg-gray-900 rounded-xl p-4">
            <div className="border-b border-gray-800 pb-3 mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Distribusi Status KIR
              </p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart width={500} height={400}>
                <Pie
                  data={circleChartData}
                  innerRadius={80}
                  outerRadius={120}
                  dataKey="value"
                  label={renderLabel}
                  labelLine={false}
                  paddingAngle={3}
                  isAnimationActive={false}
                >
                  <Cell fill="#3B82F6" stroke="#0d1117" />
                  <Cell fill="#EF4444" stroke="#0d1117" />
                  <Cell fill="#F59E0B" stroke="#0d1117" />
                  <Cell fill="#22C55E" stroke="#0d1117" />
                </Pie>
                <Legend
                  formatter={(value, entry) =>
                    `${value} (${entry.payload.value})`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart Data */}
          <div className="bg-gray-900 rounded-xl p-4">
            <div className="border-b border-gray-800 pb-3 mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                {" "}
                STATUS KIR PER Vendor · TRUK KONTAINER
              </p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                width={1100}
                height={400}
                data={barChartData}
                barCategoryGap="20%"
                barGap={10}
              >
                <CartesianGrid stroke="#333" />
                <XAxis dataKey="vendor" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="belumKIR" fill="#3B82F6" name="Belum KIR" />
                <Bar dataKey="kadaluarsa" fill="#EF4444" name="Kadaluarsa" />
                <Bar dataKey="segeraHabis" fill="#F59E0B" name="Segera Habis" />
                <Bar dataKey="valid" fill="#22C55E" name="Valid" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Data */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Data Armada · {filteredTrucks.length} Unit
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari No. Pol, pemilik..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-800 text-sm text-white pl-9 pr-3 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-yellow-500 w-64"
            />
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 uppercase text-xs tracking-wider">
              <th
                className="px-4 py-3 text-left cursor-pointer"
                onClick={() => handleSort("No. Polisi")}
              >
                <span className="flex items-center gap-1">
                  No. Polisi
                  <span className="text-grey-500">
                    {sortKey === "No. Polisi"
                      ? sortDir === "asc"
                        ? "↑"
                        : "↓"
                      : "↕"}
                  </span>
                </span>
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer"
                onClick={() => handleSort("Jenis Truk")}
              >
                <span className="flex items-center gap-1">
                  Jenis Truk
                  <span className="text-grey-500">
                    {sortKey === "Jenis Truk"
                      ? sortDir === "asc"
                        ? "↑"
                        : "↓"
                      : "↕"}
                  </span>
                </span>
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer"
                onClick={() => handleSort("Pemilik")}
              >
                <span className="flex items-center gap-1">
                  Pemilik
                  <span className="text-grey-500">
                    {sortKey === "Pemilik"
                      ? sortDir === "asc"
                        ? "↑"
                        : "↓"
                      : "↕"}
                  </span>
                </span>
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer"
                onClick={() => handleSort("Rute")}
              >
                <span className="flex items-center gap-1">
                  Rute
                  <span className="text-grey-500">
                    {sortKey === "Rute" ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
                  </span>
                </span>
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer"
                onClick={() => handleSort("KIR Terakhir")}
              >
                <span className="flex items-center gap-1">
                  KIR Terakhir
                  <span className="text-grey-500">
                    {sortKey === "KIR Terakhir"
                      ? sortDir === "asc"
                        ? "↑"
                        : "↓"
                      : "↕"}
                  </span>
                </span>
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer"
                onClick={() => handleSort("Masa Berlaku")}
              >
                <span className="flex items-center gap-1">
                  Masa Berlaku
                  <span className="text-grey-500">
                    {sortKey === "Masa Berlaku"
                      ? sortDir === "asc"
                        ? "↑"
                        : "↓"
                      : "↕"}
                  </span>
                </span>
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer"
                onClick={() => handleSort("Sisa Hari")}
              >
                <span className="flex items-center gap-1">
                  Sisa Hari
                  <span className="text-grey-500">
                    {sortKey === "Sisa Hari"
                      ? sortDir === "asc"
                        ? "↑"
                        : "↓"
                      : "↕"}
                  </span>
                </span>
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer"
                onClick={() => handleSort("Status")}
              >
                <span className="flex items-center gap-1">
                  Status
                  <span className="text-grey-500">
                    {sortKey === "Status"
                      ? sortDir === "asc"
                        ? "↑"
                        : "↓"
                      : "↕"}
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTrucks.map((t, i) => (
              <tr
                key={i}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium">
                  {t["No. Polisi"] || "-"}
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {t["Jenis Truk"] || "-"}
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {t["Pemilik"] || "-"}
                </td>
                <td className="px-4 py-3 text-gray-300">{t["Rute"] || "-"}</td>
                <td className="px-4 py-3 text-gray-300">
                  {t["KIR Terakhir"] || "-"}
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {t["Masa Berlaku"] || "-"}
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {t["Sisa Hari"] || "-"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${statusBadge(t["Status"])}`}
                  >
                    {t["Status"]}
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
