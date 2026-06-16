import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Server, Cpu, HardDrive, Thermometer, Zap, Network, Shield, Gauge, MemoryStick, ArrowLeft, X } from "lucide-react";

type ViewMode = "grid" | "machine" | "component";

interface ComponentInfo {
  id: string;
  icon: any;
  label: string;
  value: string;
  detail: string;
  color: string;
  specs: string[];
  animation: "cpu" | "ram" | "disk" | "network" | "power" | "cooling" | "protection" | "gauge";
}

interface MachineInfo {
  name: string;
  type: string;
  tagColor: string;
  components: ComponentInfo[];
}

const machines: MachineInfo[] = [
  {
    name: "Game Servers",
    type: "AMD Ryzen 9 7950X",
    tagColor: "#3b82f6",
    components: [
      { id: "cpu", icon: Cpu, label: "CPU", value: "Ryzen 9 7950X", detail: "16 Cores / 32 Threads @ 5.7GHz", color: "#3b82f6", specs: ["16 Cores", "32 Threads", "5.7 GHz Boost", "105W TDP", "Zen 4 Architecture"], animation: "cpu" },
      { id: "ram", icon: MemoryStick, label: "RAM", value: "32GB DDR5", detail: "5600MHz ECC Registered", color: "#8b5cf6", specs: ["32 GB Capacity", "DDR5-5600", "ECC Registered", "Dual Channel", "CL40 Latency"], animation: "ram" },
      { id: "disk", icon: HardDrive, label: "Storage", value: "1TB NVMe SSD", detail: "Samsung 990 Pro PCIe 4.0", color: "#10b981", specs: ["1 TB Capacity", "7,450 MB/s Read", "6,900 MB/s Write", "PCIe 4.0 x4", "TLC V-NAND"], animation: "disk" },
      { id: "network", icon: Network, label: "Network", value: "2 Gbps Port", detail: "Dedicated Unmetered Bandwidth", color: "#ec4899", specs: ["2 Gbps Speed", "Unmetered Traffic", "IPv4 + IPv6", "DDoS Protection", "Low Latency"], animation: "network" },
      { id: "power", icon: Zap, label: "Power", value: "Redundant PSU", detail: "N+1 Hot-Swap 80+ Titanium", color: "#f59e0b", specs: ["N+1 Redundancy", "80+ Titanium", "Hot-Swap Ready", "Auto Failover", "Remote Monitor"], animation: "power" },
      { id: "cooling", icon: Thermometer, label: "Cooling", value: "Liquid Cooled", detail: "Custom Loop with 360mm Rad", color: "#06b6d4", specs: ["Custom Loop", "360mm Radiator", "RGB Waterblock", "Low Noise <28dB", "Temp Monitored"], animation: "cooling" },
    ],
  },
  {
    name: "VPS Nodes",
    type: "AMD EPYC 9J14",
    tagColor: "#8b5cf6",
    components: [
      { id: "cpu", icon: Cpu, label: "CPU", value: "EPYC 9J14", detail: "128 Cores / 256 Threads @ 3.7GHz", color: "#3b82f6", specs: ["128 Cores", "256 Threads", "3.7 GHz Boost", "360W TDP", "Genoa Architecture"], animation: "cpu" },
      { id: "ram", icon: MemoryStick, label: "RAM", value: "512GB DDR5", detail: "4800MHz ECC RDIMM", color: "#8b5cf6", specs: ["512 GB Capacity", "DDR5-4800", "ECC RDIMM", "12 Channel", "3DS Stacked"], animation: "ram" },
      { id: "disk", icon: HardDrive, label: "Storage", value: "15TB NVMe", detail: "Intel Optane P5800X RAID", color: "#10b981", specs: ["15 TB Total", "PCIe 5.0 x8", "RAID-10 Array", "100 DWPD Endurance", "PLP Protected"], animation: "disk" },
      { id: "network", icon: Network, label: "Network", value: "10 Gbps Port", detail: "Redundant Carrier Connections", color: "#ec4899", specs: ["10 Gbps Speed", "Dual Uplink", "BGP Routing", "MPLS Backbone", "99.999% SLA"], animation: "network" },
      { id: "power", icon: Zap, label: "Power", value: "A+B Redundant", detail: "Dual Feed 2N Power Architecture", color: "#f59e0b", specs: ["2N Architecture", "Dual UPS", "Diesel Generator", "Auto Transfer", "<10ms Switch"], animation: "power" },
      { id: "cooling", icon: Thermometer, label: "Cooling", value: "In-Row Liquid", detail: "Direct-to-Chip Liquid Cooling", color: "#06b6d4", specs: ["Direct-to-Chip", "In-Row Units", "Free Cooling", "<22°C Inlet", "Zero Compressors"], animation: "cooling" },
    ],
  },
  {
    name: "AI Compute",
    type: "8x NVIDIA A100",
    tagColor: "#10b981",
    components: [
      { id: "cpu", icon: Cpu, label: "CPU", value: "EPYC 7763", detail: "64 Cores / 128 Threads @ 3.5GHz", color: "#3b82f6", specs: ["64 Cores", "128 Threads", "3.5 GHz Boost", "280W TDP", "Milan Architecture"], animation: "cpu" },
      { id: "ram", icon: MemoryStick, label: "RAM", value: "2TB DDR4", detail: "3200MHz ECC LR-DIMM", color: "#8b5cf6", specs: ["2 TB Capacity", "DDR4-3200", "ECC LR-DIMM", "8 Channel", "256GB Sticks"], animation: "ram" },
      { id: "disk", icon: HardDrive, label: "Storage", value: "8TB NVMe", detail: "Enterprise Gen5 with PLP", color: "#10b981", specs: ["8 TB Total", "PCIe 5.0 x4", "RAID-1 Config", "1 DWPD Endurance", "Power Loss Prot"], animation: "disk" },
      { id: "network", icon: Network, label: "Network", value: "100 Gbps", detail: "InfiniBand HDR Interconnect", color: "#ec4899", specs: ["100 Gbps IB", "HDR 200G", "RDMA Support", "NVLink Bridge", "GPUDirect"], animation: "network" },
      { id: "power", icon: Zap, label: "Power", value: "3000W Redundant", detail: "Dual 3kW Titanium PSU", color: "#f59e0b", specs: ["3000W Total", "Dual PSU", "80+ Titanium", "Hot-Swap", "IPMI Monitor"], animation: "power" },
      { id: "cooling", icon: Thermometer, label: "Cooling", value: "GPU Liquid", detail: "Full-Cover Waterblock for 8x A100", color: "#06b6d4", specs: ["Full-Cover Block", "8 GPU Loop", "480mm Rad Array", "<65°C Under Load", "Flow Monitored"], animation: "cooling" },
    ],
  },
  {
    name: "Edge Servers",
    type: "Intel Xeon W9-3595X",
    tagColor: "#f59e0b",
    components: [
      { id: "cpu", icon: Cpu, label: "CPU", value: "Xeon W9-3595X", detail: "60 Cores / 120 Threads @ 4.6GHz", color: "#3b82f6", specs: ["60 Cores", "120 Threads", "4.6 GHz Boost", "350W TDP", "Sapphire Rapids"], animation: "cpu" },
      { id: "ram", icon: MemoryStick, label: "RAM", value: "256GB DDR5", detail: "5200MHz ECC RDIMM", color: "#8b5cf6", specs: ["256 GB Capacity", "DDR5-5200", "ECC RDIMM", "8 Channel", "CL40"], animation: "ram" },
      { id: "disk", icon: HardDrive, label: "Storage", value: "4TB NVMe", detail: "Micron 7450 Pro RAID-5", color: "#10b981", specs: ["4 TB Total", "PCIe 4.0 x4", "RAID-5 Array", "3 DWPD Endurance", "FIPS 140-3"], animation: "disk" },
      { id: "network", icon: Network, label: "Network", value: "25 Gbps", detail: "Dual 25GbE Bonded", color: "#ec4899", specs: ["25 Gbps x2", "Bonded LACP", "SR-IOV Ready", "RDMA/RoCEv2", "Sub-5μs Latency"], animation: "network" },
      { id: "power", icon: Zap, label: "Power", value: "1600W Redundant", detail: "Dual Platinum Hot-Swap", color: "#f59e0b", specs: ["1600W Rated", "80+ Platinum", "Dual Feed", "Remote PDU", "Kill Switch"], animation: "power" },
      { id: "cooling", icon: Thermometer, label: "Cooling", value: "Air Cooled+", detail: "Tower Heatsinks with 120mm Push-Pull", color: "#06b6d4", specs: ["Tower Heatsink", "Push-Pull Fans", "6x 120mm", "Dust Filtered", "<30dB Noise"], animation: "cooling" },
    ],
  },
  {
    name: "Storage Nodes",
    type: "AMD EPYC 9354P",
    tagColor: "#ec4899",
    components: [
      { id: "cpu", icon: Cpu, label: "CPU", value: "EPYC 9354P", detail: "32 Cores / 64 Threads @ 3.25GHz", color: "#3b82f6", specs: ["32 Cores", "64 Threads", "3.25 GHz", "260W TDP", "Genoa SP5"], animation: "cpu" },
      { id: "ram", icon: MemoryStick, label: "RAM", value: "512GB DDR5", detail: "4800MHz ECC with MRDIMM", color: "#8b5cf6", specs: ["512 GB Capacity", "DDR5-4800", "ECC MRDIMM", "12 Channel", "Advanced ECC"], animation: "ram" },
      { id: "disk", icon: HardDrive, label: "Storage", value: "120TB HDD+SSD", detail: "12x 10TB HDD + 4x 2TB NVMe Cache", color: "#10b981", specs: ["120 TB Raw", "ZFS Pool", "8TB NVMe Read", "RAID-Z2", "Snapshots"], animation: "disk" },
      { id: "network", icon: Network, label: "Network", value: "25 Gbps", detail: "Dual Bonded with jumbo frames", color: "#ec4899", specs: ["25 Gbps x2", "9000 MTU", "LACP Bond", "iSCSI Ready", "NFS Optimized"], animation: "network" },
      { id: "power", icon: Zap, label: "Power", value: "1200W Redundant", detail: "Dual hot-swap with remote reboot", color: "#f59e0b", specs: ["1200W Rated", "80+ Gold", "Dual Supply", "IPMI 2.0", "Alert Email"], animation: "power" },
      { id: "cooling", icon: Thermometer, label: "Cooling", value: "Front-to-Back", detail: "Optimized 4U airflow design", color: "#06b6d4", specs: ["4U Chassis", "Front Intake", "Rear Exhaust", "Temp Sensors", "Auto Fan Ctrl"], animation: "cooling" },
    ],
  },
  {
    name: "Database Servers",
    type: "Intel Xeon 6980P",
    tagColor: "#06b6d4",
    components: [
      { id: "cpu", icon: Cpu, label: "CPU", value: "Xeon 6980P", detail: "128 Cores / 256 Threads @ 3.9GHz", color: "#3b82f6", specs: ["128 Cores", "256 Threads", "3.9 GHz", "385W TDP", "Granite Rapids"], animation: "cpu" },
      { id: "ram", icon: MemoryStick, label: "RAM", value: "1TB DDR5", detail: "6400MHz MCRDIMM", color: "#8b5cf6", specs: ["1 TB Capacity", "DDR5-6400", "MCRDIMM", "12 Channel", "On-die ECC"], animation: "ram" },
      { id: "disk", icon: HardDrive, label: "Storage", value: "8TB NVMe", detail: "Intel Optane P5800X", color: "#10b981", specs: ["8 TB Total", "Optane PMem", "100 DWPD", "Byte-level Access", "Persistent"], animation: "disk" },
      { id: "network", icon: Network, label: "Network", value: "100 Gbps", detail: "Dual 100GbE with RDMA", color: "#ec4899", specs: ["100 Gbps x2", "RDMA/RoCE", "SRQ Support", "Zero-Copy", "Jumbo Frames"], animation: "network" },
      { id: "power", icon: Zap, label: "Power", value: "2400W Titanium", detail: "Triple redundant power path", color: "#f59e0b", specs: ["2400W Total", "Triple Path", "80+ Titanium", "Battery Backup", "Surge Protect"], animation: "power" },
      { id: "cooling", icon: Thermometer, label: "Cooling", value: "Immersion", detail: "Single-phase liquid immersion tank", color: "#06b6d4", specs: ["Immersion Tank", "Dielectric Fluid", "Zero Fans", "50% Less Power", "Submersible"], animation: "cooling" },
    ],
  },
  {
    name: "Load Balancers",
    type: "Intel Xeon 6780P",
    tagColor: "#ef4444",
    components: [
      { id: "cpu", icon: Cpu, label: "CPU", value: "Xeon 6780P", detail: "64 Cores / 128 Threads @ 4.1GHz", color: "#3b82f6", specs: ["64 Cores", "128 Threads", "4.1 GHz", "270W TDP", "Emerald Rapids"], animation: "cpu" },
      { id: "ram", icon: MemoryStick, label: "RAM", value: "128GB DDR5", detail: "5600MHz ECC RDIMM", color: "#8b5cf6", specs: ["128 GB Capacity", "DDR5-5600", "ECC RDIMM", "8 Channel", "Low Latency"], animation: "ram" },
      { id: "disk", icon: HardDrive, label: "Storage", value: "1TB NVMe", detail: "Boot + Config mirror", color: "#10b981", specs: ["1 TB Mirror", "PCIe 4.0", "RAID-1", "Config Store", "Fast Boot"], animation: "disk" },
      { id: "network", icon: Network, label: "Network", value: "40 Gbps x4", detail: "Quad 40GbE LACP", color: "#ec4899", specs: ["4x 40 Gbps", "LACP 160G", "HEX-TCP Offload", "DDoS Mitigate", "Geo-Balance"], animation: "network" },
      { id: "power", icon: Zap, label: "Power", value: "1600W Redundant", detail: "Dual feed with auto-transfer", color: "#f59e0b", specs: ["1600W Dual", "80+ Platinum", "Auto Transfer", "Failover <1s", "SNMP Alert"], animation: "power" },
      { id: "cooling", icon: Thermometer, label: "Cooling", value: "Rear Door", detail: "Rear-door heat exchanger", color: "#06b6d4", specs: ["Rear Door HX", "Chilled Water", "No Fans", "Silent Operation", "Smart Valve"], animation: "cooling" },
    ],
  },
];

