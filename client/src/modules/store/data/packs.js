const clusterPacks = [
  {
    monthlyCost: 250,
    monthlyFlightCenterCredits: 2,
    subtitle: "For small-scale workloads.",
    title: "Standard cluster",
    overviewItems: [
      "Entry-level login node and general-level compute nodes (3.75 GiB, 2 CPUs)."  ,
      "Autoscales from two general economy nodes (7.5 GiB, 4 CPUs) down to a single node."  ,
      "Operates the Slurm Workload Manager job scheduler."  ,
    ],
  },
  {
    monthlyCost: 500,
    monthlyFlightCenterCredits: 5,
    subtitle: "For workloads that require enhanced processing.",
    title: "Performance cluster",
    overviewItems: [
      "Medium-sized login node and balanced compute nodes (60 GiB, 36 CPUs)."  ,
      "Autoscales from a single compute node to four balanced compute nodes (240GiB, 144 CPUs)."  ,
      "Operates the Open Grid Scheduler (SGE) job Scheduler."  ,
    ],
  },
  {
    monthlyCost: 1000,
    monthlyFlightCenterCredits: 10,
    subtitle: "For workloads that scale best on GPU architectures.",
    title: "GPU cluster",
    overviewItems: [
      "Medium-sized login node and GPU compute nodes (488 GiB, 32 CPUS, 8 GPUs)."  ,
      "Autoscales from a single GPU node to two GPU nodes (976 GiB, 64 CPUs, 16 GPUs)."  ,
      "Operates the Open Grid Scheduler (SGE) job Scheduler."  ,
    ],
  },
];

export default clusterPacks;
