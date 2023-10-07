export default class Character {
  constructor(name, type) {
    if (name.length < 2 || name.length > 10) {
      throw new Error('The length of the hero\'s name should be from 2 to 10 characters');
    }

    const types = ['Bowman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];
    if (!types.includes(type)) {
      throw new Error('Incorrect hero type');
    }

    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    this.attack = undefined;
    this.defence = undefined;
  }

  levelUp() {
    if (this.health <= 0) {
      throw new Error('It is impossible to raise the level of a deceased hero');
    }

    this.health = 100;
    this.level += 1;
    this.attack *= 1.2;
    this.defence *= 1.2;
  }

  damage(points) {
    this.health -= points * (1 - this.defence / 100);
    this.health = Math.max(this.health, 0);
  }
}
