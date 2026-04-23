export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  images: string[];
  videoUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  category: 'virtual-simulation' | 'digital-twin';
  year: string;
  highlight?: string;
}

export const projects: Project[] = [
  {
    id: 'smart-factory-twin',
    title: '智慧工厂数字孪生系统',
    subtitle: 'Smart Factory Digital Twin',
    description:
      '基于 Unity3D 构建的工厂全量数字孪生平台，实时同步 IoT 设备状态，支持产线仿真、故障预测与能耗分析。通过 WebSocket 与 MQTT 协议对接工业 PLC，实现毫秒级数据刷新。',
    tags: ['Unity3D', 'C#', 'Digital Twin', 'IoT', 'WebSocket', 'MQTT', 'URP'],
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    demoUrl: '#',
    githubUrl: 'https://github.com',
    category: 'digital-twin',
    year: '2024',
    highlight: '实时同步 · 毫秒级响应',
  },
  {
    id: 'vr-surgery-sim',
    title: '外科手术虚拟仿真训练系统',
    subtitle: 'VR Surgical Simulation',
    description:
      '面向医学院校的沉浸式手术仿真平台，采用 XR Interaction Toolkit 实现自然手势交互，物理引擎模拟软组织形变。集成 AI 评分模块，对操作规范性进行实时评价与反馈。',
    tags: ['Unity3D', 'XR Interaction Toolkit', 'VR', 'Physics Simulation', 'AI Scoring', 'Meta Quest'],
    images: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
      'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    demoUrl: '#',
    category: 'virtual-simulation',
    year: '2024',
    highlight: '软组织形变 · XR 交互',
  },
  {
    id: 'city-twin',
    title: '城市基础设施数字孪生',
    subtitle: 'Urban Infrastructure Digital Twin',
    description:
      '市级规模的城市数字孪生系统，集成 GIS 地理数据、建筑 BIM 模型与实时交通流，支持灾害仿真推演与应急调度。采用 LOD 动态加载与 GPU Instancing 技术保证大场景流畅渲染。',
    tags: ['Unity3D', 'GIS', 'BIM', 'LOD', 'GPU Instancing', 'C#', 'REST API'],
    images: [
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
      'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&q=80',
    ],
    githubUrl: 'https://github.com',
    category: 'digital-twin',
    year: '2023',
    highlight: '市级规模 · LOD 优化',
  },
  {
    id: 'fire-evacuation',
    title: '消防应急疏散仿真平台',
    subtitle: 'Fire Emergency Evacuation Simulation',
    description:
      '基于 Agent 的人员疏散仿真系统，模拟火灾烟雾扩散与人员避障行为。提供多方案路径规划对比与疏散效率热力图分析，辅助建筑消防设计审查。',
    tags: ['Unity3D', 'Agent Simulation', 'Pathfinding', 'NavMesh', 'Particle System', 'Data Visualization'],
    images: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
      'https://images.unsplash.com/photo-1568027762272-e4da8b386fe9?w=800&q=80',
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    demoUrl: '#',
    category: 'virtual-simulation',
    year: '2023',
    highlight: 'Agent 仿真 · 热力分析',
  },
  {
    id: 'power-grid-twin',
    title: '电网设备数字孪生监控',
    subtitle: 'Power Grid Digital Twin Monitor',
    description:
      '变电站三维数字孪生系统，实时映射设备运行状态，支持变压器、断路器等关键设备的远程巡检与故障诊断。集成时序数据库实现历史数据回溯与趋势预测。',
    tags: ['Unity3D', 'Digital Twin', 'Time Series DB', 'Shader Graph', 'REST API', 'URP'],
    images: [
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80',
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
    ],
    githubUrl: 'https://github.com',
    category: 'digital-twin',
    year: '2023',
    highlight: '远程巡检 · 故障预测',
  },
  {
    id: 'lab-chem-sim',
    title: '化学实验虚拟仿真系统',
    subtitle: 'Chemistry Lab Virtual Simulation',
    description:
      '面向高校化学教学的虚拟实验平台，精确模拟化学反应过程、危险品操作规程与仪器使用。支持 WebGL 构建，无需安装可在浏览器运行，已接入国家虚拟仿真实验教学平台。',
    tags: ['Unity3D', 'WebGL', 'C#', 'Chemical Simulation', 'Education', 'Shader Graph'],
    images: [
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
      'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    ],
    demoUrl: '#',
    githubUrl: 'https://github.com',
    category: 'virtual-simulation',
    year: '2022',
    highlight: 'WebGL · 国家平台接入',
  },
];
