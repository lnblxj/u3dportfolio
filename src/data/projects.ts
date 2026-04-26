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
    id: 'vr-surgery-sim',
    title: '基于VR的认知障碍症头针治疗仿真',
    subtitle: 'Simulation of Scalp Acupuncture Treatment for Cognitive Impairment',
    description:
      '通过三维建模模拟头部的穴位分布，并使用虚拟现实（VR）技术实现了一款具有沉浸式交互功能的头针疗法培训平台。',
    tags: ['Unity3D', 'C#', 'VR', 'DoTween', 'URP'],
    images: [
      'https://img.sboxm.top/unity/16163246.png',
    ],
    videoUrl: 'https://img.sboxm.top/unity/150118370.mp4',
    category: 'virtual-simulation',
    year: '2025',
    highlight: '仿真教学 · VR交互',
  },
  {
    id: 'city-twin',
    title: '智慧城市数字孪生',
    subtitle: 'City Digital Twin',
    description:
      '智慧城市数字孪生可视化平台，实现城市运行数据的三维动态呈现与智能交互。系统包含实时数据可视化、环境模拟、智能决策建议等模块，支持城市规划与应急管理场景应用。',
    tags: ['Unity3D', 'UniStorm', 'MySQL', 'Qwen', 'Agent'],
    images: [
      'https://img.sboxm.top/unity/6153221.png',
    ],
    category: 'digital-twin',
    year: '2025',
    highlight: '市级规模 · Agent接入',
  },
  {
    id: 'microscope-simulation',
    title: '实验室显微镜仿真',
    subtitle: 'Laboratory Microscope Simulation',
    description:
      '实验室显微镜仿真教学系统，提供环境光模拟、多部件交互等功能，实现实验室显微镜的仿真教学。',
    tags: ['Unity3D', 'C#', 'DoTween'],
    images: [
      'https://img.sboxm.top/unity/16161946.png',
      'https://img.sboxm.top/unity/6162039.png',
      'https://img.sboxm.top/unity/62110.png',
    ],
    category: 'virtual-simulation',
    year: '2024',
    highlight: '多部件交互· 环境光模拟',
  },
  {
    id: 'pvz',
    title: '植物大战僵尸复刻',
    subtitle: 'Plants vs. Zombies: Remake',
    description:
      '策略塔防类游戏复刻项目，完整实现角色控制、关卡系统、动画交互等核心玩法。',
    tags: ['Unity3D', 'C#', 'Pooling', 'DoTween'],
    images: [
      'https://img.sboxm.top/unity/202151.png',
    ],
    videoUrl: 'https://img.sboxm.top/unity/16152304.mp4',
    category: 'virtual-simulation',
    year: '2025',
    highlight: '策略塔防 · 经典复刻',
  },
  {
    id: 'solar-system',
    title: '太阳系天体科普平台',
    subtitle: 'Solar System Celestial Body Popularization Platform',
    description:
      '太阳系天体科普平台，支持漫游和行星特写着陆模式, 提供数据可视化与交互功能。',
    tags: ['Unity3D', 'C#', 'DOTween', 'AssetBundle', 'CDN'],
    images: [
      'https://img.sboxm.top/unity/6160114.png',
      'https://img.sboxm.top/unity/6160157.png',
      'https://img.sboxm.top/unity/16160305.png',
    ],
    category: 'digital-twin',
    year: '2024',
    highlight: '星际漫游 · 行星特写',
  },
];


  // {
  //   id: 'fire-evacuation',
  //   title: '消防应急疏散仿真平台',
  //   subtitle: 'Fire Emergency Evacuation Simulation',
  //   description:
  //     '基于 Agent 的人员疏散仿真系统，模拟火灾烟雾扩散与人员避障行为。提供多方案路径规划对比与疏散效率热力图分析，辅助建筑消防设计审查。',
  //   tags: ['Unity3D', 'Agent Simulation', 'Pathfinding', 'NavMesh', 'Particle System', 'Data Visualization'],
  //   images: [
  //     'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  //     'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
  //     'https://images.unsplash.com/photo-1568027762272-e4da8b386fe9?w=800&q=80',
  //   ],
  //   videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  //   demoUrl: '#',
  //   category: 'virtual-simulation',
  //   year: '2026',
  //   highlight: 'Agent 仿真 · 热力分析',
  // }