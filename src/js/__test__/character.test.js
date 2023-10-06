import Character from '../character';
import Bowman from '../bowman';
import Swordsman from '../swordsman';
import Magician from '../magician';
import Daemon from '../daemon';
import Undead from '../undead';
import Zombie from '../zombie';

const classes = {
  Bowman, Swordsman, Magician, Undead, Zombie, Daemon,
};

test.each([
  ['Bowman', 'Hero 1', {name: 'Hero 1', type: 'Bowman', health: 100, level: 1, attack: 25, defence: 25}],
  ['Swordsman', 'Hero 2', {name: 'Hero 2', type: 'Swordsman', health: 100, level: 1, attack: 40, defence: 10}],
  ['Magician', 'Hero 3', {name: 'Hero 3', type: 'Magician', health: 100, level: 1, attack: 10, defence: 40}],
  ['Undead', 'Hero 4', {name: 'Hero 4', type: 'Undead', health: 100, level: 1, attack: 25, defence: 25}],
  ['Zombie', 'Hero 5', {name: 'Hero 5', type: 'Zombie', health: 100, level: 1, attack: 40, defence: 10}],
  ['Daemon', 'Hero 6', {name: 'Hero 6', type: 'Daemon', health: 100, level: 1, attack: 10, defence: 40}],
])(
  ('create hero "%s"'
  ),
  (heroType, name, expected) => {
    const result = new classes[heroType](name);
    expect(result).toMatchObject(expected);
  },
);

test('test incorrect hero type', () => {
  try {
    new Character('Hero Name', 0, 0);
    expect(true).toBe(false);
  } catch (e) {
    expect(e.message).toBe('Incorrect hero type');
  }
});

test.each([
  ['1'],
  ['12345678901'],
])(
  ('test incorrect name length "%s"'
  ),
  (name) => {
    try {
      new Bowman(name);
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('The length of the hero\'s name should be from 2 to 10 characters');
    }
  },
);

test.each([
  ['12'],
  ['1234567890'],
])(
  ('test correct name length "%s"'
  ),
  (name) => {
    const result = new Bowman(name);
    expect(result.name).toBe(name);
  },
);

test.each([
  ['Bowman', {health: 100, level: 2, attack: 30, defence: 30}],
  ['Swordsman', {health: 100, level: 2, attack: 48, defence: 12}],
  ['Magician', {health: 100, level: 2, attack: 12, defence: 48}],
  ['Undead', {health: 100, level: 2, attack: 30, defence: 30}],
  ['Zombie', {health: 100, level: 2, attack: 48, defence: 12}],
  ['Daemon', {health: 100, level: 2, attack: 12, defence: 48}],
])(
  ('test levelUp "%s"'
  ),
  (heroType, expected) => {
    const hero = new classes[heroType]('Hero Name');
    hero.levelUp();

    const result = {
      health: hero.health,
      level: hero.level,
      attack: hero.attack,
      defence: hero.defence,
    };

    expect(result).toMatchObject(expected);
  },
);

test('test levelUp for a deceased hero', () => {
  try {
    const hero = new Bowman('Hero Name');
    hero.health = 0;
    hero.levelUp();
    expect(true).toBe(false);
  } catch (e) {
    expect(e.message).toBe('It is impossible to raise the level of a deceased hero');
  }
});

test.each([
  ['Bowman', 10],
  ['Swordsman', 0],
  ['Magician', 28],
  ['Undead', 10],
  ['Zombie', 0],
  ['Daemon', 28],
])(
  ('test damage "%s"'
  ),
  (heroType, expected) => {
    const hero = new classes[heroType]('Hero Name');
    hero.damage(120);

    expect(hero.health).toBe(expected);
  },
);
