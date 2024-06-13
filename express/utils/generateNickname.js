const { uniqueNamesGenerator, adjectives } = require("unique-names-generator");

const futuristicWords = [
  "Neon",
  "Byte",
  "Warp",
  "Nano",
  "Synth",
  "Techno",
  "Cyber",
  "Holo",
  "Vortex",
  "Galactic",
  "Quantum",
  "Laser",
  "Plasma",
  "Cosmo",
  "Chrono",
  "Radiant",
  "Astral",
  "Ether",
  "Infinite",
  "Omega",
  "Cosmic",
  "Nebula",
  "Orbital",
  "Solar",
  "Stellar",
  "Hyper",
  "Celestial",
  "Photon",
  "Vector",
  "Axon",
  "Neutron",
  "Proton",
  "Zenon",
  "Titan",
  "Astronaut",
  "Nebular",
  "Spectrum",
  "Metaverse",
  "Orbit",
  "Exo",
  "Galax",
  "Void",
  "Quantum",
  "Molecule",
  "Pulsar",
  "Singularity",
  "Astro",
  "Neutron",
  "Antimatter",
];

const neutralWords = [
  "Echo",
  "Pulse",
  "Wander",
  "Glimmer",
  "Shade",
  "Twilight",
  "Whisper",
  "Blaze",
  "Frost",
  "Myst",
  "Nova",
  "Drift",
  "Aura",
  "Breeze",
  "Cascade",
  "Flare",
  "Glow",
  "Horizon",
  "Loom",
  "Quasar",
  "Solstice",
  "Zenith",
  "Wisp",
  "Gale",
  "Dawn",
  "Dusk",
  "Dream",
  "Harmony",
  "Serenity",
  "Breeze",
  "Luna",
  "Starlight",
  "Nimbus",
  "Echo",
  "Ember",
  "Moonlight",
  "Ripple",
  "Zephyr",
  "Whisper",
  "Mirage",
  "Raven",
  "Sky",
  "Snow",
  "Thorn",
  "Vale",
  "Wisp",
  "Haze",
  "Glade",
  "River",
  "Stone",
  "Flame",
];

const generateNickname = () => {
  let nickname;
  do {
    nickname = uniqueNamesGenerator({
      dictionaries: [futuristicWords, neutralWords],
      separator: " ",
      length: 2,
      style: "capital",
    });
  } while (nickname.length > 12);
  return nickname;
};

module.exports = {
  generateNickname,
};
