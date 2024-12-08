export interface GrassConfig {
  sliceX: number;
  anims: {
    idle: {
      from: number;
      to: number;
      speed: number;
      loop: boolean;
    };
    move: {
      from: number;
      to: number;
      speed: number;
      loop: boolean;
    };
  };
}

export const grassConfigA = {
  sliceX: 4,
  anims: {
    idle: {
      from: 0,
      to: 0,
      speed: 20,
      loop: false,
    },

    move: {
      from: 0,
      to: 3,
      speed: 20,
      loop: false,
    },
  },
};

export const grassConfigB = {
  sliceX: 5,
  anims: {
    idle: {
      from: 0,
      to: 0,
      speed: 20,
      loop: true,
    },

    move: {
      from: 0,
      to: 4,
      speed: 20,
      loop: false,
    },
  },
};
