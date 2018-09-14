const clusterPacks = [
  {
    monthlyCost: 250,
    monthlyFlightCenterCredits: 2,
    subtitle: "For small-scale workloads.",
    title: "Standard cluster",
    features: [
      "Entry-level login node and general-level compute nodes (3.75 GiB, 2 CPUs)."  ,
      "Autoscales from two general economy nodes (7.5 GiB, 4 CPUs) down to a single node."  ,
      "Operates the Slurm Workload Manager job scheduler."  ,
    ],
    details: "A cluster comprising an entry-level login node and general-level compute nodes (3.75 GiB, 2 CPUs) provided for familiarization and experimentation with Alces Flight Compute. By default, the compute estate runs on two general economy nodes (7.5 GiB, 4 CPUs), with an option to select durable nodes instead. Autoscaling is enabled to shut down idle nodes (a minimum of one compute node will be retained at all times). The cluster operates the Slurm Workload Manager job scheduler."
  },
  {
    monthlyCost: 500,
    monthlyFlightCenterCredits: 5,
    subtitle: "For workloads that require enhanced processing.",
    title: "Performance cluster",
    features: [
      "Medium-sized login node and balanced compute nodes (60 GiB, 36 CPUs)."  ,
      "Autoscales from a single compute node to four balanced compute nodes (240GiB, 144 CPUs)."  ,
      "Operates the Open Grid Scheduler (SGE) job Scheduler."  ,
    ],
    details: "A cluster comprising a medium-sized login node and balanced compute nodes (60 GiB, 36 CPUs) providing enhanced performance for workloads with higher processing, memory and networking requirements. The compute estate initially runs as a single node, with autoscaling enabled provide up to four balanced compute nodes (240 GiB, 144 CPUs). The cluster operates the Open Grid Scheduler (SGE) job scheduler."
  },
  {
    monthlyCost: 1000,
    monthlyFlightCenterCredits: 10,
    subtitle: "For workloads that scale best on GPU architectures.",
    title: "GPU cluster",
    features: [
      "Medium-sized login node and GPU compute nodes (488 GiB, 32 CPUS, 8 GPUs)."  ,
      "Autoscales from a single GPU node to two GPU nodes (976 GiB, 64 CPUs, 16 GPUs)."  ,
      "Operates the Open Grid Scheduler (SGE) job Scheduler."  ,
    ],
    details: "A cluster comprising a medium-sized login node and GPU compute nodes (488 GiB, 32 CPUS, 8 GPUs) for workloads that scale best on a GPU architecture. The compute estate initially runs on a single node, with autoscaling enabled to provide up to two GPU nodes (976 GiB, 64 CPUs, 16 GPUs). The cluster operates the Open Grid Scheduler (SGE) job scheduler."
  },
];

export default clusterPacks;
