const creditPacks = [
  {
    cost: {
      unit: "£",
      amount: 250,
    },
    subtitle: "Entry-level Alces Flight credit pack",
    title: "Bronze",
    type: 'creditPack',
    features: [
      { tick: true, text: "10 Alces Flight credits" },
      { tick: true, text: "Allocate to any one of your clusters managed through [Alces Flight Center](https://center.alces-flight.com)" },
      { tick: false, text: "~Split allocation between any of your clusters managed through [Alces Flight Center](https://center.alces-flight.com)~" },
      { tick: false, text: "~Launch new HPC clusters through [Alces Flight Launch](https://launch.alces-flight.com)~" },
    ],
    details: "The Bronze Alces Flight credit pack allows you to...\n\n",
    stripe: {
      type: 'product',
      productId: "prod_DcfKpn34wXiEdo",
    }
  },
  {
    cost: {
      unit: "£",
      amount: 500,
    },
    subtitle: "Standard Alces Flight credit pack",
    title: "Silver",
    type: 'creditPack',
    features: [
      { tick: true, text: "25 Alces Flight credits" },
      { tick: true, text: "Allocate to any one of your clusters managed through [Alces Flight Center](https://center.alces-flight.com)" },
      { tick: true, text: "Split allocation between any of your clusters managed through [Alces Flight Center](https://center.alces-flight.com)" },
      { tick: false, text: "~Launch new HPC clusters through [Alces Flight Launch](https://launch.alces-flight.com)~" },
    ],
    details: "The Silver Alces Flight credit pack allows you to...\n\n",
  },
  {
    cost: {
      unit: "£",
      amount: 1000,
    },
    subtitle: "Professional Alces Flight credit pack",
    title: "Gold",
    type: 'creditPack',
    features: [
      { tick: true, text: "50 Alces Flight credits" },
      { tick: true, text: "Allocate to any one of your clusters managed through [Alces Flight Center](https://center.alces-flight.com)" },
      { tick: true, text: "Split allocation between any of your clusters managed through [Alces Flight Center](https://center.alces-flight.com)" },
      { tick: true, text: "Launch new HPC clusters through [Alces Flight Launch](https://launch.alces-flight.com)" },
    ],
    details: "The Gold Alces Flight credit pack allows you to...\n\n",
  },
];

export default creditPacks;
