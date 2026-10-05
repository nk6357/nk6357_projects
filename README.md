# nk6357 — Digital Product Engineer

Персональное портфолио на React, TypeScript и Vite. Проекты добавляются через папки с `project.json`: менять React-компоненты для новой карточки не требуется.

Публичный адрес GitHub Pages: <https://nk6357.github.io/nk6357_projects/>

## Локальный запуск

Требуется Node.js 22 или новее.

```bash
git clone https://github.com/nk6357/nk6357_projects.git
cd nk6357_projects
npm ci
npm run dev
```

Vite выведет локальный адрес, обычно `http://localhost:5173/`. Перед запуском скрипт автоматически проверяет и синхронизирует содержимое папки `projects`.

Основные команды:

```bash
npm run sync-content  # проверить проекты и обновить app/generated/projects.ts
npm run dev           # синхронизация + локальная разработка
npm run lint          # статическая проверка кода
npm run build         # синхронизация + TypeScript + production-сборка
npm run preview       # локальный просмотр готовой папки dist
```

Файлы `app/generated/projects.ts` и `public/projects/` создаются автоматически. Не редактируйте их вручную.

## Как добавить проект

Создайте отдельную папку в `projects`. Имя папки удобно делать таким же, как `slug`:

```text
projects/
  project-name/
    project.json
    cover.webp
    preview.webp
    gallery/
      01.webp
      02.webp
```

Минимальный рабочий вариант содержит `project.json` и обложку. Изображения рекомендуется сохранять в WebP или AVIF. Для крупных обложек подходит размер около 1600×1000 px, для Open Graph — 1200×630 px.

### Готовый `project.json`

Скопируйте пример и замените значения:

```json
{
  "title": "AI Assistant",
  "slug": "ai-assistant",
  "description": "AI-продукт для автоматизации работы с информацией.",
  "longDescription": "Подробное описание проекта, задачи, процесса и результата.",
  "year": "2026",
  "order": 1,
  "featured": true,
  "hidden": false,
  "status": "Запущен",
  "categories": ["AI", "Web", "Automation"],
  "technologies": ["React", "TypeScript", "OpenAI API"],
  "cover": "cover.webp",
  "preview": "preview.webp",
  "gallery": [
    "gallery/01.webp",
    "gallery/02.webp"
  ],
  "website": "https://example.com",
  "github": "https://github.com/example/project",
  "color": "#FF1838"
}
```

Обязательные поля:

- `title` — название проекта;
- `slug` — уникальный адрес из строчных латинских букв, цифр и дефисов;
- `description` — короткое описание карточки;
- `year` — год или другой короткий период;
- `order` — число, определяющее порядок (меньшее показывается раньше);
- `categories` — массив минимум с одной категорией;
- `cover` — путь к обложке внутри папки проекта.

Необязательные поля:

- `longDescription` — полный текст в подробном просмотре;
- `featured` — `true`, чтобы показать проект крупнее;
- `hidden` — `true`, чтобы временно скрыть проект без удаления файлов;
- `status` — например, `Запущен` или `В разработке`;
- `technologies` — список технологий;
- `preview` — отдельное большое изображение для подробного просмотра;
- `gallery` — массив путей к изображениям;
- `website` — ссылка на готовый продукт;
- `github` — ссылка на исходный код;
- `color` — акцент проекта в формате `#RRGGBB`.

Если указана только `website`, появится кнопка «Открыть проект». Если указан только `github` — «Исходный код». При наличии обеих ссылок показываются обе кнопки. Проект без ссылок всё равно отображается.

Категории сохраняются в данных проекта для будущего расширения, но не выводятся на карточках. Количество карточек не ограничено кодом. Если файл изображения отсутствует или не загрузился, интерфейс показывает фирменный fallback вместо сломанной картинки.

## Проверка перед публикацией

```bash
npm ci
npm run lint
npm run build
```

Успешная сборка создаст папку `dist`. Она и `node_modules` исключены из Git через `.gitignore`.

Для проверки production-версии:

```bash
npm run preview
```

Так как сборка для GitHub Pages использует базовый путь `/nk6357_projects/`, preview открывайте по адресу, который напечатает Vite с этой подпапкой. В Vercel переменная окружения `VERCEL` переключает base на `/` автоматически.

## Отправка изменений и автоматическая публикация

```bash
git add .
git commit -m "Add portfolio project"
git push origin main
```

Workflow `.github/workflows/deploy-pages.yml` запускается после каждого push в `main` и:

1. скачивает репозиторий;
2. включает Node.js 22;
3. выполняет `npm ci`;
4. запускает `npm run lint` и `npm run build`;
5. загружает только папку `dist`;
6. публикует её через официальный GitHub Pages action.

В настройках репозитория GitHub Pages должен использовать источник **GitHub Actions**. Статус публикации виден во вкладке **Actions**.

## Структура исходников

```text
app/
  components/   интерфейсные компоненты
  generated/    автоматически созданные данные проектов
  hooks/        анимации, диалоги и пользовательские настройки
  styles/       токены, глобальные стили и motion
  types/        TypeScript-типы
projects/       исходный контент проектов
scripts/        build-time синхронизация
public/         статические SEO-файлы и общие ресурсы
```

Подробные страницы открываются через hash (`#project/slug`), поэтому прямые ссылки и обновление страницы не вызывают 404 на статическом хостинге.