function RackSVG({ machine, index, reduce, onClick }: { machine: MachineInfo; index: number; reduce: boolean; onClick: () => void }) {
  const x = 0;
  return (
    <motion.g
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <rect x={x} y={0} width={100} height={280} rx={8} fill="url(#rackGrad)" stroke="hsl(210 100% 55% / 0.2)" strokeWidth={1} />
      {Array.from({ length: 10 }).map((_, j) => (
        <g key={j}>
          <rect x={x + 8} y={12 + j * 26} width={84} height={20} rx={3} fill="hsl(220 30% 8%)" stroke="hsl(210 100% 55% / 0.12)" />
          <motion.circle
            cx={x + 18} cy={22 + j * 26} r={2.5}
            fill="hsl(140 90% 55%)"
            animate={reduce ? {} : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5 + (j % 3), repeat: Infinity, delay: index * 0.1 + j * 0.1 }}
          />
          <motion.circle
            cx={x + 28} cy={22 + j * 26} r={2.5}
            fill={machine.tagColor}
            animate={reduce ? {} : { opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2 + (j % 4), repeat: Infinity, delay: index * 0.1 + j * 0.15 }}
          />
          <rect x={x + 40} y={19 + j * 26} width={40} height={2} rx={1} fill={machine.tagColor + "30"} />
          <rect x={x + 40} y={23 + j * 26} width={30} height={2} rx={1} fill={machine.tagColor + "20"} />
          <rect x={x + 78} y={20 + j * 26} width={6} height={4} rx={1} fill={machine.tagColor + "40"} />
        </g>
      ))}
      <motion.rect
        x={x + 15} y={275} width={70} height={8} rx={4}
        fill={machine.tagColor}
        opacity={0.15}
        animate={reduce ? {} : { opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <text x={x + 50} y={-5} textAnchor="middle" fill="hsl(210 100% 80%)" fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
        {machine.name}
      </text>
      <motion.rect
        x={x} y={0} width={100} height={280} rx={8}
        fill="transparent" stroke={machine.tagColor + "40"} strokeWidth={1.5}
        whileHover={{ stroke: machine.tagColor, strokeWidth: 2, filter: "drop-shadow(0 0 8px " + machine.tagColor + "40)" }}
      />
    </motion.g>
  );
}

function AnimatedComponent({ comp, reduce }: { comp: ComponentInfo; reduce: boolean }) {
  const { animation, color } = comp;

  if (animation === "cpu") {
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="cpuGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.rect key={`pin-t-${i}`} x={20 + i * 10} y={5} width={4} height={14} rx={1}
            fill={color} opacity={0.5}
            animate={reduce ? {} : { y: [5, 3, 5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.rect key={`pin-b-${i}`} x={20 + i * 10} y={101} width={4} height={14} rx={1}
            fill={color} opacity={0.5}
            animate={reduce ? {} : { y: [101, 103, 101] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.rect key={`pin-l-${i}`} x={5} y={20 + i * 14} width={14} height={4} rx={1}
            fill={color} opacity={0.5}
            animate={reduce ? {} : { x: [5, 3, 5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.12 }}
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.rect key={`pin-r-${i}`} x={101} y={20 + i * 14} width={14} height={4} rx={1}
            fill={color} opacity={0.5}
            animate={reduce ? {} : { x: [101, 103, 101] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.12 }}
          />
        ))}
        <motion.rect x={18} y={18} width={84} height={84} rx={6} fill="url(#cpuGrad)" stroke={color} strokeWidth={1.5}
          animate={reduce ? {} : { strokeWidth: [1.5, 2.5, 1.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.rect x={30} y={30} width={60} height={60} rx={3} fill={color + "20"} stroke={color + "40"} strokeWidth={1}
          animate={reduce ? {} : { opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x={60} y={55} textAnchor="middle" fill={color} fontSize="10" fontWeight="bold" fontFamily="monospace">CPU</text>
        <text x={60} y={68} textAnchor="middle" fill={color} fontSize="6" fontFamily="monospace">RYZEN 9</text>
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.circle key={`heat-${i}`} cx={35 + (i % 4) * 14} cy={35 + Math.floor(i / 4) * 14} r={1.5}
            fill={color} opacity={0.2}
            animate={reduce ? {} : { opacity: [0.1, 0.5, 0.1], r: [1.5, 2.5, 1.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }}
          />
        ))}
      </svg>
    );
  }

  if (animation === "ram") {
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="ramGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.08" />
          </linearGradient>
        </defs>
        {[0, 1].map((stick) => (
          <g key={stick}>
            <motion.g
              initial={{ x: stick === 0 ? -20 : 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: stick * 0.2, type: "spring", stiffness: 100 }}
            >
              <rect x={25 + stick * 35} y={15} width={30} height={90} rx={3} fill="url(#ramGrad)" stroke={color} strokeWidth={1} />
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.rect key={i} x={28 + stick * 35} y={20 + i * 6} width={24} height={4} rx={1}
                  fill={color + "30"} stroke={color + "20"} strokeWidth={0.5}
                  animate={reduce ? {} : { opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 + stick * 0.1 }}
                />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <rect key={`chip-${stick}-${i}`} x={29 + stick * 35 + (i % 4) * 6} y={30 + Math.floor(i / 4) * 30} width={4} height={4} rx={0.5}
                  fill={color} opacity={0.6}
                />
              ))}
              <rect x={30 + stick * 35} y={100} width={20} height={3} rx={1} fill={color} opacity={0.4} />
              {Array.from({ length: 9 }).map((_, i) => (
                <rect key={`gold-${stick}-${i}`} x={27 + stick * 35 + i * 3} y={103} width={2} height={5} rx={0.5}
                  fill="#f59e0b" opacity={0.5}
                />
              ))}
            </motion.g>
          </g>
        ))}
        <motion.text x={60} y={8} textAnchor="middle" fill={color} fontSize="8" fontWeight="bold" fontFamily="monospace"
          animate={reduce ? {} : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          DDR5
        </motion.text>
      </svg>
    );
  }

  if (animation === "disk") {
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="diskGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <motion.circle cx={60} cy={55} r={40} fill="url(#diskGrad)" stroke={color} strokeWidth={1.5}
          animate={reduce ? {} : { strokeWidth: [1.5, 2, 1.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.circle cx={60} cy={55} r={30} fill="none" stroke={color + "20"} strokeWidth={0.5}
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 55px" }}
        />
        <motion.circle cx={60} cy={55} r={22} fill="none" stroke={color + "15"} strokeWidth={0.5}
          animate={reduce ? {} : { rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 55px" }}
        />
        <motion.circle cx={60} cy={55} r={14} fill={color + "30"} stroke={color} strokeWidth={1}
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 55px" }}
        />
        <circle cx={60} cy={55} r={5} fill={color} opacity={0.6} />
        <motion.rect x={55} y={85} width={10} height={20} rx={2} fill={color + "40"} stroke={color + "30"} strokeWidth={0.5} />
        <motion.g
          animate={reduce ? {} : { y: [0, -2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <rect x={57} y={80} width={6} height={3} rx={1} fill={color} opacity={0.6} />
        </motion.g>
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.circle key={i} cx={60} cy={55} r={18 + i * 8} fill="none" stroke={color + "10"} strokeWidth={0.3}
            animate={reduce ? {} : { opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </svg>
    );
  }

  if (animation === "network") {
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="netGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((port) => (
          <g key={port}>
            <rect x={20 + port * 30} y={40} width={22} height={30} rx={3} fill="url(#netGrad)" stroke={color + "40"} strokeWidth={1} />
            <motion.rect x={23 + port * 30} y={43} width={16} height={18} rx={2} fill="hsl(220 30% 12%)" stroke={color + "30"} strokeWidth={0.5} />
            <motion.circle cx={28 + port * 30} cy={65} r={2} fill={color}
              animate={reduce ? {} : { opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: port * 0.3 }}
            />
            <motion.circle cx={34 + port * 30} cy={65} r={2} fill="#10b981"
              animate={reduce ? {} : { opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: port * 0.3 + 0.15 }}
            />
          </g>
        ))}
        {[0, 1, 2].map((i) => (
          <motion.line key={`line-${i}`} x1={31 + i * 30} y1={70} x2={60} y2={95}
            stroke={color} strokeWidth={1} opacity={0.3}
            animate={reduce ? {} : { opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        <motion.g
          animate={reduce ? {} : { opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <circle cx={60} cy={95} r={8} fill="none" stroke={color} strokeWidth={1} />
          <circle cx={60} cy={95} r={4} fill={color} opacity={0.4} />
        </motion.g>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.circle key={`wave-${i}`} cx={60} cy={95} r={12 + i * 6} fill="none" stroke={color + "15"} strokeWidth={0.5}
            animate={reduce ? {} : { r: [12 + i * 6, 14 + i * 6, 12 + i * 6], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </svg>
    );
  }

  if (animation === "power") {
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="psuGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {[0, 1].map((psu) => (
          <g key={psu}>
            <motion.g
              initial={{ x: psu === 0 ? -15 : 15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: psu * 0.2, type: "spring" }}
            >
              <rect x={20 + psu * 38} y={20} width={32} height={80} rx={4} fill="url(#psuGrad)" stroke={color + "40"} strokeWidth={1} />
              <motion.circle cx={36 + psu * 38} cy={35} r={10} fill="none" stroke={color + "30"} strokeWidth={1}
                animate={reduce ? {} : { rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: `${36 + psu * 38}px 35px` }}
              />
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i / 6) * Math.PI * 2;
                return (
                  <motion.line key={i}
                    x1={36 + psu * 38} y1={35}
                    x2={36 + psu * 38 + Math.cos(angle) * 8} y2={35 + Math.sin(angle) * 8}
                    stroke={color} strokeWidth={1} opacity={0.4}
                    animate={reduce ? {} : { rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: `${36 + psu * 38}px 35px` }}
                  />
                );
              })}
              <rect x={25 + psu * 38} y={55} width={22} height={10} rx={1} fill="hsl(220 30% 10%)" stroke={color + "20"} strokeWidth={0.5} />
              {Array.from({ length: 3 }).map((_, i) => (
                <rect key={i} x={27 + psu * 38 + i * 7} y={57} width={5} height={6} rx={0.5} fill={color} opacity={0.3} />
              ))}
              <motion.rect x={25 + psu * 38} y={75} width={22} height={14} rx={2}
                fill="hsl(220 30% 10%)" stroke={color + "30"} strokeWidth={0.5}
                animate={reduce ? {} : { opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: psu * 0.3 }}
              />
              <text x={36 + psu * 38} y={84} textAnchor="middle" fill={color} fontSize="5" fontFamily="monospace">
                {psu === 0 ? "PWR A" : "PWR B"}
              </text>
            </motion.g>
          </g>
        ))}
        <motion.text x={60} y={112} textAnchor="middle" fill={color} fontSize="7" fontWeight="bold" fontFamily="monospace"
          animate={reduce ? {} : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          N+1 REDUNDANT
        </motion.text>
      </svg>
    );
  }

  if (animation === "cooling") {
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="coolGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="liquidGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0.1" />
            <stop offset="50%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect x={15} y={15} width={90} height={90} rx={6} fill="url(#coolGrad)" stroke={color + "30"} strokeWidth={1} />
        <motion.path d="M 30 30 Q 45 20 60 30 Q 75 40 90 30" fill="none" stroke={color + "40"} strokeWidth={2}
          animate={reduce ? {} : { pathLength: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.path d="M 30 50 Q 45 40 60 50 Q 75 60 90 50" fill="none" stroke={color + "40"} strokeWidth={2}
          animate={reduce ? {} : { pathLength: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
        <motion.path d="M 30 70 Q 45 60 60 70 Q 75 80 90 70" fill="none" stroke={color + "40"} strokeWidth={2}
          animate={reduce ? {} : { pathLength: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.circle cx={60} cy={60} r={20} fill="none" stroke={color + "50"} strokeWidth={1.5}
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 60px" }}
        />
        {Array.from({ length: 3 }).map((_, i) => {
          const angle = (i / 3) * Math.PI * 2;
          return (
            <motion.line key={i}
              x1={60 + Math.cos(angle) * 10} y1={60 + Math.sin(angle) * 10}
              x2={60 + Math.cos(angle) * 18} y2={60 + Math.sin(angle) * 18}
              stroke={color} strokeWidth={2} opacity={0.5}
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "60px 60px" }}
            />
          );
        })}
        <circle cx={60} cy={60} r={6} fill={color} opacity={0.3} />
        <circle cx={60} cy={60} r={3} fill={color} opacity={0.6} />
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.circle key={`drop-${i}`} cx={25 + i * 20} cy={95} r={2} fill={color}
            animate={reduce ? {} : { cy: [95, 90, 95], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </svg>
    );
  }

  if (animation === "protection") {
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="shieldGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <motion.path d="M 60 15 L 95 30 L 95 65 Q 95 90 60 105 Q 25 90 25 65 L 25 30 Z"
          fill="url(#shieldGrad)" stroke={color} strokeWidth={1.5}
          animate={reduce ? {} : { strokeWidth: [1.5, 2.5, 1.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.path d="M 60 25 L 88 37 L 88 63 Q 88 83 60 96 Q 32 83 32 63 L 32 37 Z"
          fill="none" stroke={color + "30"} strokeWidth={1}
          animate={reduce ? {} : { opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.text x={60} y={58} textAnchor="middle" fill={color} fontSize="12" fontWeight="bold" fontFamily="monospace"
          animate={reduce ? {} : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✓
        </motion.text>
        <text x={60} y={72} textAnchor="middle" fill={color} fontSize="6" fontFamily="monospace" opacity={0.7}>
          ACTIVE
        </text>
        {[0, 1, 2].map((i) => (
          <motion.circle key={i} cx={60} cy={60} r={25 + i * 10} fill="none" stroke={color + "15"} strokeWidth={0.5}
            animate={reduce ? {} : { r: [25 + i * 10, 28 + i * 10, 25 + i * 10], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </svg>
    );
  }

  if (animation === "gauge") {
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="gaugeGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        <circle cx={60} cy={60} r={42} fill="none" stroke={color + "15"} strokeWidth={6} />
        <motion.circle cx={60} cy={60} r={42} fill="none" stroke="url(#gaugeGrad)" strokeWidth={6}
          strokeDasharray="198 66" strokeLinecap="round"
          animate={reduce ? {} : { strokeDashoffset: [66, 0, 66] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transformOrigin: "60px 60px", transform: "rotate(135deg)" }}
        />
        <circle cx={60} cy={60} r={34} fill={color + "08"} stroke={color + "15"} strokeWidth={1} />
        <motion.g
          animate={reduce ? {} : { rotate: [-45, 90, -45] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transformOrigin: "60px 60px" }}
        >
          <line x1={60} y1={60} x2={60} y2={30} stroke={color} strokeWidth={2} strokeLinecap="round" />
          <circle cx={60} cy={60} r={3} fill={color} />
        </motion.g>
        <text x={60} y={80} textAnchor="middle" fill={color} fontSize="12" fontWeight="bold" fontFamily="monospace">
          95%
        </text>
        <text x={60} y={92} textAnchor="middle" fill={color} fontSize="6" fontFamily="monospace" opacity={0.6}>
          PERFORMANCE
        </text>
      </svg>
    );
  }

  return null;
}

function ComponentDetail({ comp, onBack, reduce }: { comp: ComponentInfo; onBack: () => void; reduce: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      className="flex flex-col items-center gap-6"
    >
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-4 h-4" /> Back to machine
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-3"
          style={{ backgroundColor: comp.color + "15", color: comp.color }}>
          <comp.icon className="w-3.5 h-3.5" /> {comp.label}
        </div>
        <h4 className="text-2xl font-extrabold font-display" style={{ color: comp.color }}>{comp.value}</h4>
        <p className="text-sm text-muted-foreground mt-1">{comp.detail}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.5, type: "spring" }}
        className="w-56 h-56 md:w-64 md:h-64 glass gradient-border rounded-2xl p-4 flex items-center justify-center"
        style={{ boxShadow: `0 0 40px ${comp.color}15, 0 0 80px ${comp.color}08` }}
      >
        <AnimatedComponent comp={comp} reduce={reduce} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-lg"
      >
        {comp.specs.map((spec, i) => (
          <motion.div
            key={spec}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.06 }}
            className="glass rounded-lg px-3 py-2 text-center"
          >
            <div className="text-xs font-semibold" style={{ color: comp.color }}>{spec}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function MachineDetail({ machine, onSelectComponent, onBack, reduce }: {
  machine: MachineInfo;
  onSelectComponent: (comp: ComponentInfo) => void;
  onBack: () => void;
  reduce: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="flex flex-col items-center gap-8"
    >
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-4 h-4" /> Back to all racks
      </motion.button>

      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-3"
          style={{ backgroundColor: machine.tagColor + "15", color: machine.tagColor }}
        >
          <Server className="w-3.5 h-3.5" /> {machine.type}
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-extrabold font-display"
        >
          {machine.name}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-muted-foreground text-sm mt-2"
        >
          Click a component to explore its specifications
        </motion.p>
      </div>

      <div className="relative">
        <div className="w-48 h-72 md:w-56 md:h-80 glass gradient-border rounded-xl relative overflow-hidden">
          {Array.from({ length: 7 }).map((_, j) => (
            <div key={j} className="absolute left-2 right-2 h-8 rounded-md"
              style={{ top: 8 + j * 34, backgroundColor: "hsl(220 30% 8%)", border: "1px solid hsl(210 100% 55% / 0.1)" }}>
              <motion.div className="absolute left-2 top-2.5 w-2 h-2 rounded-full bg-green-500"
                animate={reduce ? {} : { opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.1 }}
              />
              <div className="absolute left-6 top-2.5 w-16 h-1.5 rounded bg-white/5" />
              <div className="absolute left-6 top-5 w-10 h-1 rounded bg-white/5" />
            </div>
          ))}
          <motion.div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full"
            style={{ backgroundColor: machine.tagColor + "30" }}
            animate={reduce ? {} : { opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
        <motion.div
          className="absolute -inset-3 rounded-2xl"
          style={{ background: `radial-gradient(circle, ${machine.tagColor}08, transparent 70%)` }}
          animate={reduce ? {} : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-2xl">
        {machine.components.map((comp, i) => (
          <motion.button
            key={comp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.06 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectComponent(comp)}
            className="glass gradient-border rounded-xl p-4 text-left group transition-all"
            style={{ borderColor: comp.color + "20" }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg grid place-items-center shrink-0"
                style={{ backgroundColor: comp.color + "15" }}>
                <comp.icon className="w-4.5 h-4.5" style={{ color: comp.color }} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{comp.label}</div>
                <div className="text-sm font-bold truncate" style={{ color: comp.color }}>{comp.value}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default function InfrastructureShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const reduce = useReducedMotion();
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedMachine, setSelectedMachine] = useState<MachineInfo | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null);

  const handleMachineClick = (machine: MachineInfo) => {
    setSelectedMachine(machine);
    setViewMode("machine");
  };

  const handleComponentClick = (comp: ComponentInfo) => {
    setSelectedComponent(comp);
    setViewMode("component");
  };

  const handleBack = () => {
    if (viewMode === "component") {
      setSelectedComponent(null);
      setViewMode("machine");
    } else {
      setSelectedMachine(null);
      setViewMode("grid");
    }
  };

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(210_100%_15%/0.2),transparent_70%)]" />
      <div className="absolute inset-0 dot-grid opacity-40" />

      <motion.div style={{ scale, opacity }} className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-primary mb-6 animate-shimmer">
            <Server className="h-3.5 w-3.5" />
            Enterprise Infrastructure
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold font-display">
            Built for <span className="gradient-text animate-text-glow">Peak Performance</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Every server runs on enterprise-grade hardware with redundant power, liquid cooling,
            and ultra-fast NVMe storage — click any rack to explore inside.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden glass gradient-border p-6 min-h-[440px]">
          <AnimatePresence mode="wait">
            {viewMode === "grid" && (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <svg viewBox="0 0 800 310" className="w-full h-auto">
                  <defs>
                    <linearGradient id="rackGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="hsl(210 50% 12%)" />
                      <stop offset="100%" stopColor="hsl(220 40% 6%)" />
                    </linearGradient>
                    <radialGradient id="floorGlow2" r="50%">
                      <stop offset="0%" stopColor="hsl(210 100% 55%)" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="hsl(210 100% 55%)" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="400" cy="300" r="180" fill="url(#floorGlow2)" />
                  {machines.map((machine, i) => (
                    <g key={machine.name} transform={`translate(${i * 115}, 20)`}>
                      <RackSVG machine={machine} index={i} reduce={!!reduce} onClick={() => handleMachineClick(machine)} />
                    </g>
                  ))}
                </svg>
              </motion.div>
            )}

            {viewMode === "machine" && selectedMachine && (
              <motion.div
                key="machine"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <MachineDetail
                  machine={selectedMachine}
                  onSelectComponent={handleComponentClick}
                  onBack={handleBack}
                  reduce={!!reduce}
                />
              </motion.div>
            )}

            {viewMode === "component" && selectedComponent && (
              <motion.div
                key="component"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4 }}
              >
                <ComponentDetail
                  comp={selectedComponent}
                  onBack={handleBack}
                  reduce={!!reduce}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto mt-16">
          {[
            { icon: Cpu, label: "CPU", value: "AMD EPYC / Ryzen 9", detail: "Up to 16 cores / 32 threads of raw compute", color: "#3b82f6" },
            { icon: MemoryStick, label: "Memory", value: "DDR5 ECC RAM", detail: "Error-correcting for mission-critical workloads", color: "#8b5cf6" },
            { icon: HardDrive, label: "Storage", value: "NVMe SSD RAID-10", detail: "Up to 2TB ultra-fast redundant storage", color: "#10b981" },
            { icon: Thermometer, label: "Cooling", value: "Liquid Cooled", detail: "Enterprise-grade thermal management system", color: "#06b6d4" },
            { icon: Zap, label: "Power", value: "Redundant PSU", detail: "N+1 power supply with automatic failover", color: "#f59e0b" },
            { icon: Network, label: "Network", value: "2 Gbps Unmetered", detail: "Dedicated bandwidth per server, no caps", color: "#ec4899" },
            { icon: Shield, label: "Protection", value: "DDoS Shield", detail: "Always-on L3/L4/L7 mitigation at network edge", color: "#ef4444" },
            { icon: Gauge, label: "Performance", value: "95th %tile", detail: "Consistently top-tier benchmarks worldwide", color: "#f97316" },
          ].map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass gradient-border rounded-xl p-5 card-hover group"
            >
              <div className="flex items-start gap-3">
                <motion.div
                  className="w-10 h-10 rounded-xl grid place-items-center shrink-0"
                  style={{ backgroundColor: spec.color + "15" }}
                  whileHover={{ rotate: 12, scale: 1.15 }}
                >
                  <spec.icon className="w-5 h-5" style={{ color: spec.color }} />
                </motion.div>
                <div>
                  <div className="text-[10px] uppercase text-muted-foreground tracking-wider font-semibold">{spec.label}</div>
                  <div className="font-semibold text-sm mt-0.5">{spec.value}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{spec.detail}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
