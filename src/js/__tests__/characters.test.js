import { Bowman, Swordsman, Magician, Daemon, Undead, Zombie } from '../characters';
import Character from '../Character';

test('should throw error for invalid type', () => {
  expect(() => new Character('Robin', 'InvalidType')).toThrow('Invalid character type');
});

describe('Character creation', () => {
  test('should create Bowman correctly', () => {
    const bowman = new Bowman('Robin');
    expect(bowman.name).toBe('Robin');
    expect(bowman.type).toBe('Bowman');
    expect(bowman.health).toBe(100);
    expect(bowman.level).toBe(1);
    expect(bowman.attack).toBe(25);
    expect(bowman.defence).toBe(25);
  });

  test('should create Magician correctly', () => {
    const magician = new Magician('Merlin');
    expect(magician.attack).toBe(10);
    expect(magician.defence).toBe(40);
  });

  test('should create Daemon correctly', () => {
    const daemon = new Daemon('Luci');
    expect(daemon.attack).toBe(10);
    expect(daemon.defence).toBe(40);
  });

  test('should create Swordsman correctly', () => {
    const swordsman = new Swordsman('Aragon');
    expect(swordsman.attack).toBe(40);
    expect(swordsman.defence).toBe(10);
  });

  test('should create Undead correctly', () => {
    const undead = new Undead('Aragon');
    expect(undead.attack).toBe(25);
    expect(undead.defence).toBe(25);
  });

  test('should create Zombie correctly', () => {
    const zombie = new Zombie('Aragon');
    expect(zombie.attack).toBe(40);
    expect(zombie.defence).toBe(10);
  });

  // DOTO попробовать объединить параметризованным тестом

  test('should throw error for invalid name (too short)', () => {
    expect(() => new Bowman('a')).toThrow('Name must be a string with length between 2 and 10');
  });

  test('should throw error for invalid name (too long)', () => {
    expect(() => new Bowman('VeryLongName')).toThrow();
  });

});

describe('levelUp method', () => {
  let character;

  beforeEach(() => {
    character = new Bowman('Robin');
  });

  test('should increase level by 1, attack/defence by 20%, health = 100', () => {
    character.level = 1;
    character.attack = 25;
    character.defence = 25;
    character.health = 80;

    character.levelUp();

    expect(character.level).toBe(2);
    expect(character.attack).toBeCloseTo(30); // 25 * 1.2 = 30
    expect(character.defence).toBeCloseTo(30);
    expect(character.health).toBe(100);
  });

  test('should throw error if health = 0', () => {
    character.health = 0;
    expect(() => character.levelUp()).toThrow('Cannot level up a dead character');
  });
});

describe('damage method', () => {
  let character;

  beforeEach(() => {
    character = new Bowman('Robin');
    // defence = 25
  });

  test('should reduce health correctly', () => {
    character.health = 100;
    character.damage(50); // points = 50, defence = 25 => damage = 50 * (1 - 0.25) = 37.5
    expect(character.health).toBeCloseTo(62.5);
  });

  test('should not set health below 0', () => {
    character.health = 30;
    character.damage(100); // damage = 100 * 0.75 = 75, health станет -45, но должно стать 0
    expect(character.health).toBe(0);
  });

  test('should work when health already 0', () => {
    character.health = 0;
    character.damage(50);
    expect(character.health).toBe(0);
  });
});