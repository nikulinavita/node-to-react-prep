import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateData() {
  try {
    console.log(chalk.blue('Starting to generate educational materials...'));

    const materials = [
      {
        // ПОЧЕМУ nanoid? Эти уникальные ID критически важны для атрибута key в React. 
        // Без них при рендеринге списков интерфейс будет «глючить» или падать при обновлении элементов.
        id: nanoid(), 
        title: 'Irregular Verbs Practice',
        topic: 'Grammar',
        level: 'A2',
        format: 'Genially',
        link: faker.internet.url(), 
        description: 'Interactive game to practice irregular verbs.'
      },
      {
        id: nanoid(),
        title: 'Comparison of Adjectives',
        topic: 'Grammar',
        level: 'A1 Kids',
        format: 'Miro',
        link: faker.internet.url(),
        description: 'Visual board for learning comparative adjectives.'
      },
      {
        id: nanoid(),
        title: 'Present Simple vs Continuous',
        topic: 'Grammar',
        level: 'A1',
        format: 'Canva',
        link: faker.internet.url(),
        description: 'Presentation with rules and examples.'
      },
      {
        id: nanoid(),
        title: 'Giggle Bunny Easter Quest',
        topic: 'Vocabulary',
        level: 'A1 Kids',
        format: 'Genially',
        link: faker.internet.url(),
        description: 'Interactive Quest for learning Easter-related vocabulary.'
      },
      {
        id: nanoid(),
        title: 'Wider World 3 - Unit 4',
        topic: 'Grammar "Past Perfect"',
        level: 'B1',
        format: 'Canva',
        link: faker.internet.url(),
        description: 'Presentation with rules and exercises on Past Perfect tense.'
      }
    ];

    const data = { materials };

    // ПОЧЕМУ path.join? Страхует от ошибок путей на разных ОС (Windows vs Linux/Mac).
    const filePath = path.join(__dirname, '..', 'data', 'db.json');

    // ПОЧЕМУ fs/promises + await? Избегаем синхронных остановок. Программа не замирает,
    // а продолжает дышать, пока файл записывается в фоновом режиме.
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

    console.log(chalk.green('Success! Файл db.json успешно заполнен материалами!'));

  } catch (error) {
    console.log(chalk.red('Произошла ошибка при генерации:'), error);
  }
}

generateData();
