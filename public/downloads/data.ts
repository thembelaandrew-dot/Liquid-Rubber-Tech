import { Shield, Droplets, PaintBucket, Wrench, Grid2X2, Hammer, Box, PenTool, CloudRain, Droplet, Layers } from 'lucide-react';

export const servicesData = [
  {
    id: 'roof-washing',
    category: 'ROOFING & WATERPROOFING',
    title: 'Professional Roof Washing & Cleaning',
    description: 'Professional roof cleaning and washing services to restore the appearance and cleanliness of roofs.',
    metaTitle: 'Roof Washing & Cleaning Services Eswatini | Remove Dirt & Moss',
    metaDescription: 'Restore the appearance of your property with professional roof cleaning and washing services in Eswatini. We remove dirt, moss, and algae effectively.',
    icon: Droplets,
    benefits: ['Removal of dirt, moss, and algae', 'General roof washing', 'Roof appearance restoration', 'Healthier-looking roofs'],
    process: ['Site preparation', 'High-pressure roof cleaning', 'Moss and algae treatment', 'Final rinse and inspection'],
    image: 'https://i.imgur.com/DOS8Cce.jpeg',
  },
  {
    id: 'roof-restoration',
    category: 'ROOFING & WATERPROOFING',
    title: 'Roof Restoration & Roof Coatings',
    description: 'Professional roof restoration and protective coating systems designed to extend the lifespan of existing roofs.',
    metaTitle: 'Professional Roof Restoration Services in Eswatini | Liquid Rubber Tech',
    metaDescription: 'Extend the lifespan of your roof with our premium roof restoration and protective coating systems. Request a free quote in Eswatini today.',
    icon: Shield,
    benefits: ['Extends the usable life of existing roofing systems', 'Roof surface protection', 'Protective roof coatings', 'Seamless sealing'],
    process: ['Inspection', 'Surface preparation', 'Crack & joint sealing', 'Protective roof coating application'],
    image: 'https://i.imgur.com/KEqweYg.jpeg',
  },
  {
    id: 'waterproofing',
    category: 'ROOFING & WATERPROOFING',
    title: 'Waterproofing Solutions',
    description: 'Advanced liquid-rubber waterproofing solutions for different areas of residential and commercial properties.',
    metaTitle: 'Advanced Waterproofing Solutions in Eswatini | Liquid Rubber Tech',
    metaDescription: 'Stop leaks before they damage your property. We offer advanced liquid-rubber waterproofing for roofs, walls, and parapets in Eswatini.',
    icon: CloudRain,
    benefits: ['Protection against water penetration', 'Sealing vulnerable surfaces', 'Roof, wall, parapet & concrete waterproofing', 'Durable protection against leaks'],
    process: ['Surface preparation', 'Moisture testing', 'Application of waterproof membrane', 'Curing and final inspection'],
    image: 'https://i.imgur.com/IPLfjan.jpeg',
  },
  {
    id: 'gutters',
    category: 'ROOFING & WATERPROOFING',
    title: 'Gutters & Fascia Installation and Repairs',
    description: 'Installation, repair, and maintenance of gutters and fascia systems for proper water drainage.',
    metaTitle: 'Gutters & Fascia Installation Eswatini | Repairs & Maintenance',
    metaDescription: 'Ensure proper water drainage with our professional gutter and fascia installation, repair, and maintenance services in Eswatini.',
    icon: Wrench,
    benefits: ['Improving roof drainage', 'Protecting buildings from water-related damage', 'Neat finishing around roof edges', 'Gutter & fascia maintenance'],
    process: ['Measurement and fabrication', 'Removal of old systems', 'Secure mounting & repairs', 'Water flow testing'],
    image: 'https://i.imgur.com/m2cYStH.png',
  },
  {
    id: 'damp-wall',
    category: 'ROOFING & WATERPROOFING',
    title: 'Damp Wall Treatment',
    description: 'Solutions for walls affected by rising damp and moisture problems, protecting your property.',
    metaTitle: 'Rising Damp & Wall Treatment Eswatini | Moisture Protection',
    metaDescription: 'Protect your property from rising damp and moisture problems. We provide effective damp wall treatments and restoration in Eswatini.',
    icon: Droplet,
    benefits: ['Rising damp treatment', 'Moisture protection & prevention', 'Wall restoration', 'Protection against recurring dampness'],
    process: ['Identifying moisture source', 'Surface preparation', 'Treatment application', 'Restoration finishing'],
    image: 'https://i.imgur.com/MjzKqqt.jpeg',
  },
  {
    id: 'painting',
    category: 'PROPERTY FINISHING & RENOVATION',
    title: 'Interior & Exterior Painting',
    description: 'High-quality painting solutions for both interior and exterior areas, combining aesthetics and protection.',
    metaTitle: 'Interior & Exterior Painting Services Eswatini | Premium Finishes',
    metaDescription: 'Transform your property with high-quality interior and exterior painting solutions. We combine aesthetics with long-lasting surface protection.',
    icon: PaintBucket,
    benefits: ['Property transformation', 'Surface protection', 'Decorative finishing', 'Professional painting solutions'],
    process: ['Surface sanding and cleaning', 'Masking and protection', 'Primer coat', 'Two premium top coats'],
    image: 'https://i.imgur.com/y6P1Mxs.png',
  },
  {
    id: 'ceiling',
    category: 'PROPERTY FINISHING & RENOVATION',
    title: 'Ceiling Installation',
    description: 'Modern ceiling installation solutions for residential and commercial properties.',
    metaTitle: 'Modern Ceiling Installation Eswatini | Residential & Commercial',
    metaDescription: 'Upgrade your interiors with modern ceiling installation solutions. Professional ceiling workmanship for homes and businesses in Eswatini.',
    icon: Hammer,
    benefits: ['Modern ceiling designs', 'Interior ceiling finishing', 'Professional ceiling workmanship', 'Stylish ceiling improvements and upgrades'],
    process: ['Framework installation', 'Panel mounting', 'Joint sealing & skimming', 'Finishing & painting'],
    image: 'data:image/webp;base64,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',
  },
  {
    id: 'tiling',
    category: 'PROPERTY FINISHING & RENOVATION',
    title: 'Tiling',
    description: 'Professional tiling services for residential and commercial properties.',
    metaTitle: 'Professional Tiling Services Eswatini | Floor & Wall Tiling',
    metaDescription: 'High-quality tiling for floors, walls, bathrooms, and kitchens. Experience precision workmanship and durable, attractive finishes.',
    icon: Grid2X2,
    benefits: ['Floor, wall, bathroom & kitchen tiling', 'Decorative tiling', 'Quality workmanship and precision', 'Attractive finishes and durability'],
    process: ['Substrate preparation', 'Layout planning', 'Tile installation', 'Tile finishing and grouting'],
    image: 'data:image/webp;base64,UklGRvoYAABXRUJQVlA4IO4YAADQcwCdASr6AJQAPqlKn0umJCKhqTSMaMAVCWMAzyC511nEFHQzKpO8869fz3r9Lzfy/gr/Y+2p2j8A7E7tyuA8ODPnw1/r/RXxRx4jwCfuHqIdN83m/o9i3xHAzLjgYm4X42/tvHUKnlLIvmCwMrpAP54rgPN1oS6s1EywhG4o+XT9DlIYYi/ItbrNyhYuPggyGZkJu3v9/PH18Yn+uVWFi/ZSvT8TfAAr6uS5l+6zV0fksLjlSSlkATM95Nqfl46VX+aL+6/jRdcpyjGacdMZF76M/lor95/ke8iK65EYa1xvnT6vSl59MFOSOkNkbYpqqJ8Npl8z6tpPuXcsvnmxjPW7x1XnxYfFX+4snU/BNRlExhog8WQSdNAKMWX3nQeNtu7BP0w+uxvhY0A3S6iO0k0EnpcK9g86/DgtbWjqq7LGWM5vo2OC5yJ3vmpZO+ZRc1+CcC+QFKPSDK36y/VBOMNNT4U8hQONIOvmkPpeQoQY5MLSLOZA4Cb/wIQ9CXl/8+54JtGS2FIls5YFPAgvik/HNL/dVM5yzDjjBhCrlsiu1ERsywUfa3YKMaP/lk8hBD+mN7CdblpurX4nRAdPO7d1o2AR/9VNNn+4L8xA61iKmTqUaBQuaQw6Pi+Nu/JeQhXnIEf+rrVDIA2476ptI5a1LMnsRZVtWBfpvzAcO4cS7bxIjesY6g0yDf3KrPASn3mjsNkXrfaeYfmDr8tNji2hGpxpQ9SSHIEwi1FRSXC/YfYjrDW93rOk7FObIhFQocdy3CAEimGFoVX/exjFe2qmvGOjNpd38Lz8CFLJ+70r71wrI6J1a2f3UdmyRtpLSlEw3h6XPLKLzZnjFhcNMOMm8kS8/nTyA6HqzXEdr5+Kjk+k7V/pvdQf6ecPsUnC3+fmsm6K5zxJKyV9wB45vfA3lK2MRJWJkgVpOinNJbwTQNr/0/OX1z0e53j4bz08kPw/96yDNuHYUJ5yRHXy+G6Zzz5de8xijtBn2bfLEzQY+XKz7ULGtdti6A0AngXTjtIAaXeK0WlZs28GmVgBnkyz46GaDFr9fwa8UuOufLr+KqYcI/y0zxBI/EW9xMyahEHLg5unVITf3/CxbsTGbWndpV+ydjCPXsDoIvmYYl41V36WlUMBeacJhf7v8LDjoXPBB6snMV7V52bzji8AeAYnvvF4gY1iwvyV19G9QbBKG7FLzfPCyP92CKWyH6zLMFMqmcDivOhmmrRp1OzAF0ytMffs4AD+9aWxVpQNZKfvC70soZdjQmmU0xbaRsfFMvDZi0o5X/ix3uK7yanF6oP/WKV5ZsOr6CQ9FXIjSLgU5HAhdJ2V/IIZnf8OUqNNX2FEDS+eXSWc7IOY/SEM2OFT3bSFILJZdAGV+kWrrzOH50epH4pyNWiCKBqum/5k1gTiuuLRvAOCSd8Gh7kDjSd07pE4x4JZskTzuFx/4WtG1bmJM9/NrU9RkspYhLEHdVwUl6dFTSuu/xOJR4pN9YuLDVdWpxOqjhf+od1XwbGuHQSBP2aYo2iQ6unVXVOSfJkFGqRXhFWcDkC9Zn8ZyykQ1k8Mp9kVu0mGQon782UyOfC1UfQjzL97tErd+Euu0N2eyeRgm/JNBs1rJD6rXHwhdqgtJiZPeE9H1IzqUNzkY/qbU6133L40p3vM0lOqgmHHh3G4k/lqh/9eQaD+KYNgdBaEPqF8gN2JV3YrvgjO+ItcROf2oG8tGLATNJEPM00aKWBsMRe7E194tSz503KWjqbZV6VxD1d98GTQ6J8sl9gbnyqQeSmHE/G7kX6e8X5qEYVcPoe2YzfDe+WLcXDgALbfLzqja/UirTk2rKC51PKTzeEy/7td+Di0F6Cl1y/NhKS/xvKzk6ZbO5mSpiDHl+ls37ClI0XVqZYkhfL3AldZUVKsfFaVGMcOw9kn74pssEEGhztjb5hVZA+amCNG7R7fpz725uKOQSDkqE7w/OFEdYr6poe+K3YaRkDKT2NQpiGj560TPmiBG04VT3v+A7lEi039o+PX9VUjxieNQ7cT5HynZenJSX6lPF4bF5IFhSoMkGUi8rr6DFhmU9fRmUU38GwHRK+pXVhgbaI8BM+/2N7T/G7eQLrcXZ73dZSRvd52YprX1QHUlfb3Y0gIIBAMLYaBQdZVeOj+qNBUlMCqTncgnQAje9B4EkGS6l7rtxgFIzq5gl7zzNN323RQPEuGF2+p2v+YU7sLc3QRsHjtcafpUgQ7X/fQfZxoQMQnvgZEMq63Da7hGJA18eNXhpPPiBxPMDl6OQCkfJFwkPHA2s9PGlVZBVbegCAnPSA8Ph023Ofy8dqJ31XaorMTNKw1CN34QPVN7eDA+PYc8waAAfUHXVtYeHtoChjN9S1uraytGrTlWvi7BPumAqy3ipxe0tyCiVDlxvyLbn44JMFOuHcA4zToQ6S6iqrtNUSVf2+YcfVXbILr6Tb4nLl05efThJAWPE43boCLfoQQhpjFavZYJskrUi3fixCyMHuEMWzsbbEv5txkyF+JmX6r7KmDPhk8SuE6gshC6kkT36wCV7mgYnyqU8QKdwFn3sxL98K7qrhcxL/H/6GMg9GowIMV40bfGgTWMwDgZAl86TD3eI462fM4oVHfHYAdKETBb4Mu9TvWimyybAEvigzOvWzOZujIyBmCKMBSozsrW7/V9A7GqKWgSl0vY36AnsLwSWsriPl0BEjqMNl9BpE0ite5bTIxFn1hmBdQN1AoibP6zKj+4hA+kXBVHH+5GJskAOiF1ocjKmfOP8FSGU81DTUf+vR6OZR6bkfUYFlT4xHa8wxkzrOylUBUXPwqpLSIc26v2U6Lc/1JEF7EEAp0RXXjqgotdTuaqsx4g5/5oNh2l1J5VntetfdWzfkorjUu0vAhcLod93oAyhuNjgR8qzO/iQL0ty71DsanLXD6CIUvEf23fK2xnl7pcHwZg6CAL+EWtQ8i5runD3AB5Dllapak1KwgVqIB+YmevhERYntxYMyLtHP8yAIJAUiKZ8vFjg68TOzq9GjtHldA3VuEhkfv03CeH4x3LlVgIKrVHj9myzHtHUDXARVxRJ1dr8/7jaTnajF4sQO+eNqPy9/eDatRQlh1SnA7pjzVeHLRa4ZWb1CiWHXgf5tgRvNlZOfBSvQc0rlsgeVElrwqXCne2PNRVV5lA/Xn+mNII6sfIGrtn5iB0HiusQn1dAj8jhluwfXxbMIBq8KKhKj2NiKKCKFZAc5gL9Y1d53KzvUTZz0f9yJOBGQP79Jewi5C1yW/x/EsGJhlRknXSk6mEPzrjNq4Yax/kRO/i+H8Bxt5MYvSPLTitnFEsFo2MkAOs6OC8s4UxS/1ifCU214ZYejn5DHbdXaM2NCoX5dtqJL8m/wodFdXe91zZEuoqJadC1a/UbKKWGwsUDdJ+Qz4/4KYVryQWI5i9+tivgbjoI5Lg9UDYMD4pQadD332vOaUahU1aJm04qFxXDbylEmq5QMzEir+H0LKeRJaf1CsqQAzgQhXiZ9m9f6MUd10aO154L67CeqMGOo/e4D6nvz7g9kYe3ioPgsMv6bPCiU2KK6vyd4H/bSxc0CWlhsbREtELn6DTMPFs1hQQNphHSd3FfWCdPuPapZ8FOT1yYaTiVQ7ZHrNH8aXORuUQmyD+uW1k6ItdSOJvcCkvjDqxaB4FcX/vrjyqJvmPC5rkay9Vs1rfGKTGX3uWKHzNJ5TrX72NGwU98cwflgEbtteT9PuqxNU2DFrI/8nzy9HRIo8dqg/kCtqA3PLAchyKGs6tgNZnpCTU0iXviMQRPqwl/CjveQ5042grNJMzBDW1W0csjUutIUJbgIc3PWfUSn+dan6NlR554X3BODPtkPXj8yyyP2E9Mc4M+925hABvMDVTbd9ks/XFBEUVYTk6I4yFktFJI2zR9at2T7pGLmIM7RtTtub2NFk3s2yBFbbLaWciIkQx7+T0WskcWzHpDCr308QmF+g0YqqFrkaNrn7XJYHno8fSz/h0u8qVIAhIH60eJozohV7WlnpMPji+ca8gBD8D8Mc+XNKJWjaZZm83hgX7y143R2kAEctd8BfP/yl5go/c+10LFUbehr2minm16k9PXgcYy4WcssRffcqKz6XXgW93rIJtMrL4UzcQsqADSpAcIVYBp6NE6Y/ljj+rLX86fG1Jx+/i+h2xJeW8ulKUFQurnNenuqF02bO95dx3XgqDSZBhl6Aix1njRTvEj5Zk97zaZh8nyEFHOf81MyoyN24pcTrWgTTsMab7RR7HRJ+10yhWXZ1ZGsH0mRNBRBMrdWcczdCmT6Lc/dx8N4agi+BgBamK9QST0dnuTvYO3t5C60mRXmjRMrHkVCrs0eHDXBLkDx3CV8ptOdEUXE1gpTQY27iv6nrFgiOWbVa7SKysCY4OYPuynDggahJ1wA9YaTn81WcDUK9Uz4RQ/YqPjC3fpJfltDsoCC9E/ApdqJKAO/6jtAfK54exTr3ZacLkKTYvit3DkGVLgBXWlTR3XQ+pIBou9GqNSHp+60S4vPMLZsBr0BxL6izR7DBi54Bi3sCKvzBHye1HQ6Uo6+zO0rrW0kRQBJeswXBugDsF8jfsksVdY+9PI0Z4xe8H3bzbrYUlz4IQ7NDuHUdnkYfZ/qOdUoK62Z5gKGTneKwpxhQHT0LdMmR2J4sI2WugDuQa8XruD7ipTN00xRhu6Sw3gjkMSPPYiKkcMpQuSP6DQ5M1EQgYidcuv3XarOUMAUv7ykiUjkRzWRnUMzPw9A4iJ1sSPx7hOHJrf2gh6qUPvBu7aJfn9P+WrMfbcSJYcEMuUL9izu7V0wRnNcp5LuJdz8hIp0RCLswHibWqzHQCptNYk15SgQAn3zXQXXCIqgkVLolrUNZ3qOtnoYddRuA+h8v3Zk3E9Vv9XcMiMXy7lTSNP2LGE909MYc4ZLkqvmEv8hHTrre58IKNe9aBV+ir6UDEywwY/fIhldcfd0pIUrAL82ycOvlQTrN3wsj23EsGCUXle26LBsdcqF4fjx8cR56j0ef6GMT88eLOXn9fUvd2Ub2Fs5bXftL0o4n58zxmeHzQ/Km/VciWORH6RjS9PscCwE/8aJ0gAtd5jC8iHb46ec05ijI/qaiGdoVoeDymu4+b0Pg4P0pr/utGRpwqc9uiogbJv6FFwvQfdUYMdxChbmXT4aJXa4j9d1tMBkYcuZixR1xY9s8hKMKf4MI6X7h25o72v0wkHKb3iUPN1slGx40//8utXGEKK8yOcKzjjhlUcwGusYaBhMdzwBXuQLZ/ZqdjEGYp+h/OJqcIu5CdGHuwoWJhgzFYCuOLBTCFCGPZ+D385I8d0LzEUVMDBkWLgLDiFwi3A3pbzQrN17BeaBBB1Hxfjl7b//CPIqtAhEgvTZTmcW2R3xOOBGUKSTm0z0Zwkrg0c01GS0mrYe2pS5CJOdVBlFjnAVEewJOfjYLR3EhvzKxL/OBBmOJQP7o3RY89oGQLLeB787MW+Ece0rcMbdjDnYpf3m2vrFZcxgSSPMzKjLOml/1XdHXiJU81UCoSjv5PZifQma2THZr4jYsqQ3/HXLqvNyNvc5XeH44l/G+6/J2cvZZkZlvGIWP5RQp7+kiMAYLUkg8c3eRjlavbm81FHPgqVVI0byXdEFVhBr8sFQ19iCrk5TzRXbrnZKX1EBO4ylAoXWjvbA4AzjBqFNKzQgrrhlEYB7SU4NwWECLq8U8RkSrQveBZccWDrUkzilxJFo3RAGXI2rys8AiqXhoF6vk2P2O1mWqIVFL8JnvdsRkCjTy7nr7SIbqUcqhYIYZ1NLLVlZ7GgVj4DLRyv53UZFNNk9Bq+stGnSV9Cwd1OdTdHaM+L8oQauMp7X/Iye4/RLsX8nGMQp7gVvJ4Ub0pKdvu+LaFx8qshSp/A1AK6kzchVb8c5yJO8oJDzaoED0TPrJ6t58OiSc+qCInqqd9b8QeHTPklhYV6AANMn40KQVWgprWxruAjJHBAim6+DJkzjV1Dr9VvsCQ8gTcQNIgJQ5X03fG3/QhDaIeftWD8Npi/w94hksHWWM6cwzG68vlA8oXMZGdt6/yeDrcHscb4yk4MV4txEVKht8/ygGO5Fo3RBTf88t9TIgd7Hs+aJViQZKeRyl0faI6pjq5+JqfUSocGlaV2/plHT0iH87f9fWaopiAYpGbaB/q0IWgIZef6Lm+Ox/XViFOK60Mtcv1j80BWbOT0EzEFg6cf0ZdH6/fFRhrFM3j9kiapjLb+SPYkxxpVf1BFtoAvDC9azjaUOtXdE+kW9fJJXcawjNy9z6RkAFUe6QLEtJ0TJjw9RlNhmbr9GPFSPf7pltB1wrVemqoiznkTG1NVF4nW/9ksVeUmdVizblARzEYFlh2ON7HGCYemfpzyLLLXb2sK00SbLX/fn7PSQLVnZEY68szWb22TThbmPZ4NgwUZv1k8heuiWjzhggLjQVDOq2/DJ5ScChs2wDWeNzXOMOHvF6lvZd0ohKPOK4DTEvIgz1JSYNUeFPrgiBbDpGIN0us1N6vWmcyCA2vyHs5sfKisRkPYaHX5fTGJtEM7T3qNkC0kuYGbFkxNNbd25+XbHFW1E2+8sPnmngpFKe+XOmm94H9WwMcANLaHH4AHJ3IfWLizd13b+sXFlZHD9WzGdfG9KalssBPbPA+Z4by10H2szBBu2Zvq7lLjaoEHqUJRssnc427vH2pX+8HIFkMQJwD3cG2etlhlmuZKrLeXD7V/hX5vE3ZG5MWQSYtt0rdydbr27DIaWESx0eWV8ZknzzcyedqJyKLaqQp2Yp9Gspf4UbLwjSbh1Dq3b8Ov8xByv1WPrKCZGzQ+XG6mOxc7l4WU8iFykE/z70KEh3BAVCMRP20UsR1g1BRyinY35OyPxJbbNqVwQCTmro8CKmLQ2fUpTB/hbhfJv8wbLy3/BqBGq5m2YMvOr640tzXu33NWKky8Ah4oMEqN8eUOYaKlFOyzHrRMY6b5BZjjrXOnBtK2K5JiEOL4JXEYz1EzHQIytm0rX0rQSukQFyrN1C8b5G+/jnvZCRBZnRlpa4Wwxb0ecaCxcgdmA1UHY7Xck79eQYQSvv1z8hUmLSeVviVOqaWRQxmpGfuq5U6wWubARLGAjj8KpKVbWZxUlZgFLDjoegOaFXs6D+8Fwg0+FWYtQl1/ZzPvAHLPY7hcw4HBAohkweOHR2xRyTrYANGDDHeZ3vjNj6ZW2EB74vcGsSo3Bej8VFpLDPsu0meK9xJYpJG1E5fWlRt4PH7p66vSyn+CC0oZx8cWpLVHIZO3BYctL75Txb49ZdQtJve1pN6UQ3x9A9GT/BlAsJvLfAFhX09bux4B1DCxi+NTsYOFOOcSTzxJVDWxQOHQbdSlWFyLaPvLRltnyurp55cAG/u33VZKueqcxmSVBEKlo7rjZo5zDUYxCsIHc/P4JbbD6DShHEslNsOt+y9VUROa4R3yMrw1lMzIwwRXKAgrjRDBvQmNMboTf0BJlXbSx6QCy7xXWne4Wi9r+vz9pGKkcmK4mRxney98GmmbnnPSxOfEToAgxjqNoRPH673g80rqOfQ4HsKJhIouhKyc9wbm6VVqn9bj4ToLcFOThzzAO0uqAF8YzPBHiD0yfMw7T7txHWTlNp9Pg9Tcp6iXPDmRdcE7wU4P1rEomr9wB8PqQLk+VmXSler7lJKAVELr3yzJ+oOFU2q4PxneR1yrVqniIm0KO3ibSHO8ep4rkJsRJiCIl7o931A0Qxn3/a0H7UynRy7CDs3Li6KT1ui1WdQmqF7jlI4iY5BUL+HfL0ZCKRpNS7rZ149oBJYURoRgzo6xmiK7Ca21trPSoYKbL3tDhEQzyhb7mY4YOzzdQG6YvIG42/ddrNxcY+tPsfDl0bhZMg3ziqG0HYJ4CmkS3OwVJLfQyyVXHGeFSxasIHmtBdd938VijhT1/DjPUiejvz2NZhwfRyY1TL9LpR8dYWRihoAfMB0VZ8Z8uUqW/S/0dM1R5Qc5d0930B8JcQQbdg7SyyZQT6wxpM/YnNlwDcq2b/9KnrDe/+WBR4HhO6UuLc5jMHc5hDYfNv2To63Jo4rjzuzca+VpJH9kJu+UtrHf6RbCJxd6o8NeLASYJatt3tqIKzD/xRj1c19BfOHBDydXz00gttiBjjW58vabE5Bxhtl71Oanq+C9Hn4PqvmWD4gjEABDGJghavOyvRCn4zzfG050KghDoRRq02SjIgq9oPqrYmdY7as/JlgCfR4XsV5rTLRoYzMNpNClKaXrhqALyqa5udrd5uL4bHOr8dieJgawAJMOfHXSAwxbmCZnb4QnvxoX/PH/U4OLRRFqiubPB8RoPS7BWtG41WyMYfhzKLfJdYZf/gyMH7uOOvB6GoL4Y4flzcZvWTPvfcJPr3SFY8g6E2cjE90AKvfuE4FwWTP87h44FPYpnba7y7+S7qykVg3z0yR4MrAJjjzgQz0coUSk+uE1oO+xgNUlcYmcuXd6tCALmLSz8D1jo1KW5P21CXeV6bmSqPHEAwUAAA',
  },
  {
    id: 'epoxy',
    category: 'PROPERTY FINISHING & RENOVATION',
    title: 'Epoxy Flooring',
    description: 'Durable and seamless epoxy flooring solutions for residential and commercial properties.',
    metaTitle: 'Seamless Epoxy Flooring Eswatini | Durable Floor Coatings',
    metaDescription: 'Get durable and seamless epoxy flooring for residential or commercial properties. Easy-to-clean, protective floor coatings that last.',
    icon: Layers,
    benefits: ['Seamless flooring', 'Durable floor finishes', 'Easy-to-clean flooring', 'Protective floor coatings'],
    process: ['Diamond grinding surface', 'Crack repair', 'Epoxy floor installation', 'Top clear coat sealing'],
    image: 'https://i.imgur.com/j7WnKoC.jpeg',
  },
  {
    id: 'paving',
    category: 'CONSTRUCTION & MAINTENANCE',
    title: 'Paving & Concrete Work',
    description: 'Professional paving and concrete construction work, emphasizing precision and durability.',
    metaTitle: 'Paving & Concrete Construction Eswatini | Driveways & Slabs',
    metaDescription: 'Expert paving and concrete construction. We build durable driveways, walkways, and concrete slabs emphasizing precision and quality.',
    icon: Box,
    benefits: ['Driveways & walkways', 'Concrete slabs & finishing', 'Quality workmanship', 'Professional finishing'],
    process: ['Surface preparation and grading', 'Base layer compaction', 'Paver laying or concrete pouring', 'Finishing and sealing'],
    image: 'https://i.imgur.com/5xNSDqH.jpeg',
  },
  {
    id: 'plumbing',
    category: 'CONSTRUCTION & MAINTENANCE',
    title: 'Plumbing & Bathroom Restoration',
    description: 'Specialized plumbing installations, sanitary repairs, and comprehensive bathroom restoration & waterproofing services.',
    metaTitle: 'Professional Plumbing & Bathroom Restoration Eswatini | Repairs & Renovations',
    metaDescription: 'Expert plumbing and bathroom restoration services in Eswatini. High quality pipework, fixture upgrades, leak proofing and complete bathroom makeovers.',
    icon: PenTool,
    benefits: [
      'Plumbing installations & repairs',
      'Complete bathroom restoration & modern upgrades',
      'Pipework, sanitaryware & drainage',
      'Reliability, properly functioning systems & durable waterproofing'
    ],
    process: [
      'System diagnostics & site inspection',
      'Pipe repair, routing & surface preparation',
      'Sanitary fixture installation & waterproofing',
      'Pressure testing, sealing & final quality handover'
    ],
    image: 'https://i.imgur.com/YWjsMPQ.jpeg',
  }
];

