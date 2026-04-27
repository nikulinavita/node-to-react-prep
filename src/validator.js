import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const validateData = () => {
  try {
    // ПОЧЕМУ path.join? Чтобы код был универсальным для любой системы. path.join так же фстрахует нас от ошибок путей на разных операционных системах (Windows vs Linux).
    const filePath = path.join(__dirname, '..', 'data', 'db.json');
    
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    const items = data.materials || [];

    // ПОЧЕМУ такая строгая проверка?
    // Чтобы в базу не полетели пустые строки.
    // Если данные будут битыми, наш React-интерфейс упадет с ошибкой undefined.
    const isValid = items.every(item => {
      return (
        item.id && 
        item.title && item.title.length > 2 && // Название материала не короче 3 символов
        item.format && item.format.length >= 2    // Формат (Canva, Miro) должен быть заполнен
      );
    });

    if (!isValid) {
      // ПОЧЕМУ throw Error? Чтобы мгновенно остановить битый процесс и не дать ему работать дальше.
      throw new Error(chalk.red('Данные в db.json повреждены или не полны!'));
    }

    console.log(chalk.green('✅ Валидация успешна: Данные пригодны для использования в React!'));

  } catch (error) {
    console.error(chalk.bgRed.white(' ОШИБКА ВАЛИДАЦИИ '), error.message);
    process.exit(1); 
  }
};

validateData();
