export enum ShipFiringTypes {
  A = "fire_a",
  B = "fire_b",
}

export const shipConfig = {
  sliceX: 12,
  anims: {
    idle: {
      from: 0,
      to: 2,
      speed: 10,
      loop: true,
    },

    fire_a: {
      from: 3,
      to: 8,
      speed: 15,
      loop: true,
    },

    fire_b: {
      from: 9,
      to: 11,
      speed: 15,
      loop: true,
    },
  },
};