export interface GalleryProject {
  id: number;
  category: string;
  title: string;
  type: 'sequence' | 'single';
  images: { stage: 'Before' | 'During' | 'After' | 'Combined' | 'Final'; url: string }[];
}

export const galleryData: GalleryProject[] = [
  { id: 1, category: 'Roof Restoration', title: 'Roof Restoration', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/KEqweYg.jpeg' }] },
  { id: 2, category: 'Painting & Restoration', title: 'Exterior Painting', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/cWcInUB.jpeg' }] },
  { id: 3, category: 'Roof Restoration', title: 'Roof Restoration Project', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/DOS8Cce.jpeg' }] },
  { id: 4, category: 'Waterproofing & Restoration', title: 'Roof Restoration & Waterproofing', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/pFneYY9.jpeg' }] },
  { id: 5, category: 'Roof Restoration', title: 'Roof Restoration Complete', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/W5NGxA6.jpeg' }] },
  { id: 6, category: 'Waterproofing & Restoration', title: 'Waterproofing Application', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/fSpm7qB.jpeg' }] },
  { id: 7, category: 'Painting & Restoration', title: 'Exterior Painting & Gutters', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/Y8F4PBm.jpeg' }] },
  { id: 8, category: 'Roof Restoration', title: 'Roofing Project', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/jWBRSuX.jpeg' }] },
  { 
    id: 9, category: 'Roof Restoration', title: 'Complete Roof Overhaul', type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/w5xhopm.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/PC44OH0.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/7YF7eS1.jpeg' }
    ] 
  },
  { 
    id: 10, category: 'Roof Restoration', title: 'Roof Repair & Restoration', type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/dRQqKMj.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/VOP3u6z.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/BAZUsRa.jpeg' }
    ] 
  },
  { 
    id: 11, category: 'Painting & Restoration', title: 'Interior Painting Transformation', type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/5Ll3JjK.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/5RetyeE.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/UvnY9go.jpeg' }
    ] 
  },
  { 
    id: 12, category: 'Waterproofing & Restoration', title: 'Waterproofing Treatment', type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/SIM93Pp.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/GZJI6pd.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/hacXIcJ.jpeg' }
    ] 
  },
  { id: 13, category: 'Roof Restoration', title: 'Roof Restoration', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/qB05Fch.jpeg' }] },
  { id: 14, category: 'Waterproofing & Restoration', title: 'Waterproofing & Roof Protection', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/IPLfjan.jpeg' }] },
  { 
    id: 15, category: 'Waterproofing & Restoration', title: 'Comprehensive Waterproofing & Restoration', type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/LEEMFs8.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/wyuo3N1.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/DWqVy7m.jpeg' }
    ] 
  },
  { id: 16, category: 'Painting & Restoration', title: 'Exterior Painting', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/5c8Bx0J.jpeg' }] },
  { 
    id: 17, category: 'Roof Restoration', title: 'Roof Restoration', type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/JX2i69a.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/TUtQSqQ.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/uePG9cJ.jpeg' }
    ] 
  },
  { 
    id: 18, category: 'Roof Restoration', title: 'Roof Restoration', type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/XYHxokj.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/EBdyv2x.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/ZSvf9gq.jpeg' }
    ] 
  },
  { 
    id: 19, category: 'Roof Restoration', title: 'Roof Restoration', type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/LIgwyPh.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/si1EE1s.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/tWIpDqd.jpeg' }
    ] 
  },
  { 
    id: 20, 
    category: 'Epoxy & Flooring', 
    title: 'Epoxy Flooring Transformation', 
    type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/57lklGb.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/wXqJMeS.jpeg' }
    ] 
  },
  { 
    id: 21, 
    category: 'Roof Restoration', 
    title: 'Roof Restoration', 
    type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/c3H75kd.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/4QWgXpJ.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/9dmJZ3e.jpeg' }
    ] 
  },
  { 
    id: 22, 
    category: 'Property Finishing & Renovation', 
    title: 'Property Renovation & Finishing', 
    type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/VTIF9OG.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/KcuiNRJ.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/iFtz8FI.jpeg' }
    ] 
  },
  { 
    id: 23, 
    category: 'Roof Restoration', 
    title: 'Roof Restoration', 
    type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/rzj6MSV.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/UgotMlC.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/Fh0Z0Ri.jpeg' }
    ] 
  },
  { 
    id: 24, 
    category: 'Roof Restoration', 
    title: 'Roof Restoration', 
    type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/hLX9QlW.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/Gs7upaR.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/wzuSquF.jpeg' }
    ] 
  },
  { 
    id: 25, 
    category: 'Roof Restoration', 
    title: 'Roof Restoration', 
    type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/w2di5A8.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/4j54VHh.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/O1dA0AY.jpeg' }
    ] 
  },
  { 
    id: 26, 
    category: 'Plumbing & Bathroom Restoration', 
    title: 'Plumbing & Bathroom Restoration', 
    type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/gLXsymO.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/30px9Kf.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/YWjsMPQ.jpeg' }
    ] 
  },
  { 
    id: 27, 
    category: 'Painting & Restoration', 
    title: 'Painting & Surface Restoration', 
    type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/QCb1EfL.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/3xoFuzv.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/yG6gW3P.jpeg' }
    ] 
  },
  { 
    id: 28, 
    category: 'Paving', 
    title: 'Paving & Surface Restoration', 
    type: 'sequence', 
    images: [
      { stage: 'Before', url: 'https://i.imgur.com/OkqTOEV.jpeg' },
      { stage: 'During', url: 'https://i.imgur.com/7mKgRgs.jpeg' },
      { stage: 'After', url: 'https://i.imgur.com/5xNSDqH.jpeg' }
    ] 
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Sibusiso Dlamini',
    role: 'Homeowner',
    content: 'Liquid Rubber Tech completely transformed our leaking roof. Professional team and the finish is incredible. Highly recommend their waterproofing!',
  },
  {
    id: 2,
    name: 'Amanda Maseko',
    role: 'Property Manager',
    content: 'We use them for all our estate maintenance. From painting to epoxy flooring, they deliver top-tier quality every single time.',
  },
  {
    id: 3,
    name: 'Thabo Ndlovu',
    role: 'Business Owner',
    content: 'Fast, efficient, and clean. Their epoxy flooring in our warehouse has withstood heavy forklift traffic without a scratch.',
  }
];
