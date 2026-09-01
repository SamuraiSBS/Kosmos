# РЕВЬЮ ВЫПОЛНЕНИЯ MASTER PROMPT

## ❌ ПРОБЛЕМЫ И НЕДОЧЁТЫ

### КРИТИЧЕСКИЕ (Blocking)

#### 1. TypeScript ошибки сборки
```
src/main.tsx:4 - Cannot find module or type declarations for './styles/global.css'
src/scenes/MapScene.tsx:139 - Parameter 'field' implicitly has an 'any' type
```
**Статус:** Не проходит production build

#### 2. Отсутствует `services/satelliteService.ts`
- В Master Prompt (пункт 1.39) требуется отдельный service layer в папке `services/`
- Сейчас `satelliteService` находится в `mockSatelliteData.ts`
- UI импортирует напрямую из `mockSatelliteData.ts` вместо service layer

#### 3. Проблема в App.tsx с SpaceScene
- В `App.tsx` нет обработки состояния `'LOADING'` для показа `SpaceScene`
- SpaceScene существует, но не интегрирована в основной flow правильно
- При загрузке сразу переход к INTRO без космической сцены

### СРЕДНИЕ (Important)

#### 4. Отсутствует анимация изменения поля tile-by-tile
- Master Prompt 1.26 требует: "Можно анимировать изменение тайл за тайлом"
- Сейчас просто меняется цвет всех тайлов сразу

#### 5. Нет визуального отображения locked полей B и C
- Поля есть в данных, но не отображаются на карте
- Master Prompt 1.13 требует показать их визуально как заблокированные

#### 6. Отсутствует компонент BottomSheet
- В структуре проекта указан `components/BottomSheet/`
- Сейчас bottom sheet захардкожен в App.tsx (строки 142-168)

#### 7. Нет разделения asset registry для будущих ID
- Master Prompt 1.33 требует предусмотреть future asset IDs:
  - `player-idle`, `player-walk-up/down/left/right`
  - `npc-helper`
  - `tree-01`, `tree-02`
  - и т.д.

### МЕЛКИЕ (Nice to have)

#### 8. IntroScene дублирует MapScene
- IntroScene рендерит `<div className="map-scene">` вместо того чтобы быть overlay поверх карты
- Может вызывать путаницу

#### 9. Нет кнопки "Продолжить наблюдение" в результате неправильного ответа
- Master Prompt 1.25 требует дать выбрать снова после подсказки

#### 10. Отсутствует явное состояние MISSION
- В types.ts есть `'MISSION'` в GameState
- Но логика обработки этого состояния находится внутри рендера App.tsx

---

## ✅ РЕКОМЕНДАЦИИ ПО ИСПРАВЛЕНИЮ

### Приоритет 1 (Критично для сборки):
1. **Исправить TypeScript ошибки**
   - Добавить CSS module declaration или изменить импорт global.css
   - Добавить явный тип для параметра `field` в MapScene.tsx

2. **Выделить `satelliteService.ts` в отдельную папку `services/`**
   - Создать папку `src/services/`
   - Переместить логику satelliteService из `mockSatelliteData.ts`
   - Обновить импорты в UI компонентах

### Приоритет 2 (Важно для flow):
3. **Интегрировать SpaceScene правильно в App.tsx**
   - Добавить обработку состояния `'LOADING'`
   - Обеспечить последовательность: LOADING → INTRO → MAP

4. **Добавить визуальное отображение locked полей B и C**
   - Отрисовать сетку для полей B и C на карте
   - Добавить visual indicator (замок, серый цвет, overlay)

5. **Вынести BottomSheet в отдельный компонент**
   - Создать `components/BottomSheet/BottomSheet.tsx`
   - Вынести логику из App.tsx
   - Сделать reusable компонент с props

### Приоритет 3 (Polish):
6. **Добавить tile-by-tile анимацию изменения поля**
   - Реализовать последовательное изменение цвета тайлов
   - Использовать setTimeout или CSS animation delay

7. **Расширить asset registry future IDs**
   - Добавить placeholder entries для:
     - Анимаций игрока (`player-idle`, `player-walk-*`)
     - NPC (`npc-helper`)
     - Разных типов деревьев (`tree-01`, `tree-02`)
     - Других объектов окружения

8. **Улучшить обработку состояния MISSION**
   - Явно использовать gameState `'MISSION'` в state machine
   - Вынести логику миссии из рендера в отдельный handler

9. **Исправить IntroScene**
   - Сделать IntroScene overlay поверх MapScene
   - Убрать дублирование `.map-scene` контейнера

10. **Добавить кнопку "Продолжить наблюдение"**
    - После неправильного ответа давать возможность выбрать снова
    - Не завершать миссию сразу при ошибке
