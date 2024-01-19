import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("exercises_v1.db");
const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS exercisesTable (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, equipment TEXT, secondaryMuscles TEXT, target TEXT, instructions TEXT, gifUrl TEXT, liked INTEGER, day TEXT);",
      [],
      () => console.log("Table created successfully"),
      (error) => console.error("Error creating table: ", error)
    );
  });
};

const removeExercise = (id) =>
  new Promise((resolve, reject) => {
    db.transaction(
      (tx) =>
        tx.executeSql(
          "DELETE FROM exercisesTable WHERE id = ?",
          [id],
          (_, result) => resolve(result),
          reject
        ),
      reject,
      () => {}
    );
  });

const getAllExercises = () =>
  new Promise((resolve, reject) => {
    db.transaction(
      (tx) =>
        tx.executeSql(
          "SELECT * FROM exercisesTable",
          [],
          (_, result) => resolve(result),
          reject
        ),
      reject,
      () => {}
    );
  });

const updateExerciseDay = (id, day) =>
  new Promise((resolve, reject) => {
    db.transaction(
      (tx) =>
        tx.executeSql(
          "UPDATE exercisesTable SET day = ? WHERE id = ?",
          [day, id],
          (_, result) => resolve(result),
          reject
        ),
      reject,
      () => {}
    );
  });
const addExercise = (exerciseData) =>
  new Promise((resolve, reject) =>
    db.transaction(
      (tx) =>
        tx.executeSql(
          "INSERT INTO exercisesTable (name, equipment, secondaryMuscles, target, instructions, gifUrl, liked, day) VALUES (?, ?, ?, ?, ?, ?, 1, ?)",
          [
            String(exerciseData?.name),
            String(exerciseData?.equipment),
            String(exerciseData?.secondaryMuscles),
            String(exerciseData?.target),
            String(exerciseData?.instructions),
            String(exerciseData?.gifUrl),
            String(exerciseData?.day || ""),
          ],
          (_, result) => resolve(result),
          reject
        ),
      reject,
      () => {}
    )
  );

export {
  createTable,
  addExercise,
  removeExercise,
  getAllExercises,
  updateExerciseDay,
};
